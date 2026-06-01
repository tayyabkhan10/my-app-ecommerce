// 📁 src/app/api/dashboard/stats/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ordersTable, usersTable, productsTable } from "@/lib/schema";
import { eq, count, sum, gte, lt, and } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Total revenue — delivered orders
    const [revenueResult] = await db
      .select({ total: sum(ordersTable.total) })
      .from(ordersTable)
      .where(eq(ordersTable.status, "delivered"));

    // This month revenue
    const [thisMonthRev] = await db
      .select({ total: sum(ordersTable.total) })
      .from(ordersTable)
      .where(
        and(
          eq(ordersTable.status, "delivered"),
          gte(ordersTable.createdAt, startOfThisMonth)
        )
      );

    // Last month revenue
    const [lastMonthRev] = await db
      .select({ total: sum(ordersTable.total) })
      .from(ordersTable)
      .where(
        and(
          eq(ordersTable.status, "delivered"),
          gte(ordersTable.createdAt, startOfLastMonth),
          lt(ordersTable.createdAt, startOfThisMonth)
        )
      );

    // Total orders
    const [totalOrdersResult] = await db
      .select({ count: count() })
      .from(ordersTable);

    // This month orders
    const [thisMonthOrders] = await db
      .select({ count: count() })
      .from(ordersTable)
      .where(gte(ordersTable.createdAt, startOfThisMonth));

    // Last month orders
    const [lastMonthOrders] = await db
      .select({ count: count() })
      .from(ordersTable)
      .where(
        and(
          gte(ordersTable.createdAt, startOfLastMonth),
          lt(ordersTable.createdAt, startOfThisMonth)
        )
      );

    // Pending orders
    const [pendingResult] = await db
      .select({ count: count() })
      .from(ordersTable)
      .where(eq(ordersTable.status, "pending"));

    // Total products
    const [productsResult] = await db
      .select({ count: count() })
      .from(productsTable);

    // Total customers (role = "user")
    const [customersResult] = await db
      .select({ count: count() })
      .from(usersTable)
      .where(eq(usersTable.role, "user"));

    // Growth %
    const thisRev = Number(thisMonthRev.total ?? 0);
    const lastRev = Number(lastMonthRev.total ?? 0);
    const revenueGrowth = lastRev === 0 ? 100 : ((thisRev - lastRev) / lastRev) * 100;

    const thisOrd = Number(thisMonthOrders.count ?? 0);
    const lastOrd = Number(lastMonthOrders.count ?? 0);
    const ordersGrowth = lastOrd === 0 ? 100 : ((thisOrd - lastOrd) / lastOrd) * 100;

    return NextResponse.json({
      totalRevenue: Number(revenueResult.total ?? 0),
      revenueGrowth: parseFloat(revenueGrowth.toFixed(1)),
      totalOrders: Number(totalOrdersResult.count ?? 0),
      ordersGrowth: parseFloat(ordersGrowth.toFixed(1)),
      pendingOrders: Number(pendingResult.count ?? 0),
      totalProducts: Number(productsResult.count ?? 0),
      totalCustomers: Number(customersResult.count ?? 0),
    });
  } catch (error) {
    console.error("[dashboard/stats]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}