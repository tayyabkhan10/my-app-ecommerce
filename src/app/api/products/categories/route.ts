import { db } from "@/lib/db";
import { productsTable } from "@/lib/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.select({ category: productsTable.category }).from(productsTable);
    const counts: Record<string, number> = {};
    for (const p of products) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return NextResponse.json(Object.entries(counts).map(([name, count]) => ({ name, count })));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}