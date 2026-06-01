// 📁 src/app/api/dashboard/top-products/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ordersTable, orderItemsTable, productsTable } from "@/lib/schema";
import { eq, sum, desc, ne } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // orderItemsTable se aggregate karo — cancelled orders exclude
    const results = await db
      .select({
        productId: orderItemsTable.productId,
        name: orderItemsTable.productName,
        imageUrl: orderItemsTable.productImageUrl,
        totalSold: sum(orderItemsTable.quantity),
        revenue: sum(orderItemsTable.price),
      })
      .from(orderItemsTable)
      .innerJoin(ordersTable, eq(orderItemsTable.orderId, ordersTable.id))
      .where(ne(ordersTable.status, "cancelled"))
      .groupBy(
        orderItemsTable.productId,
        orderItemsTable.productName,
        orderItemsTable.productImageUrl
      )
      .orderBy(desc(sum(orderItemsTable.quantity)))
      .limit(10);

    const topProducts = results.map((r) => ({
      productId: r.productId,
      name: r.name,
      imageUrl: r.imageUrl,
      totalSold: Number(r.totalSold ?? 0),
      revenue: Number(r.revenue ?? 0),
    }));

    return NextResponse.json(topProducts);
  } catch (error) {
    console.error("[dashboard/top-products]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}