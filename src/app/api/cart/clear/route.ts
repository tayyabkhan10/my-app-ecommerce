import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartItemsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await db.delete(cartItemsTable).where(eq(cartItemsTable.userId, session.user.id));
    return NextResponse.json({ items: [], subtotal: 0, itemCount: 0 });
  } catch (err) {
    console.error("Clear cart error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}