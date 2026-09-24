"use server";

import { createCodOrder } from "@/services/orders";

function cleanText(value, maxLength = 500) {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
}

function validatePhone(phone) {
  return /^[0-9+\s()-]{10,15}$/.test(phone);
}

export async function placeCodOrder(payload) {
  try {
    const firstName = cleanText(payload?.firstName, 100);
    const lastName = cleanText(payload?.lastName, 100);
    const email = cleanText(payload?.email, 255);
    const phone = cleanText(payload?.phone, 30);
    const address = cleanText(payload?.address, 500);
    const city = cleanText(payload?.city, 100);
    const postalCode = cleanText(payload?.postalCode, 30);
    const items = payload?.items;

    if (!firstName) {
      return {
        ok: false,
        fieldErrors: {
          firstName: "First name is required.",
        },
      };
    }

    if (!lastName) {
      return {
        ok: false,
        fieldErrors: {
          lastName: "Last name is required.",
        },
      };
    }

    if (!address) {
      return {
        ok: false,
        fieldErrors: {
          address: "Address is required.",
        },
      };
    }

    if (!city) {
      return {
        ok: false,
        fieldErrors: {
          city: "City is required.",
        },
      };
    }

    if (!phone) {
      return {
        ok: false,
        fieldErrors: {
          phone: "Phone number is required.",
        },
      };
    }

    if (!validatePhone(phone)) {
      return {
        ok: false,
        fieldErrors: {
          phone: "Enter a valid phone number.",
        },
      };
    }

    const shippingAddress = postalCode
      ? `${address}\nPostal code: ${postalCode}`
      : address;

    const order = await createCodOrder({
      customerName: `${firstName} ${lastName}`.trim(),
      customerPhone: phone,
      customerEmail: email || null,
      shippingAddress,
      city,
      notes: null,
      items,
    });

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.error("placeCodOrder failed:", error);

    return {
      ok: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to place your order. Please try again.",
    };
  }
}