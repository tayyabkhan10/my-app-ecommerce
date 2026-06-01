// 📁 src/app/api/auth/verify-email/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usersTable, verificationTokensTable } from "@/lib/schema";
import { eq, and, gt } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    
    if (!token) {
      return NextResponse.redirect(new URL("/auth/error?error=missing-token", request.url));
    }

    // Find and delete token
    const [verification] = await db
      .delete(verificationTokensTable)
      .where(
        and(
          eq(verificationTokensTable.token, token),
          gt(verificationTokensTable.expires, new Date())
        )
      )
      .returning();

    if (!verification) {
      return NextResponse.redirect(new URL("/auth/error?error=invalid-token", request.url));
    }

    // Mark email as verified
    await db
      .update(usersTable)
      .set({ emailVerified: new Date() })
      .where(eq(usersTable.email, verification.identifier));

    return NextResponse.redirect(new URL("/auth/login?verified=true", request.url));
    
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(new URL("/auth/error?error=server-error", request.url));
  }
}