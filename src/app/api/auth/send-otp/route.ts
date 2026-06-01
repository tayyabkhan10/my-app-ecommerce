// 📁 src/app/api/auth/send-otp/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usersTable, otpVerificationsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { sendOtpVerificationEmail } from "@/lib/mailer";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: "Email already verified" }, { status: 400 });
    }

    // Delete old OTPs
    await db.delete(otpVerificationsTable)
      .where(eq(otpVerificationsTable.userId, user.id));

    // Create fresh OTP
    const otp = generateOtp();
    await db.insert(otpVerificationsTable).values({
      userId: user.id,
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    await sendOtpVerificationEmail(email, otp);

    return NextResponse.json({ message: "OTP resent successfully" });

  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}