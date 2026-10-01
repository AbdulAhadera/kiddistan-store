// src/components/sections/landing/SaleSection.jsx
import Link from "next/link";
import SaleProductCard from "@/components/products/SaleProductCard";
import { getActiveProducts } from "@/services/products";


export default async function SaleSection({ gender }) {
  const allProducts = await getActiveProducts();
  
  // Filter by gender if provided
  let filteredProducts = allProducts;
  
  if (gender) {
    filteredProducts = allProducts.filter(product => {
      const categorySlug = product.category?.slug?.toLowerCase() || '';
      
      if (gender === 'boys') {
        return categorySlug.startsWith('boys-');
      }
      if (gender === 'girls') {
        return categorySlug.startsWith('girls-');
      }
      return true;
    });
  }
  
  // Filter sale products (with discount)
  const saleProducts = filteredProducts
    .filter(product => product.compare_at_price && product.compare_at_price > product.price)
    .slice(0, 8);


  return (
    <section className="py-6 md:py-8 px-6 md:px-12 bg-store-bg border-store-border">
      <div className="max-w-auto mx-auto">
        {/* Infinite SALE Banner */}
        <div className="h-4 bg-red-600 text-white overflow-hidden border-y-2 border-red-700 mb-10 md:mb-16 -mx-6 md:-mx-12 px-6 md:px-12">
          <div className="flex h-full w-max animate-marquee">
            {Array.from({ length: 30 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center h-full px-6"
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                  SALE
                </span>
                <span className="mx-4 text-[12px]">✦</span>
              </div>
            ))}
          </div>
        </div>


        {/* Heading - Centered & Smaller */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-store-text mb-2 md:mb-3 tracking-tight">
            The Little Sale
          </h2>
          <p className="text-store-text-secondary text-sm sm:text-base md:text-lg font-light">
            More play. Less spend.
          </p>
        </div>


        {/* Products - 2 columns on mobile */}
        {saleProducts.length === 0 ? (
          <div className="text-center py-16 bg-store-bg-secondary rounded-xl">
            <p className="text-store-text-secondary text-base md:text-lg">No sale products available.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {saleProducts.map((product) => (
                <SaleProductCard 
                  key={product.id} 
                  product={product}
                  gender={gender}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}