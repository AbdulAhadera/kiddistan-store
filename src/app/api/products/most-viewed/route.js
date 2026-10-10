import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createServerClient();

    // Step 1: Views se top product IDs
    const { data: viewCounts, error: viewError } =
      await supabase
        .from("product_views")
        .select("product_id");

    let topProductIds = [];

    if (!viewError && viewCounts && viewCounts.length > 0) {
      const countMap = {};
      viewCounts.forEach((row) => {
        countMap[row.product_id] =
          (countMap[row.product_id] ?? 0) + 1;
      });

      topProductIds = Object.entries(countMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 12)
        .map(([id]) => id);
    }

    // Step 2: Products fetch (views ho ya na ho)
    let query = supabase
      .from("products")
      .select(`
        id,
        slug,
        name,
        price,
        compare_at_price,
        currency,
        primary_image,
        status,
        product_images (
          image_url,
          is_primary
        ),
        categories (
          id,
          name,
          slug,
          parent_id
        )
      `)
      .eq("status", "active")
      .limit(12);

    if (topProductIds.length > 0) {
      query = query.in("id", topProductIds);
    } else {
      query = query.order("created_at", {
        ascending: false,
      });
    }

    const { data: products, error: productError } =
      await query;

    if (productError) {
      console.error("Most viewed API error:", productError);
      return NextResponse.json(
        { error: productError.message },
        { status: 500 }
      );
    }

    // Step 3: Gender derive
    const deriveGender = (product) => {
      const categorySlug = product.categories?.slug ?? "";
      const categoryName = product.categories?.name ?? "";

      if (
        categorySlug.includes("boy") ||
        categoryName.toLowerCase().includes("boy")
      ) {
        return "boys";
      }

      if (
        categorySlug.includes("girl") ||
        categoryName.toLowerCase().includes("girl")
      ) {
        return "girls";
      }

      return null;
    };

    // Step 4: Map + sort
    const mappedProducts = (products ?? [])
      .map((product) => ({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        compare_at_price: product.compare_at_price,
        currency: product.currency,
        gender: deriveGender(product),
        primary_image: product.primary_image,
        images: (product.product_images ?? []).map(
          (img) => ({
            url: img.image_url,
            is_primary: img.is_primary,
          })
        ),
        collection_slugs: [],
      }))
      .filter((product) => product.gender !== null);

    if (topProductIds.length > 0) {
      mappedProducts.sort(
        (a, b) =>
          topProductIds.indexOf(a.id) -
          topProductIds.indexOf(b.id)
      );
    }

    return NextResponse.json({
      products: mappedProducts,
    });
  } catch (error) {
    console.error("Most viewed API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch" },
      { status: 500 }
    );
  }
}