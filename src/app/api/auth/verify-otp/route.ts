// 📁 src/app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usersTable, otpVerificationsTable } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    // Find the latest OTP record for this email
    const [record] = await db
      .select()
      .from(otpVerificationsTable)
      .where(
        and(
          eq(otpVerificationsTable.email, email),
          eq(otpVerificationsTable.verified, false)
        )
      )
      .orderBy(otpVerificationsTable.createdAt)
      .limit(1);

    if (!record) {
      return NextResponse.json({ error: "No OTP found. Please request a new one." }, { status: 400 });
    }

    // Check expiry
    if (new Date() > record.expiresAt) {
      await db.delete(otpVerificationsTable).where(eq(otpVerificationsTable.id, record.id));
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    // Check max attempts (3)
    if (record.attempts >= 3) {
      await db.delete(otpVerificationsTable).where(eq(otpVerificationsTable.id, record.id));
      return NextResponse.json({ error: "Too many attempts. Please request a new OTP." }, { status: 400 });
    }

    // Check OTP value
    if (record.otp !== otp) {
      await db.update(otpVerificationsTable)
        .set({ attempts: record.attempts + 1 })
        .where(eq(otpVerificationsTable.id, record.id));
      const remaining = 3 - (record.attempts + 1);
      return NextResponse.json({
        error: `Incorrect OTP. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
      }, { status: 400 });
    }

    // OTP correct — mark verified + verify user email
    await db.update(otpVerificationsTable)
      .set({ verified: true })
      .where(eq(otpVerificationsTable.id, record.id));

    await db.update(usersTable)
      .set({ emailVerified: new Date() })
      .where(eq(usersTable.id, record.userId));

    return NextResponse.json({ message: "Email verified successfully" });

  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}