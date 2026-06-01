import { db } from "@/lib/db";
import { productsTable } from "@/lib/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";

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

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const productId = Number(id);
    if (isNaN(productId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const [product] = await db.select().from(productsTable).where(eq(productsTable.id, productId));
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(toProduct(product));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const productId = Number(id);
    if (isNaN(productId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const UpdateBody = z.object({
      name: z.string().min(1).optional(), description: z.string().optional(),
      price: z.number().positive().optional(), originalPrice: z.number().positive().optional(),
      category: z.string().min(1).optional(), imageUrl: z.string().url().optional(),
      additionalImages: z.array(z.string()).optional(),
      sizes: z.array(z.string()).optional(), colors: z.array(z.string()).optional(),
      stockCount: z.number().int().min(0).optional(), inStock: z.boolean().optional(),
      featured: z.boolean().optional(),
    });

    const body = await request.json();
    const data = UpdateBody.parse(body);
    const updateData: Record<string, unknown> = {};

    Object.keys(data).forEach((key) => {
      const k = key as keyof typeof data;
      if (data[k] !== undefined) {
        updateData[k] = (k === "price" || k === "originalPrice") && data[k] !== null
          ? String(data[k])
          : data[k];
      }
    });

    const [product] = await db.update(productsTable).set(updateData)
      .where(eq(productsTable.id, productId)).returning();
    if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(toProduct(product));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const productId = Number(id);
    if (isNaN(productId)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    await db.delete(productsTable).where(eq(productsTable.id, productId));
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}