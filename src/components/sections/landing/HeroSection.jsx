"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

const desktopSlides = [
  {
    id: 1,
    image: "/samples/hero/hero-desktop-1.jpg",
    alt: "Kiddistan kids collection",
  },
  {
    id: 2,
    image: "/samples/hero/hero-desktop-2.jpg",
    alt: "Kiddistan boys collection",
  },
];

const mobileSlides = [
  {
    id: 1,
    image: "/samples/hero/hero-mobile1.jpg",
    alt: "Kiddistan kids collection",
  },
  {
    id: 2,
    image: "/samples/hero/hero-mobile2.jpg",
    alt: "Kiddistan boys collection",
  },
  {
    id: 3,
    image: "/samples/hero/hero-mobile3.jpg",
    alt: "Kiddistan girls collection",
  },
  {
    id: 4,
    image: "/samples/hero/hero-mobile4.jpg",
    alt: "Kiddistan seasonal collection",
  },
];

function HeroCarousel({ slides, isMobile }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current
              ? "opacity-100 z-10"
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            sizes={isMobile ? "100vw" : "100vw"}
            className="object-cover"
          />
        </div>
      ))}

      {/* Prev button */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-colors hover:bg-white/30 md:left-6 md:h-12 md:w-12"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition-colors hover:bg-white/30 md:right-6 md:h-12 md:w-12"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M7.5 15L12.5 10L7.5 5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 md:bottom-7 md:gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 rounded-full p-0 transition-all duration-300 ${
              i === current ? "w-7 bg-white" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 h-[calc(100vh-var(--navbar-height,88px))] overflow-hidden bg-black">
      {/* Mobile Carousel — 4 slides, sirf mobile pe */}
      <div className="h-full w-full md:hidden">
        <HeroCarousel slides={mobileSlides} isMobile={true} />
      </div>

      {/* Desktop Carousel — 2 slides, sirf desktop pe */}
      <div className="hidden h-full w-full md:block">
        <HeroCarousel slides={desktopSlides} isMobile={false} />
      </div>
    </section>
  );
}