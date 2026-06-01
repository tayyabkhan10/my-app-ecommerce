// 📁 src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usersTable, otpVerificationsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/auth-helper";
import { sendOtpVerificationEmail } from "@/lib/mailer";
import { createId } from "@paralleldrive/cuid2";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Check if already registered
    const [existing] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existing?.emailVerified) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashed = await hashPassword(password);

    let userId: string;

    if (existing) {
      // Unverified user — update password/name in case they're retrying
      userId = existing.id;
      await db.update(usersTable)
        .set({ name, password: hashed })
        .where(eq(usersTable.id, userId));
    } else {
      // Create new user (unverified)
      userId = createId();
      await db.insert(usersTable).values({
        id: userId,
        name,
        email,
        password: hashed,
      });
    }

    // Delete any old OTPs for this user
    await db.delete(otpVerificationsTable)
      .where(eq(otpVerificationsTable.userId, userId));

    // Create new OTP
    const otp = generateOtp();
    await db.insert(otpVerificationsTable).values({
      userId,
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    await sendOtpVerificationEmail(email, otp);

    return NextResponse.json({ message: "OTP sent", email });

  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}