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

  useEffect(() => {
    const syncCart = () => {
      const cart = getCart();
      const count = getCartCount(cart);

      setCartCount(count);
    };

    // Initial cart load
    syncCart();

    // Our custom cart event
    window.addEventListener(
      "cartUpdated",
      syncCart
    );

    // Cross-tab localStorage changes
    window.addEventListener(
      "storage",
      syncCart
    );

    // Open drawer when product is added
    const handleOpenCart = () => {
      setIsCartOpen(true);
    };

    window.addEventListener(
      "openCartDrawer",
      handleOpenCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        syncCart
      );

      window.removeEventListener(
        "storage",
        syncCart
      );

      window.removeEventListener(
        "openCartDrawer",
        handleOpenCart
      );
    };
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden lg:block">
        <DesktopNavbar
          cartCount={cartCount}
          onOpenSearch={() =>
            setIsSearchOpen(true)
          }
          onOpenCart={() =>
            setIsCartOpen(true)
          }
        />
      </div>

      {/* Mobile Navbar */}
      <MobileNavbar
        cartCount={cartCount}
        onOpenSearch={() =>
          setIsSearchOpen(true)
        }
        onOpenCart={() =>
          setIsCartOpen(true)
        }
      />

      {/* Search */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() =>
          setIsSearchOpen(false)
        }
      />

      {/* Cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() =>
          setIsCartOpen(false)
        }
      />
    </>
  );
}