// 📁 src/app/api/cart/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartItemsTable, productsTable } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

async function buildCartResponse(userId: string) {
  const items = await db
    .select({
      id: cartItemsTable.id,
      productId: cartItemsTable.productId,
      productName: productsTable.name,
      productImageUrl: productsTable.imageUrl,
      price: cartItemsTable.price,
      quantity: cartItemsTable.quantity,
      size: cartItemsTable.size,
      color: cartItemsTable.color,
    })
    .from(cartItemsTable)
    .innerJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
    .where(eq(cartItemsTable.userId, userId));

  const cartItems = items.map((i) => ({
    id: i.id,
    productId: i.productId,
    productName: i.productName,
    productImageUrl: i.productImageUrl,
    price: Number(i.price),
    quantity: i.quantity,
    size: i.size,
    color: i.color,
  }));

  return {
    items: cartItems,
    subtotal: cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
    itemCount: cartItems.reduce((s, i) => s + i.quantity, 0),
  };
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(await buildCartResponse(session.user.id));
  } catch (err) {
    console.error("Cart fetch error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}