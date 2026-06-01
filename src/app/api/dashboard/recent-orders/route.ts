// 📁 src/app/api/dashboard/recent-orders/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ordersTable, orderItemsTable } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Recent 10 orders
    const recentOrders = await db
      .select()
      .from(ordersTable)
      .orderBy(desc(ordersTable.createdAt))
      .limit(10);

    // Har order ke items fetch karo
    const ordersWithItems = await Promise.all(
      recentOrders.map(async (order) => {
        const items = await db
          .select()
          .from(orderItemsTable)
          .where(eq(orderItemsTable.orderId, order.id));

        return {
          ...order,
          total: Number(order.total),
          items,
        };
      })
    );

    return NextResponse.json(ordersWithItems);
  } catch (error) {
    console.error("[dashboard/recent-orders]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}