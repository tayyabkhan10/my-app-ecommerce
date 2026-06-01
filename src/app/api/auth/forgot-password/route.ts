// 📁 src/app/api/auth/forgot-password/route.ts
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

    // Don't reveal if user exists (security)
    if (!user) {
      return NextResponse.json({ message: "If your email is registered, you'll receive a code." });
    }

    // Delete old OTPs for this user
    await db.delete(otpVerificationsTable)
      .where(eq(otpVerificationsTable.userId, user.id));

    // Create new OTP
    const otp = generateOtp();
    await db.insert(otpVerificationsTable).values({
      userId: user.id,
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    await sendOtpVerificationEmail(email, otp);

    return NextResponse.json({ message: "If your email is registered, you'll receive a code." });

  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}