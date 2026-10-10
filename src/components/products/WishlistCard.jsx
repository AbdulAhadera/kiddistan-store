"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, X, Heart } from "lucide-react";

export default function WishlistCard({ product, onRemove }) {
  if (!product?.id || !product?.slug || !product?.name) {
    return null;
  }

  const gender =
    product.gender === "boys" || product.gender === "girls"
      ? product.gender
      : null;

  const image =
    product.primary_image ||
    product.image ||
    product.images?.find((item) => item?.is_primary)?.url ||
    product.images?.[0]?.url ||
    null;

  const price = Number(product.price ?? 0);
  const comparePrice =
    product.compare_at_price == null
      ? null
      : Number(product.compare_at_price);

  const isOnSale = comparePrice !== null && comparePrice > price;
  const discountPercent = isOnSale
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  const productUrl = gender ? `/${gender}/${product.slug}` : "/";

  return (
    <article className="group relative flex flex-col overflow-hidden border border-store-border bg-white transition-all duration-300 hover:shadow-lg">
      {/* TOP: IMAGE */}
      <div className="relative aspect-[4/5] overflow-hidden bg-store-bg-secondary">
        <Link
          href={productUrl}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          {image && (
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>

        {/* Gradient overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Sale badge */}
        {isOnSale && (
          <span className="absolute left-3 top-3 bg-red-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
            -{discountPercent}%
          </span>
        )}

        {/* Wishlist heart badge */}
        <span className="absolute left-3 bottom-3 flex h-8 w-8 items-center justify-center bg-white/90 shadow-md">
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
        </span>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => onRemove?.(product.id)}
          aria-label={`Remove ${product.name} from wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-white/95 text-neutral-900 shadow-md transition-transform hover:scale-110 hover:bg-white"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      {/* BOTTOM: INFO + PRICE + BUTTON */}
      <div className="flex flex-1 flex-col p-4">
        <Link href={productUrl} className="block">
          <h2 className="line-clamp-2 min-h-[2.75rem] font-[var(--font-playfair)] text-base leading-snug text-store-text transition-colors group-hover:text-black">
            {product.name}
          </h2>
        </Link>

        <div className="mt-2 flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold text-store-text">
            {product.currency || "PKR"} {price.toLocaleString()}
          </p>

          {isOnSale && (
            <p className="whitespace-nowrap text-xs text-stone-400 line-through">
              {product.currency || "PKR"}{" "}
              {comparePrice.toLocaleString()}
            </p>
          )}
        </div>

        <Link
          href={productUrl}
          className="mt-4 flex h-10 w-full items-center justify-center gap-2 bg-black text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800"
        >
          <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.8} />
          View Product
        </Link>
      </div>
    </article>
  );
}