// src/components/products/SaleProductCard.jsx
import Image from "next/image";
import Link from "next/link";


export default function SaleProductCard({ product, gender }) {
  const discount = product.compare_at_price && product.compare_at_price > product.price
    ? Math.round(
        ((product.compare_at_price - product.price) /
          product.compare_at_price) *
          100
      )
    : 0;


  const image =
    product.images?.[0]?.url ||
    product.images?.[0] ||
    product.image_url ||
    product.image ||
    product.primary_image;


  const productName = product.name || product.title || "Untitled Product";
  const productHref = gender ? `/${gender}/${product.slug}` : `/products/${product.slug}`;


  const formatPrice = (price) =>
    `Rs. ${Number(price).toLocaleString("en-PK")}`;


  if (!product?.id || !product?.slug || !image) {
    return null;
  }


  return (
    <Link href={productHref} className="group block">
      <article className="relative overflow-hidden bg-white border border-store-border hover:border-red-600/50 transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-store-bg-secondary">
          <Image
            src={image}
            alt={productName}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Discount Badge - Sharp corner */}
          {discount > 0 && (
            <div className="absolute top-0 right-0 z-20">
              <div className="bg-red-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
                <span className="block text-lg leading-none">{discount}%</span>
                <span className="block text-[8px] uppercase tracking-wider mt-0.5">OFF</span>
              </div>
            </div>
          )}
          
          {/* Sale ribbon */}
          {discount > 0 && (
            <div className="absolute top-0 left-0">
              <div className="bg-red-600 text-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider">
                Sale
              </div>
            </div>
          )}
        </div>


        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          {product.category?.name && (
            <div className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-store-text-secondary">
              {product.category.name}
            </div>
          )}
          
          {/* Product name */}
          <h3 className="font-[var(--font-playfair)] text-base font-medium text-store-text mb-3 leading-snug group-hover:text-red-600 transition-colors duration-300">
            {productName}
          </h3>
          
          {/* Price section */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-lg font-bold text-red-600 leading-none">
                {formatPrice(product.price)}
              </div>
              
              {product.compare_at_price && product.compare_at_price > product.price && (
                <div className="text-xs text-stone-400 line-through mt-1">
                  {formatPrice(product.compare_at_price)}
                </div>
              )}
            </div>
            
            {product.compare_at_price && product.compare_at_price > product.price && (
              <div className="text-right">
                <div className="text-[9px] text-stone-500 uppercase tracking-wider font-semibold">
                  Save
                </div>
                <div className="text-sm font-bold text-green-600 leading-none mt-0.5">
                  {formatPrice(product.compare_at_price - product.price)}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}