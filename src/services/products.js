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
    stock_qty,

    sizes (
      id,
      label,
      sort_order,
      applies_to
    )
  ),

  product_collections (
    collections (
      id,
      name,
      slug,
      description,
      banner_image,
      is_active,
      start_date,
      end_date
    )
  )
`;

function mapProduct(product) {
  if (!product) {
    return null;
  }

  const images = (product.product_images ?? [])
    .filter((image) => image?.id && image?.image_url)
    .sort((first, second) => {
      if (first.is_primary !== second.is_primary) {
        return Number(second.is_primary) - Number(first.is_primary);
      }

      return first.sort_order - second.sort_order;
    })
    .map((image) => ({
      id: image.id,
      url: image.image_url,
      is_primary: image.is_primary,
      sort_order: image.sort_order,
    }));

  const availableSizes = (product.product_sizes ?? [])
    .filter((productSize) => {
      return (
        productSize?.sizes?.id &&
        productSize?.sizes?.label &&
        Number(productSize.stock_qty) > 0
      );
    })
    .sort((first, second) => {
      return first.sizes.sort_order - second.sizes.sort_order;
    })
    .map((productSize) => ({
      id: productSize.sizes.id,
      label: productSize.sizes.label,
      stock_qty: Number(productSize.stock_qty),
      applies_to: productSize.sizes.applies_to,
    }));

  const attributes = Object.fromEntries(
    Object.entries({
      fabric: product.attr_fabric,
      occasion: product.attr_occasion,
      fit: product.attr_fit,
    }).filter(([, value]) => value !== null && value !== "")
  );

  const collections = (product.product_collections ?? [])
    .map((item) => item?.collections)
    .filter(Boolean)
    .filter((collection) => collection.is_active)
    .map((collection) => ({
      id: collection.id,
      name: collection.name,
      slug: collection.slug,
      description: collection.description,
      banner_image: collection.banner_image,
      is_active: collection.is_active,
      start_date: collection.start_date,
      end_date: collection.end_date,
    }));

  return {
    id: product.id,
    category_id: product.category_id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    product_type: product.product_type,
    price: Number(product.price),
    compare_at_price:
      product.compare_at_price === null
        ? null
        : Number(product.compare_at_price),
    currency: product.currency,
    status: product.status,
    primary_image: product.primary_image,

    category: product.categories
      ? {
          id: product.categories.id,
          name: product.categories.name,
          slug: product.categories.slug,
          parent_id: product.categories.parent_id,
          image_url: product.categories.image_url,
          sort_order: product.categories.sort_order,
          is_active: product.categories.is_active,
        }
      : null,

    images,
    available_sizes: availableSizes,
    attributes,

    collections,
    collection_slugs: collections.map((collection) => collection.slug),
  };
}

export const getActiveProductBySlug = cache(async (slug) => {
  if (!slug) {
    return null;
  }

  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error("getActiveProductBySlug error:", error);
    throw new Error("Unable to load product.");
  }

  return mapProduct(data);
});

export const getActiveProducts = cache(async () => {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getActiveProducts error:", error);
    throw new Error("Unable to load products.");
  }

  return (data ?? []).map(mapProduct);
});