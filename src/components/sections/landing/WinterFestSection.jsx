"use client";

import Image from "next/image";
import Link from "next/link";

export default function WinterFestSection() {
  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/winter-fest-bg.jpg"
          alt="Winter Fest background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_center] sm:object-center"
          quality={90}
        />

        {/* Light overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10 md:justify-center md:pb-0 md:px-12">
        {/* Main heading */}
        <div className="mb-10 md:mb-16">
          <h2 className="mb-3 font-['Playfair_Display'] text-4xl font-bold leading-tight tracking-wide text-white drop-shadow-2xl sm:text-5xl md:mb-4 md:text-7xl lg:text-9xl">
            WINTER FEST '26
          </h2>

          <p className="text-base font-light text-white drop-shadow-lg sm:text-lg md:text-2xl lg:text-3xl">
            Little layers. Big moments.
          </p>
        </div>

        {/* CTA + handwritten note */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
          <Link
            href="/collections/winter-fest"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-900 shadow-2xl transition-all hover:scale-105 hover:bg-stone-200 md:w-auto md:gap-3 md:px-8 md:py-4 md:text-lg"
          >
            EXPLORE WINTER FEST

            <svg
              className="h-4 w-4 transform transition-transform group-hover:translate-x-1 md:h-5 md:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          <p className="text-center font-['Dancing_Script'] text-base italic text-white drop-shadow-lg md:text-left md:text-lg lg:text-xl">
            Made for chilly mornings, family dinners & little adventures.
          </p>
        </div>
      </div>
    </section>
  );
}