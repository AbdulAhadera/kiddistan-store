"use client";

const TESTIMONIALS = [
  {
    quote:
      "Eid ke liye matching sets banwaye, quality zabardast hai aur photos mein bachay bohot cute lag rahe thay!",
    name: "Ayesha Khan",
    location: "Karachi",
    type: "video",
    src: "/videos/cr-1.mp4",
  },
  {
    quote:
      "Fabric itna soft hai ke bachay pehan ke khush ho jatay hain. Washing ke baad bhi color same rehta hai.",
    name: "Sara Malik",
    location: "Lahore",
    type: "image",
    src: "/samples/hero/hero-1.jpg",
  },
  {
    quote:
      "Finally ek brand jo style aur comfort dono deta hai. Ab har occasion ke liye yahan se hi order karti hoon.",
    name: "Hina Rizvi",
    location: "Islamabad",
    type: "video",
    src: "/videos/cr-1.mp4",
  },
  {
    quote:
      "Prints bohot unique hain aur wash ke baad bhi fade nahi hotay. Bachay bhi love karte hain.",
    name: "Mahnoor Ahmed",
    location: "Rawalpindi",
    type: "image",
    src: "/samples/hero/hero-2.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-store-bg border-t border-store-border px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-none">
        <h2
          className="text-center font-['Playfair_Display'] text-2xl font-bold uppercase tracking-wider text-store-text md:text-3xl"
        >
          Customer Response
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="group relative">
              {/* Media */}
              <div className="relative h-64 w-full overflow-hidden bg-black">
                {t.type === "video" ? (
                  <video
                    src={t.src}
                    className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={t.src}
                    alt={t.name}
                    className="h-full w-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-105"
                  />
                )}

                {/* Overlay with quote */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                  <p className="text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {t.quote}
                  </p>
                </div>
              </div>

              {/* Info below media */}
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-store-text">
                    {t.name}
                  </p>
                  <p className="text-xs text-store-text-secondary">
                    {t.location}
                  </p>
                </div>
                {t.type === "video" && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-store-border">
                    <svg
                      className="ml-0.5 h-3 w-3 text-store-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}