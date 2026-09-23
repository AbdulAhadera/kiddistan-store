"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ZOOM = 2.5;
const LENS = 100 / ZOOM;
const TOP_OFFSET = 110;
const EDGE_GAP = 16;
const PANEL_GAP = 24;

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export default function ProductGallery({
  product,
  theme = "baby",
  onImageChange,
}) {
  const themeClasses = {
    baby: {
      bg: "bg-baby-surface",
      primary: "bg-baby-primary",
      primaryBorder: "border-baby-primary",
      border: "border-baby-border",
      mutedBorder: "border-baby-border",
      text: "text-baby-text",
    },
    baba: {
      bg: "bg-baba-surface",
      primary: "bg-baba-primary",
      primaryBorder: "border-baba-primary",
      border: "border-baba-border",
      mutedBorder: "border-baba-border",
      text: "text-baba-text",
    },
  };

  const styles = themeClasses[theme] || themeClasses.baby;

  const images = useMemo(() => {
    const productImages = (product?.images ?? [])
      .filter((image) => image?.url)
      .sort((first, second) => {
        if (first.is_primary !== second.is_primary) {
          return Number(second.is_primary) - Number(first.is_primary);
        }

        return (
          Number(first.sort_order) -
          Number(second.sort_order)
        );
      });

    if (productImages.length > 0) {
      return productImages;
    }

    if (product?.primary_image) {
      return [
        {
          id: product.id,
          url: product.primary_image,
          is_primary: true,
          sort_order: 0,
        },
      ];
    }

    return [];
  }, [product?.id, product?.images, product?.primary_image]);

  const [selectedImage, setSelectedImage] = useState(0);

  const [zoom, setZoom] = useState({
    active: false,
    left: 0,
    top: 0,
    panel: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
  });

  useEffect(() => {
    setSelectedImage(0);
    setZoom((previous) => ({
      ...previous,
      active: false,
    }));
  }, [product?.id]);

  const currentImage =
    images[selectedImage]?.url || images[0]?.url || null;

  useEffect(() => {
    onImageChange?.(currentImage);
  }, [currentImage, onImageChange]);

  useEffect(() => {
    if (!zoom.active) {
      return;
    }

    const hideZoom = () => {
      setZoom((previous) => ({
        ...previous,
        active: false,
      }));
    };

    window.addEventListener("scroll", hideZoom, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", hideZoom);
    };
  }, [zoom.active]);

  if (!currentImage) {
    return null;
  }

  const comparePrice =
    product?.compare_at_price === null ||
    product?.compare_at_price === undefined
      ? null
      : Number(product.compare_at_price);

  const discount =
    comparePrice !== null &&
    comparePrice > Number(product?.price)
      ? Math.round(
          ((comparePrice - Number(product.price)) /
            comparePrice) *
            100
        )
      : 0;

  const previousImage = () => {
    setSelectedImage(
      (previous) =>
        (previous - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setSelectedImage(
      (previous) => (previous + 1) % images.length
    );
  };

  const handlePointerMove = (event) => {
    if (
      event.pointerType &&
      event.pointerType !== "mouse"
    ) {
      return;
    }

    const rect =
      event.currentTarget.getBoundingClientRect();

    const xPercent =
      ((event.clientX - rect.left) / rect.width) * 100;

    const yPercent =
      ((event.clientY - rect.top) / rect.height) * 100;

    const left = clamp(
      xPercent - LENS / 2,
      0,
      100 - LENS
    );

    const top = clamp(
      yPercent - LENS / 2,
      0,
      100 - LENS
    );

    const panelLeft = rect.right + PANEL_GAP;
    const availableHeight =
      window.innerHeight - TOP_OFFSET - EDGE_GAP;

    const availableWidth =
      window.innerWidth - panelLeft - EDGE_GAP;

    const scale = Math.min(
      1,
      availableHeight / rect.height,
      availableWidth / rect.width
    );

    if (scale <= 0) {
      return;
    }

    const width = rect.width * scale;
    const height = rect.height * scale;

    const panelTop = clamp(
      rect.top,
      TOP_OFFSET,
      window.innerHeight - height - EDGE_GAP
    );

    setZoom({
      active: true,
      left,
      top,
      panel: {
        top: panelTop,
        left: panelLeft,
        width,
        height,
      },
    });
  };

  const handlePointerLeave = () => {
    setZoom((previous) => ({
      ...previous,
      active: false,
    }));
  };

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
                className={`absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center border ${styles.border} ${styles.text} cursor-pointer bg-white/90 transition hover:bg-white`}
              >
                <ChevronLeft
                  size={17}
                  strokeWidth={1.7}
                />
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next image"
                className={`absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center border ${styles.border} ${styles.text} cursor-pointer bg-white/90 transition hover:bg-white`}
              >
                <ChevronRight
                  size={17}
                  strokeWidth={1.7}
                />
              </button>
            </>
          )}

          <div
            className={`absolute bottom-3 right-3 border ${styles.border} ${styles.text} bg-white/90 px-2.5 py-1.5 text-[11px]`}
          >
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      </div>

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
              key={image.id || `${image.url}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative aspect-square overflow-hidden border transition ${
                selectedImage === index
                  ? styles.primaryBorder
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