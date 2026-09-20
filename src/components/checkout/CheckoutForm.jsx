"use client";

import {
  useState,
  useSyncExternalStore,
} from "react";

import {
  clearCart,
  getCartSnapshot,
  getCartSubtotal,
  subscribeToCart,
} from "@/lib/cart";

import CheckoutFormFields from "./CheckoutFormFields";
import OrderSummary from "./OrderSummary";
import Link from "next/link";

export default function CheckoutForm() {
  const cart = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    () => []
  );

  const [form, setForm] =
    useState(() => {
      const defaultForm = {
        email: "",
        newsletter: true,
        country: "Pakistan",
        firstName: "",
        lastName: "",
        address: "",
        city: "Karachi",
        postalCode: "",
        phone: "",
        saveInfo: false,
        paymentMethod: "cod",
        billingOption: "same",
      };

      if (
        typeof window ===
        "undefined"
      ) {
        return defaultForm;
      }

      try {
        const savedInfo =
          localStorage.getItem(
            "checkout_saved_info"
          );

        if (!savedInfo) {
          return defaultForm;
        }

        const parsed =
          JSON.parse(
            savedInfo
          );

        return {
          ...defaultForm,
          ...parsed,
          saveInfo: true,
        };
      } catch {
        return defaultForm;
      }
    });

  const [fieldErrors, setFieldErrors] =
    useState({});

  const [discountCode, setDiscountCode] =
    useState("");

  const [discountApplied, setDiscountApplied] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const subtotal =
    getCartSubtotal(cart);

  const deliveryFee = 0;

  const total =
    subtotal + deliveryFee;

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.firstName.trim()) {
      errors.firstName =
        "First name is required.";
    }

    if (!form.lastName.trim()) {
      errors.lastName =
        "Last name is required.";
    }

    if (!form.address.trim()) {
      errors.address =
        "Address is required.";
    }

    if (!form.city.trim()) {
      errors.city =
        "City is required.";
    }

    if (!form.phone.trim()) {
      errors.phone =
        "Phone number is required.";
    } else if (
      !/^[0-9+\s()-]{10,15}$/.test(
        form.phone.trim()
      )
    ) {
      errors.phone =
        "Enter a valid phone number.";
    }

    return errors;
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      isSubmitting ||
      cart.length === 0
    ) {
      return;
    }

    const errors =
      validateForm();

    if (
      Object.keys(errors)
        .length > 0
    ) {
      setFieldErrors(errors);

      const firstError =
        Object.keys(errors)[0];

      document
        .getElementById(
          firstError
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

      return;
    }

    try {
      setIsSubmitting(true);

      /*
       * ---------------------------------------------------------
       * CUSTOMER
       * ---------------------------------------------------------
       *
       * For V1 we persist one customer ID
       * in localStorage.
       *
       * Later this becomes your Supabase customer ID.
       */

      let customerId =
        localStorage.getItem(
          "kiddistan_customer_id"
        );

      if (!customerId) {
        customerId = `CUS-${Date.now()
          .toString()
          .slice(-8)}`;

        localStorage.setItem(
          "kiddistan_customer_id",
          customerId
        );
      }

      /*
       * ---------------------------------------------------------
       * ORDER
       * ---------------------------------------------------------
       */

      const orderNumber = `KD-${Date.now()
        .toString()
        .slice(-8)}`;

      const customerName =
        `${form.firstName.trim()} ${form.lastName.trim()}`.trim();

      const orderPayload = {
        id: orderNumber,

        orderNumber,

        customer: {
          id: customerId,
          firstName:
            form.firstName.trim(),
          lastName:
            form.lastName.trim(),
          fullName:
            customerName,
          email:
            form.email.trim(),
          phone:
            form.phone.trim(),
        },

        shipping: {
          country:
            form.country,
          address:
            form.address.trim(),
          city:
            form.city.trim(),
          postalCode:
            form.postalCode.trim(),
        },

        newsletter:
          form.newsletter,

        paymentMethod:
          form.paymentMethod,

        billingOption:
          form.billingOption,

        discountCode:
          discountCode.trim() ||
          null,

        items: cart,

        subtotal,

        deliveryFee,

        total,

        status:
          "pending",

        createdAt:
          new Date().toISOString(),
      };

      /*
       * Save customer snapshot
       */
      localStorage.setItem(
        `customer:${customerId}`,
        JSON.stringify(
          orderPayload.customer
        )
      );

      /*
       * Save order
       */
      localStorage.setItem(
        `order:${orderNumber}`,
        JSON.stringify(
          orderPayload
        )
      );

      localStorage.setItem(
        "lastOrder",
        JSON.stringify(
          orderPayload
        )
      );

      /*
       * Save customer info for
       * future checkout
       */
      if (form.saveInfo) {
        localStorage.setItem(
          "checkout_saved_info",
          JSON.stringify({
            email:
              form.email.trim(),
            firstName:
              form.firstName.trim(),
            lastName:
              form.lastName.trim(),
            address:
              form.address.trim(),
            city:
              form.city.trim(),
            postalCode:
              form.postalCode.trim(),
            phone:
              form.phone.trim(),
            country:
              form.country,
          })
        );
      } else {
        localStorage.removeItem(
          "checkout_saved_info"
        );
      }

      /*
       * Clear cart only after
       * order has been saved.
       */
      clearCart();

      /*
       * IMPORTANT:
       * Navigate using the actual
       * order number.
       *
       * This prevents checkout
       * from becoming an "empty cart"
       * page after submission.
       */

      alert(`/order-success/${orderNumber}`)
      window.location.href =
        `/order-success/${orderNumber}`;
    } catch (error) {
      console.error(
        "Failed to place order:",
        error
      );

      setIsSubmitting(false);
    }
  };

  /*
   * Empty cart when customer
   * deliberately visits /checkout
   * with no items.
   */
  if (!cart.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-store-bg-secondary">
            <span className="text-xl">
              🛍
            </span>
          </div>

          <h1 className="mt-5 font-[var(--font-playfair)] text-2xl font-semibold text-store-text">
            Your bag is empty
          </h1>

          <p className="mt-2 text-sm leading-6 text-store-text-secondary">
            Add something to your bag before
            heading to checkout.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center bg-black px-7 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-neutral-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid min-h-screen grid-cols-1 lg:grid-cols-2"
    >
      {/* LEFT */}
      <div className="border-b border-store-border bg-white px-5 py-8 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-10">
        <CheckoutFormFields
          form={form}
          fieldErrors={fieldErrors}
          handleChange={handleChange}
          isSubmitting={isSubmitting}
        />
      </div>

      {/* RIGHT */}
      <div className="bg-[#f5f5f5] px-5 py-8 sm:px-10 lg:px-14 lg:py-10">
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          discountCode={
            discountCode
          }
          setDiscountCode={
            setDiscountCode
          }
          onApplyDiscount={
            handleApplyDiscount
          }
          discountApplied={
            discountApplied
          }
          isSubmitting={
            isSubmitting
          }
        />
      </div>
    </form>
  );
}