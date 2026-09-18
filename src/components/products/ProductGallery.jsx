"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ---- Zoom settings ----
const ZOOM = 2.5; // 2 = halka zoom, 3 = zyada zoom
const LENS = 100 / ZOOM; // lens ka size (% mein)
const TOP_OFFSET = 110; // sticky header ki height (announcement bar + navbar). Apne header ke hisaab se adjust karo
const EDGE_GAP = 16; // screen ke edge se gap
const PANEL_GAP = 24; // image aur zoom panel ke beech gap

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function ProductGallery({
  product,
  theme = "baby",
}) {
  const themeClasses = {
    baby: {
      bg: "bg-baby-surface",
      primary: "bg-baby-primary",
      border: "border-baby-border",
      mutedBorder: "border-baby-border",
      text: "text-baby-text",
    },
    baba: {
      bg: "bg-baba-surface",
      primary: "bg-baba-primary",
      border: "border-baba-border",
      mutedBorder: "border-baba-border",
      text: "text-baba-text",
    },
  };

  const styles = themeClasses[theme];

  const fallbackImage =
    theme === "baba"
      ? "/samples/baba/sample1.1.png"
      : "/samples/baby/sample1.1.png";

  const images =
    product?.images?.length > 0
      ? product.images
      : [{ url: product?.primary_image || fallbackImage }];

  const [selectedImage, setSelectedImage] = useState(0);

  // Lens position (%) + zoom panel ki screen position (px)
  const [zoom, setZoom] = useState({
    active: false,
    left: 0,
    top: 0,
    panel: { top: 0, left: 0, width: 0, height: 0 },
  });

  const currentImage =
    images[selectedImage]?.url || images[0]?.url;

  const discount =
    product?.compare_at_price &&
    Number(product.compare_at_price) > Number(product.price)
      ? Math.round(
          ((Number(product.compare_at_price) -
            Number(product.price)) /
            Number(product.compare_at_price)) *
            100
        )
      : 0;

  const previousImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  // ---- Zoom handlers ----
  const handlePointerMove = (e) => {
    // Touch / pen pe zoom nahi, sirf mouse pe
    if (e.pointerType && e.pointerType !== "mouse") return;

    const rect = e.currentTarget.getBoundingClientRect();

    // Mouse ki position image ke andar (%)
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;

    // Lens mouse ke center mein, lekin image ke bahar nahi
    const left = clamp(xPct - LENS / 2, 0, 100 - LENS);
    const top = clamp(yPct - LENS / 2, 0, 100 - LENS);

    // ---- Zoom panel ko screen (viewport) ke andar fit karo ----
    const panelLeft = rect.right + PANEL_GAP;
    const availH = window.innerHeight - TOP_OFFSET - EDGE_GAP;
    const availW = window.innerWidth - panelLeft - EDGE_GAP;

    // Image ka aspect ratio barqarar rakhte hue panel chota karo agar zaroorat ho
    const scale = Math.min(1, availH / rect.height, availW / rect.width);
    if (scale <= 0) return;

    const width = rect.width * scale;
    const height = rect.height * scale;

    // Panel image ke saath align rahe, lekin header ke neeche aur screen ke andar
    const panelTop = clamp(
      rect.top,
      TOP_OFFSET,
      window.innerHeight - height - EDGE_GAP
    );

    setZoom({
      active: true,
      left,
      top,
      panel: { top: panelTop, left: panelLeft, width, height },
    });
  };

  const handlePointerLeave = () => {
    setZoom((prev) => ({ ...prev, active: false }));
  };

  // Scroll karne pe zoom band (agli mouse move pe dobara sahi position pe khulega)
  useEffect(() => {
    if (!zoom.active) return;

    const hide = () => setZoom((prev) => ({ ...prev, active: false }));
    window.addEventListener("scroll", hide, { passive: true });

    return () => window.removeEventListener("scroll", hide);
  }, [zoom.active]);

  return (
    <section className="relative lg:w-[92%]">
      <div className={`relative overflow-hidden ${styles.bg}`}>
        <div
          className="relative aspect-[4/4.8] w-full cursor-zoom-in"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <Image
            src={currentImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Lens (mouse ke saath chalne wala square box) */}
          {zoom.active && (
            <div
              className="pointer-events-none absolute hidden border border-neutral-500 bg-white/25 lg:block"
              style={{
                width: `${LENS}%`,
                height: `${LENS}%`,
                left: `${zoom.left}%`,
                top: `${zoom.top}%`,
              }}
            />
          )}

          {discount > 0 && (
            <div
              className={`absolute left-3 top-3 ${styles.primary} px-2.5 py-1.5 text-xs font-semibold tracking-wide text-white`}
            >
              -{discount}%
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous image"
                className={`absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center border ${styles.border} bg-white/90 ${styles.text} transition hover:bg-white`}
              >
                <ChevronLeft size={17} strokeWidth={1.7} />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className={`absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center border ${styles.border} bg-white/90 ${styles.text} transition hover:bg-white`}
              >
                <ChevronRight size={17} strokeWidth={1.7} />
              </button>
            </>
          )}

          <div
            className={`absolute bottom-3 right-3 border ${styles.border} bg-white/90 px-2.5 py-1.5 text-[11px] ${styles.text}`}
          >
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Zoom panel: viewport pe FIXED, isliye scroll pe cut nahi hota */}
      {zoom.active &&
        createPortal(
          <div
            aria-hidden="true"
            className={`pointer-events-none fixed z-40 hidden overflow-hidden border ${styles.border} bg-white shadow-lg lg:block`}
            style={{
              top: zoom.panel.top,
              left: zoom.panel.left,
              width: zoom.panel.width,
              height: zoom.panel.height,
            }}
          >
            <div
              className="absolute left-0 top-0"
              style={{
                width: `${ZOOM * 100}%`,
                height: `${ZOOM * 100}%`,
                transform: `translate(-${zoom.left}%, -${zoom.top}%)`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
              />
            </div>
          </div>,
          document.body
        )}

      {images.length > 1 && (
        <div className="mt-2.5 grid grid-cols-5 gap-1.5">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative aspect-square overflow-hidden border transition ${
                selectedImage === index
                  ? styles.primary.replace("bg-", "border-")
                  : `${styles.mutedBorder} opacity-65 hover:opacity-100`
              }`}
            >
              <Image
                src={image.url}
                alt={`${product.name} ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <input
        type="hidden"
        value={currentImage}
        readOnly
        data-current-product-image={currentImage}
      />
    </section>
  );
}