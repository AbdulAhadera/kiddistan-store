"use client";

import { useEffect, useState } from "react";

import ProductGridCard from "@/components/products/ProductGridCard";

export default function TrendingSection() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchMostViewed = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "/api/products/most-viewed"
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status}`
          );
        }

        const data = await response.json();

        if (!isCancelled) {
          setProducts(data.products ?? []);
        }
      } catch (fetchError) {
        console.error(
          "Failed to fetch most viewed products:",
          fetchError
        );

        if (!isCancelled) {
          setError(
            "Unable to load trending products."
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchMostViewed();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section className="bg-store-bg px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-['Playfair_Display'] text-lg font-bold uppercase tracking-wider text-store-text md:text-xl">
          Trending
        </h2>

        <span className="text-xs uppercase tracking-wide text-store-text-secondary md:text-sm">
          Most Viewed
        </span>
      </div>

      {isLoading && (
        <div className="flex gap-3 overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-[85%] shrink-0 animate-pulse sm:w-[45%] md:w-[23%]"
            >
              <div className="aspect-[3/4] w-full bg-store-bg-secondary" />
              <div className="mt-2.5 h-3 w-3/4 bg-store-bg-secondary" />
              <div className="mt-1.5 h-3 w-1/3 bg-store-bg-secondary" />
            </div>
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="py-4 text-sm text-store-text-secondary">
          {error}
        </p>
      )}

      {!isLoading && !error && products.length === 0 && (
        <p className="py-4 text-sm text-store-text-secondary">
          No trending products available right now.
        </p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <div className="no-scrollbar -mx-4 flex w-[calc(100%+2rem)] snap-x snap-mandatory flex-nowrap gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:w-full md:px-0">
          {products.map((product) => {
            const gender =
              product.gender === "boys" ||
              product.gender === "girls"
                ? product.gender
                : null;

            if (!gender) {
              return null;
            }

            return (
              <div
                key={product.id}
                className="w-[85%] shrink-0 snap-start sm:w-[45%] md:w-[23%]"
              >
                <ProductGridCard
                  product={product}
                  gender={gender}
                  isBaba={gender === "boys"}
                  isNew={product.collection_slugs?.includes(
                    "new-arrivals"
                  )}
                />
              </div>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .no-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}