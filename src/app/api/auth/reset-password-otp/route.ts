// 📁 src/app/api/auth/reset-password-otp/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usersTable, otpVerificationsTable } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { hashPassword } from "@/lib/auth-helper";

export async function POST(request: Request) {
  try {
    const { email, otp, password } = await request.json();

    if (!email || !otp || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const [record] = await db
      .select()
      .from(otpVerificationsTable)
      .where(
        and(
          eq(otpVerificationsTable.email, email),
          eq(otpVerificationsTable.verified, false)
        )
      )
      .limit(1);

    if (!record) {
      return NextResponse.json({ error: "No OTP found. Please request a new one." }, { status: 400 });
    }

    if (new Date() > record.expiresAt) {
      await db.delete(otpVerificationsTable).where(eq(otpVerificationsTable.id, record.id));
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    if (record.attempts >= 3) {
      await db.delete(otpVerificationsTable).where(eq(otpVerificationsTable.id, record.id));
      return NextResponse.json({ error: "Too many attempts. Please request a new code." }, { status: 400 });
    }

    if (record.otp !== otp) {
      await db.update(otpVerificationsTable)
        .set({ attempts: record.attempts + 1 })
        .where(eq(otpVerificationsTable.id, record.id));
      const remaining = 3 - (record.attempts + 1);
      return NextResponse.json({
        error: `Incorrect code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
      }, { status: 400 });
    }

    // OTP correct — update password + mark OTP used
    const hashed = await hashPassword(password);

    await db.update(usersTable)
      .set({ password: hashed, updatedAt: new Date() })
      .where(eq(usersTable.email, email));

    await db.update(otpVerificationsTable)
      .set({ verified: true })
      .where(eq(otpVerificationsTable.id, record.id));

    return NextResponse.json({ message: "Password reset successfully" });

  } catch (error) {
    console.error("Reset password OTP error:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}