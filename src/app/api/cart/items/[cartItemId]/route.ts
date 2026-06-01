// 📁 src/app/api/cart/items/[cartItemId]/route.ts
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ cartItemId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { cartItemId } = await params;
    const id = Number(cartItemId);
    const { quantity } = z
      .object({ quantity: z.number().int().min(0) })
      .parse(await request.json());

    if (quantity <= 0) {
      await db.delete(cartItemsTable).where(
        and(eq(cartItemsTable.id, id), eq(cartItemsTable.userId, userId))
      );
    } else {
      await db.update(cartItemsTable).set({ quantity }).where(
        and(eq(cartItemsTable.id, id), eq(cartItemsTable.userId, userId))
      );
    }

    return NextResponse.json(await buildCartResponse(userId));
  } catch (err) {
    console.error("Update cart error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ cartItemId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { cartItemId } = await params;
    const id = Number(cartItemId);

    await db.delete(cartItemsTable).where(
      and(eq(cartItemsTable.id, id), eq(cartItemsTable.userId, userId))
    );

    return NextResponse.json(await buildCartResponse(userId));
  } catch (err) {
    console.error("Delete cart item error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}