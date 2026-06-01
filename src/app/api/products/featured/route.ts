import { db } from "@/lib/db";
import { productsTable } from "@/lib/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

function toProduct(p: typeof productsTable.$inferSelect) {
  return {
    id: p.id, name: p.name, description: p.description,
    price: Number(p.price),
    originalPrice: p.originalPrice != null ? Number(p.originalPrice) : null,
    category: p.category, imageUrl: p.imageUrl,
    additionalImages: p.additionalImages ?? [],
    sizes: p.sizes ?? [], colors: p.colors ?? [],
    inStock: p.inStock, stockCount: p.stockCount,
    featured: p.featured,
    rating: p.rating != null ? Number(p.rating) : null,
    reviewCount: p.reviewCount,
    createdAt: p.createdAt.toISOString(),
  };
}

export async function GET() {
  try {
    const products = await db.select().from(productsTable)
      .where(eq(productsTable.featured, true));
    return NextResponse.json(products.map(toProduct));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}