// 📁 src/lib/admin-auth.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session";

function getSecret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "fallback-change-in-production"
  );
}

// ── Token banao ────────────────────────────────────────────
export async function createAdminToken(data: {
  id: string;
  email: string;
  role: string;
}) {
  return await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

// ── Token verify karo ──────────────────────────────────────
export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { id: string; email: string; role: string };
  } catch {
    return null;
  }
}

// ── Server Component mein use karo ─────────────────────────
export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

// ── Middleware mein use karo ───────────────────────────────
export async function verifyAdminFromRequest(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}