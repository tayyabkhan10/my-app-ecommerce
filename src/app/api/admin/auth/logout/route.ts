// 📁 src/app/api/admin/auth/logout/route.ts
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}