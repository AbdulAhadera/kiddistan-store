"use client";

import { useEffect, useState } from "react";
import ProductGallery from "@/components/products/ProductGallery.jsx";
import ProductDetails from "@/components/products/ProductDetails.jsx";
import ProductPurchase from "@/components/products/ProductPurchase.jsx";

export default function Product({
  product,
  theme = "baby",
}) {
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImage, setCurrentImage] = useState(
    product?.primary_image || null
  );

  // Product server se load/update hone par primary image sync karo
  useEffect(() => {
    setCurrentImage(product?.primary_image || null);
  }, [product?.primary_image]);

  return (
    <main
      className={
        theme === "baba"
          ? "min-h-screen bg-baba-bg text-baba-text"
          : "min-h-screen bg-baby-bg text-baby-text"
      }
    >
      <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <ProductGallery
            product={product}
            theme={theme}
            onImageChange={setCurrentImage}
          />

          <div>
            <ProductDetails
              product={product}
              theme={theme}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <ProductPurchase
              product={product}
              theme={theme}
              selectedSize={selectedSize}
              currentImage={currentImage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}