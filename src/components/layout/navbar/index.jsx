"use client";

import { useEffect, useState } from "react";

import DesktopNavbar from "./DesktopNavbar.jsx";
import MobileNavbar from "./MobileNavbar.jsx";
import SearchModal from "./SearchModal.jsx";
import CartDrawer from "../../cart/CartDrawer.jsx";

import {
  getCart,
  getCartCount,
} from "@/lib/cart";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const syncCart = () => {
      const cart = getCart();
      const count = getCartCount(cart);

      setCartCount(count);
    };

    const syncWishlist = () => {
      try {
        const wishlist = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        setWishlistCount(wishlist.length);
      } catch {
        setWishlistCount(0);
      }
    };

    // Initial load
    syncCart();
    syncWishlist();

    // Cart events
    window.addEventListener("cartUpdated", syncCart);
    window.addEventListener("storage", syncCart);

    // Wishlist events
    window.addEventListener("wishlistUpdated", syncWishlist);
    window.addEventListener("storage", syncWishlist);

    // Open drawer when product is added
    const handleOpenCart = () => {
      setIsCartOpen(true);
    };

    window.addEventListener("openCartDrawer", handleOpenCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("wishlistUpdated", syncWishlist);
      window.removeEventListener("storage", syncWishlist);
      window.removeEventListener("openCartDrawer", handleOpenCart);
    };
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <DesktopNavbar
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
        />
      </div>

      {/* Mobile Navbar */}
      <MobileNavbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Search */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}