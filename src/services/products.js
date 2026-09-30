import "server-only";

import { cache } from "react";
import { createServerClient } from "@/lib/supabase-server";

const PRODUCT_SELECT = `
  id,
  category_id,
  name,
  slug,
  description,
  product_type,
  price,
  compare_at_price,
  currency,
  status,
  attr_fabric,
  attr_occasion,
  attr_fit,
  primary_image,
  created_at,
  updated_at,

  categories (
    id,
    name,
    slug,
    parent_id,
    image_url,
    sort_order,
    is_active
  ),

  product_images (
    id,
    image_url,
    is_primary,
    sort_order
  ),

  product_sizes (
    id,
    size_id,
    stock_qty,

    sizes (
      id,
      label,
      sort_order,
      applies_to
    )
  ),

  product_collections (
    collection_id,

    collections (
      id,
      name,
      slug,
      description,
      is_active
    )
  )
`;

function mapProduct(product) {
  if (!product) {
    return null;
  }

  const images = (product.product_images ?? [])
    .filter((image) => image?.id && image?.image_url)
    .sort((a, b) => {
      if (a.is_primary !== b.is_primary) {
        return a.is_primary ? -1 : 1;
      }

      return Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0);
    })
    .map((image) => ({
      id: image.id,
      url: image.image_url,
      is_primary: Boolean(image.is_primary),
      sort_order: Number(image.sort_order ?? 0),
    }));

  const available_sizes = (product.product_sizes ?? [])
    .filter(
      (item) =>
        item?.size_id &&
        item?.sizes?.label &&
        Number(item.stock_qty) > 0
    )
    .sort(
      (a, b) =>
        Number(a.sizes.sort_order ?? 0) -
        Number(b.sizes.sort_order ?? 0)
    )
    .map((item) => ({
      id: item.size_id,
      label: item.sizes.label,
      stock_qty: Number(item.stock_qty),
      applies_to: item.sizes.applies_to,
    }));

  const collections = (product.product_collections ?? [])
    .map((item) => item?.collections)
    .filter((collection) => collection?.id && collection.is_active)
    .map((collection) => ({
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
      is_active: Boolean(collection.is_active),
    }));

  const attributes = Object.fromEntries(
    Object.entries({
      fabric: product.attr_fabric,
      occasion: product.attr_occasion,
      fit: product.attr_fit,
    }).filter(([, value]) => value !== null && value !== "")
  );

  return {
    id: product.id,
    category_id: product.category_id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    product_type: product.product_type,
    price: Number(product.price ?? 0),
    compare_at_price:
      product.compare_at_price === null
        ? null
        : Number(product.compare_at_price),
    currency: product.currency ?? "PKR",
    status: product.status,
    primary_image: product.primary_image,
    created_at: product.created_at,
    updated_at: product.updated_at,

    category: product.categories
      ? {
          id: product.categories.id,
          name: product.categories.name,
          slug: product.categories.slug,
          parent_id: product.categories.parent_id,
          image_url: product.categories.image_url,
          sort_order: Number(product.categories.sort_order ?? 0),
          is_active: Boolean(product.categories.is_active),
        }
      : null,

    images,
    available_sizes,
    attributes,
    collections,
    collection_slugs: collections.map((collection) => collection.slug),
  };
}

export const getActiveProducts = cache(async () => {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getActiveProducts error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error("Unable to load products.");
  }

  return (data ?? []).map(mapProduct).filter(Boolean);
});

export const getActiveProductBySlug = cache(async (slug) => {
  const cleanSlug = typeof slug === "string" ? slug.trim() : "";

  if (!cleanSlug) {
    return null;
  }

  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", cleanSlug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error("getActiveProductBySlug error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });

    throw new Error("Unable to load product.");
  }

  return mapProduct(data);
});

export function getGenderFromCategory(category) {
  const slug = category?.slug?.toLowerCase() ?? "";

  if (slug.startsWith("boys-")) {
    return "boys";
  }

  if (slug.startsWith("girls-")) {
    return "girls";
  }

  return null;
}