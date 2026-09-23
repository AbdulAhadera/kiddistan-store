import { notFound } from "next/navigation";

import FemaleSection from "@/components/sections/female/FemaleSection";
import MaleSection from "@/components/sections/male/MaleSection";
import { getActiveCategories } from "@/services/categories";
import { getActiveProducts } from "@/services/products";

const GENDER_CONFIG = {
  boys: {
    theme: "baba",
    section: MaleSection,
  },
  girls: {
    theme: "baby",
    section: FemaleSection,
  },
};

function getDescendantCategoryIds(rootCategoryId, categories) {
  const categoryIds = new Set([rootCategoryId]);
  const queue = [rootCategoryId];

  while (queue.length > 0) {
    const currentCategoryId = queue.shift();

    const children = categories.filter(
      (category) => category.parent_id === currentCategoryId
    );

    for (const child of children) {
      if (!categoryIds.has(child.id)) {
        categoryIds.add(child.id);
        queue.push(child.id);
      }
    }
  }

  return categoryIds;
}

export default async function GenderPage({ params }) {
  const { gender } = await params;
  const route = gender?.toLowerCase();

  const config = GENDER_CONFIG[route];

  if (!config) {
    notFound();
  }

  const [categories, products] = await Promise.all([
    getActiveCategories(),
    getActiveProducts(),
  ]);

  const rootCategory = categories.find(
    (category) =>
      category.parent_id === null && category.slug === route
  );

  if (!rootCategory) {
    notFound();
  }

  const categoryIds = getDescendantCategoryIds(
    rootCategory.id,
    categories
  );

  const genderProducts = products.filter((product) =>
    categoryIds.has(product.category_id)
  );

  const Section = config.section;

  return (
    <div
      className={
        config.theme === "baba"
          ? "min-h-screen bg-baba-bg text-baba-text"
          : "min-h-screen bg-baby-bg text-baby-text"
      }
    >
      <main className="container mx-auto px-4 py-8 lg:px-8">
        <Section products={genderProducts} />
      </main>
    </div>
  );
}