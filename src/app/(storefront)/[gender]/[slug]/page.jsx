import { notFound } from "next/navigation";

import Product from "@/components/products/Product";
import { getActiveProductBySlug } from "@/services/products";
import { getActiveCategories } from "@/services/categories";

const VALID_GENDERS = new Set(["boys", "girls"]);

const THEME_BY_GENDER = {
  boys: "baba",
  girls: "baby",
};

function getTopLevelCategory(categoryId, categories) {
  const categoriesById = new Map(
    categories.map((category) => [category.id, category])
  );

  let current = categoriesById.get(categoryId) ?? null;
  const visitedIds = new Set();

  while (current?.parent_id) {
    if (visitedIds.has(current.id)) {
      console.error(
        "Category hierarchy error: circular parent relationship."
      );

      return null;
    }

    visitedIds.add(current.id);

    current = categoriesById.get(current.parent_id) ?? null;
  }

  return current;
}

async function getProductForRoute(gender, slug) {
  const normalizedGender = gender?.toLowerCase();

  if (!VALID_GENDERS.has(normalizedGender)) {
    return null;
  }

  const [product, categories] = await Promise.all([
    getActiveProductBySlug(slug),
    getActiveCategories(),
  ]);

  if (!product?.category_id) {
    return null;
  }

  const rootCategory = getTopLevelCategory(
    product.category_id,
    categories
  );

  if (!rootCategory || rootCategory.slug !== normalizedGender) {
    return null;
  }

  return product;
}

export async function generateMetadata({ params }) {
  const { gender, slug } = await params;

  const product = await getProductForRoute(gender, slug);

  if (!product) {
    return {
      title: "Product Not Found | Kiddistan",
    };
  }

  const primaryImage =
    product.images.find((image) => image.is_primary)?.url ||
    product.primary_image;

  return {
    title: `${product.name} | Kiddistan`,
    description: product.description || undefined,

    openGraph: {
      title: `${product.name} | Kiddistan`,
      description: product.description || undefined,
      images: primaryImage
        ? [
            {
              url: primaryImage,
              alt: product.name,
            },
          ]
        : [],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { gender, slug } = await params;

  const normalizedGender = gender?.toLowerCase();

  const product = await getProductForRoute(
    normalizedGender,
    slug
  );

  if (!product) {
    notFound();
  }

  return (
    <Product
      product={product}
      theme={THEME_BY_GENDER[normalizedGender]}
    />
  );
}