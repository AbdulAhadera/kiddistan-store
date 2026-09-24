"use client";

import {
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  clearCart,
  getCartSnapshot,
  getCartSubtotal,
  subscribeToCart,
} from "@/lib/cart";

import { placeCodOrder } from "@/actions/orders";
import CheckoutFormFields from "./CheckoutFormFields";
import OrderSummary from "./OrderSummary";

export default function CheckoutForm() {
  const router = useRouter();

  const cart = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    () => []
  );

  const [form, setForm] = useState(() => {
    const defaultForm = {
      email: "",
      country: "Pakistan",
      firstName: "",
      lastName: "",
      address: "",
      city: "Karachi",
      postalCode: "",
      phone: "",
      paymentMethod: "COD",
    };

    if (typeof window === "undefined") {
      return defaultForm;
    }

    try {
      const savedInfo = localStorage.getItem(
        "checkout_saved_info"
      );

      if (!savedInfo) {
        return defaultForm;
      }

      return {
        ...defaultForm,
        ...JSON.parse(savedInfo),
      };
    } catch {
      return defaultForm;
    }
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] =
    useState(false);

  const subtotal = getCartSubtotal(cart);
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }

    if (submitError) {
      setSubmitError("");
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!form.firstName.trim()) {
      errors.firstName = "First name is required.";
    }

    if (!form.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }

    if (!form.address.trim()) {
      errors.address = "Address is required.";
    }

    if (!form.city.trim()) {
      errors.city = "City is required.";
    }

    if (!form.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (
      !/^[0-9+\s()-]{10,15}$/.test(
        form.phone.trim()
      )
    ) {
      errors.phone = "Enter a valid phone number.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      isSubmitting ||
      isOrderComplete ||
      cart.length === 0
    ) {
      return;
    }

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);

      const firstError = Object.keys(errors)[0];

      document
        .getElementById(firstError)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const result = await placeCodOrder({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        items: cart.map((item) => ({
          id: item.id,
          size: item.size || "Standard",
          quantity: Number(item.quantity),
        })),
      });

      if (!result.ok) {
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }

        setSubmitError(
          result.message ||
            "Please correct the highlighted fields and try again."
        );

        setIsSubmitting(false);
        return;
      }

      localStorage.setItem(
        "checkout_saved_info",
        JSON.stringify({
          email: form.email.trim(),
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          postalCode: form.postalCode.trim(),
          phone: form.phone.trim(),
          country: "Pakistan",
        })
      );

      /*
       * Mark checkout successful before clearing the cart.
       * This prevents the empty-cart screen from appearing
       * while the browser redirects to order success.
       */
      setIsOrderComplete(true);

      /*
       * Clear only after Supabase successfully creates:
       * - orders row
       * - order_items rows
       * - stock decrement
       */
      clearCart();

      /*
       * replace() prevents Back navigation from returning
       * customers to a completed checkout page.
       */
      router.replace(
        `/order-success/${result.order.id}`
      );
    } catch (error) {
      console.error("Checkout failed:", error);

      setSubmitError(
        "Unable to place your order. Please try again."
      );

      setIsSubmitting(false);
    }
  };

  /*
   * This screen appears only for the brief moment between:
   *
   * successful database order creation
   *           ↓
   * local cart clearing
   *           ↓
   * navigation to order success
   *
   * It prevents “Your bag is empty” from flashing.
   */
  if (isOrderComplete) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
            <span className="text-lg">✓</span>
          </div>

          <h1 className="mt-5 font-[var(--font-playfair)] text-2xl font-semibold text-store-text">
            Order placed
          </h1>

          <p className="mt-2 text-sm leading-6 text-store-text-secondary">
            Redirecting you to your order confirmation…
          </p>
        </div>
      </div>
    );
  }

  /*
   * Deliberate direct checkout visit with no cart items.
   */
  if (!cart.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center bg-store-bg-secondary">
            <span className="text-xl">🛍</span>
          </div>

          <h1 className="mt-5 font-[var(--font-playfair)] text-2xl font-semibold text-store-text">
            Your bag is empty
          </h1>

          <p className="mt-2 text-sm leading-6 text-store-text-secondary">
            Add something to your bag before heading to checkout.
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
      <div className="border-b border-store-border bg-white px-5 py-8 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-10">
        <CheckoutFormFields
          form={form}
          fieldErrors={fieldErrors}
          handleChange={handleChange}
          isSubmitting={isSubmitting}
          submitError={submitError}
        />
      </div>

      <div className="bg-[#f5f5f5] px-5 py-8 sm:px-10 lg:px-14 lg:py-10">
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />
      </div>
    </form>
  );
}