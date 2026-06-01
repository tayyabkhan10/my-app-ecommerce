// 📁 src/lib/auth-helpers.ts
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

// ✅ Check if user is authenticated
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=" + encodeURIComponent(window.location.pathname));
  }
  return session;
}

// ✅ Check if user is admin
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/?error=unauthorized");
  }
  return session;
}

// ✅ Generate secure token (for email verification / password reset)
export function generateToken(length = 32) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ✅ Hash password
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

// ✅ Verify password
export async function verifyPassword(password: string, hashed: string) {
  return await bcrypt.compare(password, hashed);
}