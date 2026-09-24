import "server-only";

import { createServerClient } from "@/lib/supabase-server";

function normalizeCartItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => ({
      product_id: String(item?.id || "").trim(),
      size_label: String(item?.size || "Standard").trim() || "Standard",
      quantity: Math.floor(Number(item?.quantity)),
    }))
    .filter(
      (item) =>
        item.product_id &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
}

export async function createCodOrder({
  customerName,
  customerPhone,
  customerEmail,
  shippingAddress,
  city,
  notes,
  items,
}) {
  const normalizedItems = normalizeCartItems(items);

  if (normalizedItems.length === 0) {
    throw new Error("Your cart is empty.");
  }

  const supabase = await createServerClient();

  const { data, error } = await supabase.rpc(
    "create_cod_order",
    {
      p_customer_name: customerName,
      p_customer_phone: customerPhone,
      p_customer_email: customerEmail || null,
      p_shipping_address: shippingAddress,
      p_city: city,
      p_notes: notes || null,
      p_items: normalizedItems,
    }
  );

  if (error) {
    console.error("createCodOrder RPC failed:", error);
    throw new Error(error.message || "Unable to place order.");
  }

  const order = Array.isArray(data) ? data[0] : data;

  if (!order?.order_id || !order?.order_number) {
    throw new Error("Order was not created correctly.");
  }

  return {
    id: order.order_id,
    orderNumber: order.order_number,
    totalAmount: Number(order.total_amount),
  };
}

export async function getOrderById(orderId) {
  if (!orderId) {
    return null;
  }

  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      order_number,
      customer_name,
      customer_phone,
      customer_email,
      shipping_address,
      city,
      payment_method,
      payment_status,
      order_status,
      total_amount,
      notes,
      created_at,
      order_items (
        id,
        product_id,
        size_label,
        quantity,
        unit_price,
        products (
          id,
          name,
          slug,
          sku,
          primary_image
        )
      )
    `)
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error("getOrderById failed:", error);
    throw new Error("Unable to load order.");
  }

  return data;
}