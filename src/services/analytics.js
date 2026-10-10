// src/services/analytics.js
import "server-only";

import { headers } from "next/headers";
import { createServerClient } from "@/lib/supabase-server";

// Get client IP address
async function getClientIP() {
  const headersList = await headers();
  
  const forwarded = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return null;
}

// Track product view (with 24h IP deduplication)
export async function trackProductView(productId) {
  if (!productId) {
    return;
  }

  try {
    const supabase = await createServerClient();
    const ipAddress = await getClientIP();

    // Check if this IP already viewed this product in last 24 hours
    const { data: existingView } = await supabase
      .from("product_views")
      .select("id")
      .eq("product_id", productId)
      .eq("ip_address", ipAddress)
      .gte("viewed_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .maybeSingle();

    // If no recent view, insert new one
    if (!existingView) {
      await supabase
        .from("product_views")
        .insert({
          product_id: productId,
          ip_address: ipAddress,
          viewed_at: new Date().toISOString(),
        });
    }

  } catch (error) {
    console.error("trackProductView error:", error);
  }
}

// Get view count (unique IPs in last 24 hours)
export async function getProductViewCount(productId) {
  if (!productId) {
    return 0;
  }

  try {
    const supabase = await createServerClient();

    const { count } = await supabase
      .from("product_views")
      .select("ip_address", { count: "exact", head: true })
      .eq("product_id", productId)
      .gte("viewed_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    return count || 0;
  } catch (error) {
    console.error("getProductViewCount error:", error);
    return 0;
  }
}

// Get trending products (by unique views in last 24 hours)
export async function getTrendingProducts(limit = 10) {
  try {
    const supabase = await createServerClient();

    const { data } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        primary_image,
        price,
        product_views (
          ip_address
        )
      `)
      .eq("status", "active")
      .limit(limit);

    // Map with view counts
    return (data || []).map(product => ({
      ...product,
      view_count: product.product_views?.length || 0
    }));
  } catch (error) {
    console.error("getTrendingProducts error:", error);
    return [];
  }
}