import "server-only";

import { cache } from "react";
import { createServerClient } from "@/lib/supabase-server";

const CATEGORY_SELECT = `
  id,
  name,
  slug,
  parent_id,
  image_url,
  sort_order,
  is_active,
  created_at
`;

export const getActiveCategories = cache(async () => {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select(CATEGORY_SELECT)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getActiveCategories error:", error);
    throw new Error("Unable to load categories.");
  }

  return data ?? [];
});

export const getTopLevelCategories = cache(async () => {
  const categories = await getActiveCategories();

  return categories.filter((category) => category.parent_id === null);
});

export const getChildCategories = cache(async (parentId) => {
  if (!parentId) {
    return [];
  }

  const categories = await getActiveCategories();

  return categories.filter(
    (category) => category.parent_id === parentId
  );
});