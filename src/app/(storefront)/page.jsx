import HeroSection from "@/components/sections/landing/HeroSection";
import CategorySection from "@/components/sections/landing/CategorySection";
import TrustSection from "@/components/sections/landing/TrustSection";
import TrendingSection from "@/components/sections/landing/TrendingSection";

import { getActiveCategories } from "@/services/categories";
import { getActiveProducts } from "@/services/products";

function getRootCategory(categoryId, categoriesById) {
  let currentCategory =
    categoriesById.get(categoryId) ?? null;

  const visitedCategoryIds = new Set();

  while (currentCategory?.parent_id) {
    if (visitedCategoryIds.has(currentCategory.id)) {
      console.error(
        "Invalid categories hierarchy: circular parent category detected."
      );

      return null;
    }

    visitedCategoryIds.add(currentCategory.id);

    currentCategory =
      categoriesById.get(currentCategory.parent_id) ?? null;
  }

  return currentCategory;
}

function addProductGender(products, categories) {
  const categoriesById = new Map(
    categories.map((category) => [category.id, category])
  );

  return products
    .map((product) => {
      const rootCategory = getRootCategory(
        product.category_id,
        categoriesById
      );

      const gender = rootCategory?.slug;

      if (gender !== "boys" && gender !== "girls") {
        return null;
      }

      return {
        ...product,
        gender,
      };
    })
    .filter(Boolean);
}

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getActiveProducts(),
    getActiveCategories(),
  ]);

  const productsWithGender = addProductGender(
    products,
    categories
  );

  const newArrivals = productsWithGender.filter((product) =>
    product.collection_slugs?.includes("new-arrivals")
  );

  const boysProducts = productsWithGender.filter(
    (product) => product.gender === "boys"
  );

  const girlsProducts = productsWithGender.filter(
    (product) => product.gender === "girls"
  );

  return (
    <>
      <HeroSection />

      <CategorySection />

      <TrendingSection
        newArrivals={newArrivals}
        boysProducts={boysProducts}
        girlsProducts={girlsProducts}
      />

      <TrustSection />
    </>
  );
}