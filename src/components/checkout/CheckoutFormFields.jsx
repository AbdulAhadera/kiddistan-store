"use client";

export default function CheckoutFormFields({
  form = {},
  fieldErrors = {},
  handleChange,
  isSubmitting = false,
  submitError = "",
}) {
  return (
    <div className="mx-auto max-w-lg lg:ml-auto lg:mr-0 lg:pr-8">
      <section className="pb-7">
        <SectionHeading
          title="Contact"
          description="Enter your contact information for order updates."
        />

        <div className="space-y-3">
          <Field
            id="email"
            name="email"
            label="Email address"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
          />
        </div>
      </section>

      <Divider />

      <section className="py-7">
        <SectionHeading
          title="Delivery"
          description="Where should we deliver your order?"
        />

        <div className="space-y-3">
          <Field
            id="country"
            name="country"
            label="Country / Region"
            value={form.country || "Pakistan"}
            onChange={handleChange}
            readOnly
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              id="firstName"
              name="firstName"
              label="First name"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Ahmed"
              autoComplete="given-name"
              error={fieldErrors.firstName}
              required
            />

            <Field
              id="lastName"
              name="lastName"
              label="Last name"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Khan"
              autoComplete="family-name"
              error={fieldErrors.lastName}
              required
            />
          </div>

          <Field
            id="address"
            name="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
            placeholder="House no., street, block, nearest landmark"
            autoComplete="street-address"
            error={fieldErrors.address}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              id="city"
              name="city"
              label="City"
              value={form.city}
              onChange={handleChange}
              placeholder="Karachi"
              autoComplete="address-level2"
              error={fieldErrors.city}
              required
            />

            <Field
              id="postalCode"
              name="postalCode"
              label="Postal code"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="75300"
              autoComplete="postal-code"
              inputMode="numeric"
            />
          </div>

          <Field
            id="phone"
            name="phone"
            label="Phone number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+92 3XX XXXXXXX"
            autoComplete="tel"
            inputMode="tel"
            error={fieldErrors.phone}
            required
          />
        </div>
      </section>

      <Divider />

      <section className="py-7">
        <SectionHeading title="Shipping Method" />

        <div className="flex items-center justify-between border border-store-border bg-store-bg-secondary px-4 py-3">
          <div>
            <p className="text-[13px] font-semibold text-store-text">
              Free Delivery
            </p>

            <p className="mt-0.5 text-[10px] text-store-text-secondary">
              Nationwide
            </p>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-store-text">
            FREE
          </span>
        </div>
      </section>

      <Divider />

      <section className="py-7">
        <SectionHeading
          title="Payment"
          description="Cash on Delivery is currently available."
        />

        <div className="overflow-hidden border border-store-border">
          <PaymentOption
            value="COD"
            selected
            onChange={handleChange}
            title="Cash on Delivery"
            subtitle="Pay when your order arrives."
          />
        </div>
      </section>

      {submitError && (
        <div
          role="alert"
          className="mb-5 border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700"
        >
          {submitError}
        </div>
      )}

      <div className="pb-8 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center bg-black text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-all duration-200 hover:bg-neutral-800 active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Processing Order..."
            : "Place COD Order"}
        </button>

        <p className="mt-2 text-center text-[9px] text-store-text-secondary">
          By placing your order, you agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  description,
}) {
  return (
    <div className="mb-4">
      <h2 className="font-[var(--font-playfair)] text-xl font-semibold text-store-text">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-[10px] leading-4 text-store-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div className="border-t border-store-border" />
  );
}

function Field({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  autoComplete,
  inputMode,
  error,
  readOnly = false,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-store-text"
      >
        {label}

        {required && (
          <span className="ml-0.5 text-red-500">*</span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        readOnly={readOnly}
        className={`h-9.5 w-full border bg-white px-3 text-[13px] text-store-text outline-none transition-all duration-200 placeholder:text-zinc-400 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/10"
            : "border-store-border focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800/10"
        } ${
          readOnly
            ? "cursor-default bg-store-bg-secondary"
            : ""
        }`}
      />

      {error && (
        <p className="mt-1 text-[9px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function PaymentOption({
  value,
  selected,
  onChange,
  title,
  subtitle,
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors ${
        selected
          ? "bg-[#f7f7f7]"
          : "bg-white"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={selected}
        onChange={onChange}
        className="h-3.5 w-3.5 shrink-0 accent-black"
      />

      <div className="min-w-0 flex-1">
        <p className="text-[12px] font-semibold text-store-text">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] leading-4 text-store-text-secondary">
          {subtitle}
        </p>
      </div>

      <span className="text-[9px] font-bold uppercase tracking-wider text-store-text">
        Selected
      </span>
    </label>
  );
}