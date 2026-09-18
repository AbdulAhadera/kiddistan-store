import { notFound } from "next/navigation";
import { products } from "@/mock/mockData";
import Product from "@/components/products/Product";

/**
 * Dynamic Metadata Generation for SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.primary_image,
          alt: product.name,
        },
      ],
    },
  };
}

/**
 * Dynamic Product Detail Page Handler
 */
export default async function ProductDetailPage({ params }) {
  const { gender, slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const targetGender = gender.toLowerCase();

  if (targetGender !== "baba" && targetGender !== "baby") {
    notFound();
  }

  return <Product product={product} theme={targetGender} />;
}