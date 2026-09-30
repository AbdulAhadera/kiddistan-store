import { notFound } from "next/navigation";

import { getActiveProducts } from "@/services/products";
import ProductGridCard from "@/components/products/ProductGridCard";

export async function generateStaticParams() {
  const slugs = ["new-arrivals", "everyday-essentials", "festive-collection", "summer-edit"];

  return slugs.map((slug) => ({ slug }));
}

export default async function CollectionPage({ params }) {
  const { slug } = await params;

  const allProducts = await getActiveProducts();

  const collectionProducts = allProducts.filter((product) =>
    product.collection_slugs?.includes(slug)
  );

  if (!collectionProducts.length) {
    notFound();
  }

  const collectionName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-6 text-2xl font-bold uppercase tracking-wider text-store-text md:text-3xl">
        {collectionName}
      </h1>

      {collectionProducts.length === 0 ? (
        <p className="py-8 text-center text-sm text-store-text-secondary">
          No products available in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {collectionProducts.map((product) => {
            const gender =
              product.category?.slug?.startsWith("boys-")
                ? "boys"
                : product.category?.slug?.startsWith("girls-")
                  ? "girls"
                  : null;

            if (!gender) {
              return null;
            }

            return (
              <ProductGridCard
                key={product.id}
                product={product}
                gender={gender}
                isBaba={gender === "boys"}
                isNew={slug === "new-arrivals"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}