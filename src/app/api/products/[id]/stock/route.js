import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const size = searchParams.get("size") || "Standard";

    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    // Check if product has size variants
    const { data: sizeVariants } = await supabase
      .from("product_sizes")
      .select(`
        stock_qty,
        size_id,
        sizes (
          label
        )
      `)
      .eq("product_id", id);

    let stock = 0;

    if (sizeVariants && sizeVariants.length > 0) {
      // Product has size variants - find matching size
      const matchingSize = sizeVariants.find(
        (variant) => variant.sizes?.label === size
      );

      if (matchingSize) {
        stock = matchingSize.stock_qty || 0;
      }
    } else {
      // Product has no size variants - assume unlimited
      stock = 999;
    }

    return NextResponse.json({
      stock,
      productId: id,
      size,
    });
  } catch (error) {
    console.error("Stock API error:", error);
    return NextResponse.json(
      {
        stock: 0,
        error: error.message || "Failed to fetch stock",
      },
      { status: 500 }
    );
  }
}