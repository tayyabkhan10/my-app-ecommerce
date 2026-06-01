// 📁 src/app/api/cart/items/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cartItemsTable, productsTable } from "@/lib/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
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

const AddBody = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  size: z.string().min(1),
  color: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { productId, quantity, size, color } = AddBody.parse(body);

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId));

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const [existing] = await db
      .select()
      .from(cartItemsTable)
      .where(
        and(
          eq(cartItemsTable.userId, userId),
          eq(cartItemsTable.productId, productId),
          eq(cartItemsTable.size, size),
          eq(cartItemsTable.color, color)
        )
      );

    if (existing) {
      await db
        .update(cartItemsTable)
        .set({ quantity: existing.quantity + quantity })
        .where(eq(cartItemsTable.id, existing.id));
    } else {
      await db.insert(cartItemsTable).values({
        userId, productId, quantity, size, color, price: product.price,
      });
    }

    return NextResponse.json(await buildCartResponse(userId));
  } catch (err) {
    console.error("Add to cart error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}