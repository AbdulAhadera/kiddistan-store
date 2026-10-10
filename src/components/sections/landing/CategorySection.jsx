import Image from "next/image";
import Link from "next/link";

const tiles = [
  {
    label: "New Arrivals",
    href: "/collections/new-arrivals",
    size: "small",
    image: "/samples/category/new.jpg",
    tint: "bg-store-bg-secondary",
  },
  {
    label: "Boys",
    href: "/boys",
    size: "small",
    image: "/samples/category/boy.jpg",
    tint: "bg-store-bg-secondary",
  },
  {
    label: "Girls",
    href: "/girls",
    size: "small",
    image: "/samples/category/girl.jpg",
    tint: "bg-store-bg-secondary",
  },
  {
    label: "Sale",
    href: "/sale",
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
        sizes="(min-width: 768px) 25vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute left-0 right-0 bottom-5 px-5">
        <h3 className="font-serif uppercase font-normal text-lg md:text-xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          {tile.label}
        </h3>
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
  const [newArrivals, boys, girls, sale] = tiles;

  return (
    <div className="flex flex-col">
      <section className="w-screen relative left-1/2 -translate-x-1/2">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-55 md:auto-rows-65">
          <PhotoTile tile={newArrivals} className="col-span-1 row-span-1" />
          <PhotoTile tile={boys} className="col-span-1 row-span-1" />
          <PhotoTile tile={girls} className="col-span-1 row-span-1" />
          <SaleTile tile={sale} className="col-span-1 row-span-1" />
        </div>
      </section>
    </div>
  );
}