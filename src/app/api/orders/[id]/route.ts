import { NextRequest, NextResponse } from 'next/server';

// You MUST export at least one function (GET, POST, PUT, DELETE, etc.)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Next.js 15 syntax
) {
  const { id } = await params;
  
  // TODO: Add your logic to fetch the order by ID
  return NextResponse.json({ message: `Fetching order ${id}` });
}

// Add other methods if you need them (PUT, DELETE, etc.)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // TODO: Add your logic to delete the order
  return NextResponse.json({ message: `Deleted order ${id}` });
}