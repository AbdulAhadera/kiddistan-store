"use client";

import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    label: "Baby",
    href: "/baby",
    size: "large",
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1400&auto=format&fit=crop",
    tint: "bg-baby-primary",
    copy: "Soft shalwar kameez, angrakha sets and cosy rompers for Eastern wear and everyday.",
  },
  {
    label: "Baba",
    href: "/baba",
    size: "large",
    image:
      "https://images.unsplash.com/flagged/photo-1551600466-464bbbbd15f9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tint: "bg-baba-primary",
    copy: "Kurtas, waistcoats and co-ords for fathers, from Eid to every day.",
  },
  {
    label: "New Arrivals",
    href: "/baby?filter=new-arrivals",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop",
    tint: "bg-store-bg-secondary",
  },
  {
    label: "Boys",
    href: "/baba?filter=boys",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop",
    tint: "bg-store-bg-secondary",
  },
  {
    label: "Girls",
    href: "/baby?filter=girls",
    size: "small",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop",
    tint: "bg-store-bg-secondary",
  },
  {
    label: "Sale",
    href: "/baby?filter=sale",
    size: "sale",
    copy: "Up to 50% off",
  },
];

function PhotoTile({ tile, className }) {
  return (
    <Link
      href={tile.href}
      className={`group relative block overflow-hidden ${tile.tint} ${className}`}
    >
      <Image
        src={tile.image}
        alt={`${tile.label} collection`}
        fill
        sizes={
          tile.size === "large"
            ? "(min-width: 768px) 50vw, 100vw"
            : "(min-width: 768px) 25vw, 50vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div
        className={`absolute left-0 right-0 ${tile.size === "large" ? "bottom-8 px-8" : "bottom-5 px-5"}`}
      >
        <h3
          className={`font-serif uppercase font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] ${
            tile.size === "large" ? "text-3xl md:text-5xl mb-2" : "text-lg md:text-xl"
          }`}
        >
          {tile.label}
        </h3>
        {tile.copy && (
          <p className="text-white/90 text-sm leading-relaxed mb-3 max-w-xs drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
            {tile.copy}
          </p>
        )}
        {tile.size === "large" && (
          <span className="inline-block text-white text-xs font-bold uppercase tracking-wide border-b-2 border-white/70 pb-0.5 group-hover:border-white transition-colors duration-200">
            Shop {tile.label}
          </span>
        )}
      </div>
    </Link>
  );
}

function SaleTile({ tile, className }) {
  return (
    <Link
      href={tile.href}
      className={`group relative block overflow-hidden bg-store-primary text-white hover:bg-white hover:text-store-primary transition-colors duration-200 ${className}`}
    >
      <div
        className="absolute inset-0 opacity-15 group-hover:opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 14px)",
        }}
      />
      <div className="absolute left-5 bottom-5">
        <h3 className="font-serif uppercase font-normal text-lg mb-1">
          {tile.label}
        </h3>
        <p className="text-sm font-semibold">{tile.copy}</p>
      </div>
    </Link>
  );
}

export default function CategorySection() {
  const [baby, baba, newArrivals, boys, girls, sale] = tiles;

  return (
    <div className="flex flex-col">
      {/* Mobile par Text pehle (order-1), Desktop par baad me (md:order-2) */}
      <section
        className="px-4 text-justify sm:px-0 py-12 md:py-20 font-['Noto_Sans_Arabic'] order-1 md:order-2"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="text-store-text text-2xl md:text-3xl font-bold leading-tight max-w-sm">
            ہر خوبصورت لمحے کے لیے تیار
          </h2>
          <p className="text-store-text-secondary  text-sm md:text-base leading-loose max-w-md font-bold">
            کڈستان لایا ہے بچوں کے ملبوسات، والد اور بچوں کے ایک جیسے میچنگ
            سیٹس، اور نوزائیدہ بچوں کی ضروری اشیاء — جو آپ کی خاندانی زندگی کی
            خوبصورت افراتفری، کھیل کود اور بڑھتی عمر کا ساتھ نبھانے کے لیے بنائے
            گئے ہیں۔
          </p>
          <div className="flex gap-8 shrink-0">
            <Link
              href="/baby?filter=new-arrivals"
              className="text-store-text text-xs font-bold uppercase tracking-wide border-b-2 border-store-text pb-0.5 hover:border-store-primary hover:text-store-primary transition-colors duration-200"
            >
              نئی کلیکشن دیکھیں
            </Link>
            <Link
              href="/about"
              className="text-store-text-secondary text-xs font-bold uppercase tracking-wide border-b-2 border-transparent hover:border-store-text hover:text-store-text transition-colors duration-200"
            >
              ہماری کہانی
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile par Pictures baad me (order-2), Desktop par pehle (md:order-1) */}
      <section className="w-screen relative left-1/2 -translate-x-1/2 order-2 md:order-1">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-55 md:auto-rows-65">
          <PhotoTile tile={baby} className="col-span-2 row-span-2" />
          <PhotoTile tile={baba} className="col-span-2 row-span-2" />
          <PhotoTile tile={newArrivals} className="col-span-1 row-span-1" />
          <PhotoTile tile={boys} className="col-span-1 row-span-1" />
          <PhotoTile tile={girls} className="col-span-1 row-span-1" />
          <SaleTile tile={sale} className="col-span-1 row-span-1" />
        </div>
      </section>
    </div>
  );
}