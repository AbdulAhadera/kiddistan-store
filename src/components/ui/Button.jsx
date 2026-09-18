"use client";

import Link from "next/link";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-none font-sans font-semibold uppercase tracking-wider transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-store-primary focus-visible:ring-offset-2 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-store-primary text-white hover:bg-store-primary-hover disabled:bg-store-primary/50",
    secondary:
      "bg-white text-store-primary border border-store-primary hover:bg-store-primary hover:text-white disabled:opacity-50",
    ghost:
      "bg-transparent text-store-text hover:text-store-primary disabled:opacity-50",
  };

  const sizes = {
    sm: "h-10 px-5 text-xs",
    md: "h-11 px-7 text-sm",
    lg: "h-12 px-8 text-sm",
  };

  const width = fullWidth ? "w-full" : "";

  const classes = [
    baseStyles,
    variants[variant],
    sizes[size],
    width,
    loading || disabled ? "cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = loading ? "Loading..." : children;

  if (href && !disabled && !loading) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {content}
    </button>
  );
}