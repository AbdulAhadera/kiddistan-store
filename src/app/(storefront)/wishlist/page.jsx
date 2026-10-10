
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ArrowRight, ShoppingBag, ArrowUpRight } from "lucide-react";

import WishlistCard from "@/components/products/WishlistCard";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const syncWishlist = () => {
            try {
                const stored = JSON.parse(
                    localStorage.getItem("wishlist") || "[]"
                );
                setWishlist(Array.isArray(stored) ? stored : []);
            } catch {
                setWishlist([]);
            } finally {
                setIsLoading(false);
            }
        };

        syncWishlist();

        window.addEventListener("wishlistUpdated", syncWishlist);
        window.addEventListener("storage", syncWishlist);

        return () => {
            window.removeEventListener("wishlistUpdated", syncWishlist);
            window.removeEventListener("storage", syncWishlist);
        };
    }, []);

    const showToast = (message) => {
        setToast(message);
        window.setTimeout(() => setToast(null), 1800);
    };

    const handleRemove = (productId) => {
        const updated = wishlist.filter((item) => item.id !== productId);

        localStorage.setItem("wishlist", JSON.stringify(updated));
        setWishlist(updated);

        window.dispatchEvent(
            new CustomEvent("wishlistUpdated", {
                detail: updated,
            })
        );

        if (navigator.vibrate) navigator.vibrate(30);

        showToast("Removed from Wishlist");
    };

    return (
        <main className="min-h-screen bg-white text-store-text">
            <div className="mx-auto w-full px-4 pb-20 pt-8 sm:px-6 sm:pt-12 lg:px-10 lg:pt-16">
                {/* Header */}
                <div className="border-b border-store-border pb-7 sm:pb-9">
                    <div className="mb-5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-store-text-secondary">
                        <Link href="/" className="transition-colors hover:text-black">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-store-text">Wishlist</span>
                    </div>

                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-store-text-secondary">
                                Your personal collection
                            </p>

                            <h1 className="font-[var(--font-playfair)] text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
                                Wishlist<span className="text-store-text-secondary">.</span>
                            </h1>

                            <p className="mt-3 max-w-md text-sm leading-6 text-store-text-secondary">
                                The pieces you love, all in one place.
                            </p>
                        </div>

                        {!isLoading && wishlist.length > 0 && (
                            <div className="flex items-center gap-3 border-t border-store-border pt-4 sm:border-t-0 sm:pt-0">
                                <Heart
                                    className="h-4 w-4"
                                    strokeWidth={1.5}
                                />
                                <span className="text-xs font-medium">
                                    {wishlist.length}{" "}
                                    {wishlist.length === 1 ? "ITEM" : "ITEMS"} SAVED
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="grid grid-cols-2 gap-x-3 gap-y-8 pt-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="aspect-[4/5] w-full bg-store-bg-secondary" />
                                <div className="mt-4 h-3 w-3/4 bg-store-bg-secondary" />
                                <div className="mt-3 h-3 w-1/2 bg-store-bg-secondary" />
                                <div className="mt-5 h-10 w-full bg-store-bg-secondary" />
                            </div>
                        ))}
                    </div>
                ) : wishlist.length === 0 ? (
                    <motion.section
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="flex min-h-[55vh] flex-col items-center justify-center py-16 text-center"
                    >
                        <div className="relative mb-7 flex h-24 w-24 items-center justify-center border border-store-border">
                            <Heart
                                className="h-9 w-9"
                                strokeWidth={1}
                            />
                            <span className="absolute -right-1 -top-1 h-3 w-3 bg-black" />
                        </div>

                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-store-text-secondary">
                            Nothing saved yet
                        </p>

                        <h2 className="font-[var(--font-playfair)] text-3xl font-medium sm:text-4xl">
                            Your wishlist is waiting.
                        </h2>

                        <p className="mt-4 max-w-sm px-3 text-sm leading-7 text-store-text-secondary">
                            Found something you love? Save it here and come back
                            whenever you're ready.
                        </p>

                        <Link
                            href="/"
                            className="group mt-8 inline-flex h-12 items-center justify-center gap-5 bg-black px-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
                        >
                            Explore Collection
                            <ArrowRight
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                strokeWidth={1.5}
                            />
                        </Link>

                        <div className="mt-12 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-store-text-secondary">
                            <ShoppingBag className="h-3.5 w-3.5" />
                            Discover your next favourite
                        </div>
                    </motion.section>
                ) : (
                    <section className="pt-6 sm:pt-8">
                        <div className="mb-5 flex items-center justify-between">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-store-text-secondary">
                                Saved pieces
                            </p>

                            <Link
                                href="/"
                                className="group inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-store-text-secondary"
                            >
                                Continue shopping
                                <ArrowUpRight
                                    className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    strokeWidth={1.5}
                                />
                            </Link>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.35 }}
                            className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6"
                        >
                            {wishlist.map((item) => (
                                <WishlistCard
                                    key={item.id}
                                    product={item}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </motion.div>
                    </section>
                )}
            </div>

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-5 left-4 right-4 z-50 flex justify-center sm:left-auto sm:right-6"
                    >
                        <div className="flex w-full max-w-sm items-center gap-3 border border-black/10 bg-white px-5 py-4 text-xs text-black shadow-xl sm:w-auto">
                            <Heart
                                className="h-4 w-4 shrink-0 fill-red-500 text-red-500"
                            />
                            <span>{toast}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
