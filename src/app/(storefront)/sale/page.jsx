import { getActiveProducts } from "@/services/products";
import ProductGridCard from "@/components/products/ProductGridCard";

export default async function SalePage() {
  const allProducts = await getActiveProducts();

  // Filter products that have compare_at_price > price
  const saleProducts = allProducts.filter((product) => {
    const price = Number(product.price ?? 0);
    const compareAtPrice = product.compare_at_price;

    return compareAtPrice !== null && compareAtPrice > price;
  });

  return (
    <div className="px-4 py-8 md:px-8 md:py-12">
      <h1 className="mb-2 text-2xl font-bold uppercase tracking-wider text-store-text md:text-3xl">
        Sale
      </h1>

      <p className="mb-6 text-sm text-store-text-secondary">
        Up to 50% off on selected styles.
      </p>

      {saleProducts.length === 0 ? (
        <p className="py-8 text-center text-sm text-store-text-secondary">
          No products on sale right now.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {saleProducts.map((product) => {
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
                isNew={false}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}