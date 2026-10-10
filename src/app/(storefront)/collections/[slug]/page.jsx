import Link from "next/link";
import { createServerClient as createClient } from "@/lib/supabase-server";

import TrendingSection from "@/components/sections/landing/TrendingSection";
import ProductGridCard from "@/components/products/ProductGridCard";

export default async function CollectionPage({ params }) {
  const { slug } = await params;

  const supabase = await createClient();

  // Step 1: Collection fetch karo slug se
  const { data: collection } = await supabase
    .from("collections")
    .select("id, name, slug")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  // Step 2: Collection ke product IDs nikalo
  let productIds = [];
  if (collection) {
    const { data: links } = await supabase
      .from("product_collections")
      .select("product_id")
      .eq("collection_id", collection.id);

    productIds = links?.map((link) => link.product_id) || [];
  }

  // Step 3: Products fetch karo
  let products = [];
  if (productIds.length > 0) {
    const { data: productsData } = await supabase
      .from("products")
      .select(
        `
        id,
        name,
        slug,
        price,
        compare_at_price,
        currency,
        primary_image,
        product_type,
        status,
        category:categories (id, name, slug),
        product_images (id, image_url, is_primary, sort_order)
      `
      )
      .in("id", productIds)
      .eq("status", "active");

    products = productsData || [];
  }

  const displayName =
    collection?.name ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div>
      {/* COLLECTION PRODUCTS */}
      {products.length > 0 ? (
        <section className="px-4 py-8 md:px-8 md:py-12">
          <div className="mb-8">
            <h1 className="font-['Playfair_Display'] text-3xl font-bold tracking-tight text-store-text md:text-4xl">
              {displayName}
            </h1>

            <p className="mt-2 text-xs uppercase tracking-wider text-store-text-secondary">
              {products.length} {products.length === 1 ? "Item" : "Items"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
              const categorySlug =
                product.category?.slug?.toLowerCase() || "";

              const gender =
                categorySlug === "boys" || categorySlug.startsWith("boys-")
                  ? "boys"
                  : categorySlug === "girls" ||
                      categorySlug.startsWith("girls-")
                    ? "girls"
                    : "boys"; // default fallback

              return (
                <ProductGridCard
                  key={product.id}
                  product={product}
                  gender={gender}
                  isBaba={gender === "boys"}
                  isNew={false}
                />
              );
            })}
          </div>
        </section>
      ) : (
        /* EMPTY STATE */
        <div className="flex min-h-[55vh] flex-col items-center justify-center px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl font-medium text-store-text md:text-6xl">
            {displayName}
          </h1>

          <p className="mt-5 max-w-md text-base text-store-text-secondary">
            No products in this collection yet.
          </p>

          <Link
            href="/"
            className="mt-8 border border-store-text bg-store-text px-8 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-transparent hover:text-store-text"
          >
            Back to Home
          </Link>
        </div>
      )}

      {/* TRENDING SECTION */}
      <TrendingSection />
    </div>
  );
}