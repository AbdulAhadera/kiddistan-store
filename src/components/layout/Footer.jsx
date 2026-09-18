// src/components/layout/Footer.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, Mail } from "lucide-react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-store-border font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= TOP SECTION ================= */}
        <div className="py-12 lg:py-16 border-b border-store-border">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
            {/* BRAND */}
            <div>
              <Link href="/" className="inline-flex items-center">
                <Image
                  src="/icon.svg"
                  alt="Kiddistan Logo"
                  width={12}
                  height={12}
                  priority
                  className="w-36 h-36 object-contain"
                />
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-7 text-store-text-secondary">
                Thoughtfully designed clothing for little ones, bringing
                together everyday comfort, eastern heritage, and modern
                style.
              </p>

              {/* SOCIAL */}
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/thekiddistan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 border border-store-border flex items-center justify-center text-store-text hover:text-store-primary hover:border-store-primary transition-colors"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61594247902720"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 border border-store-border flex items-center justify-center text-store-text hover:text-store-primary hover:border-store-primary transition-colors"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="lg:col-span-2 lg:max-w-xl lg:ml-auto">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-store-text-secondary">
                Stay in the loop
              </p>

              <h2 className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight text-store-text">
                New collections. Seasonal drops. No noise.
              </h2>

              <p className="mt-3 text-sm leading-6 text-store-text-secondary">
                Get updates about new arrivals, festive collections, and
                occasional offers directly in your inbox.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="mt-6 flex flex-col sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="h-12 flex-1 px-4 bg-store-bg border border-store-border text-sm text-store-text placeholder-store-text-secondary focus:outline-none focus:border-store-primary"
                />

                <button
                  type="submit"
                  className="mt-2 sm:mt-0 sm:ml-2 h-12 px-6 bg-store-primary text-white text-sm font-semibold uppercase tracking-wider hover:bg-store-primary-hover transition-colors"
                >
                  {isSubmitted ? "Subscribed" : "Subscribe"}
                </button>
              </form>

              <p className="mt-2 text-xs text-store-text-secondary">
                We respect your inbox. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* ================= LINKS ================= */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {/* SHOP */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-store-text">
              Shop
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/baba"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Boys
              </Link>

              <Link
                href="/baby"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Girls
              </Link>

              <Link
                href="/baba/eastern"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Eastern Wear
              </Link>

              <Link
                href="/baba/western"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Western Wear
              </Link>

              <Link
                href="/baba/eastern"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Festive Collection
              </Link>
            </div>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-store-text">
              Customer Care
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/contact"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Contact Us
              </Link>

              <Link
                href="/shipping"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Shipping & Delivery
              </Link>

              <Link
                href="/returns"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Returns & Exchanges
              </Link>

              <Link
                href="/faq"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                FAQs
              </Link>

              <Link
                href="/size-guide"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Size Guide
              </Link>
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-store-text">
              About
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/about"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Our Story
              </Link>

              <Link
                href="/lookbook"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Lookbook
              </Link>

              <Link
                href="/privacy"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-store-text">
              Need Help?
            </h3>

            <div className="mt-5 space-y-4">
              <a
                href="tel:+923012987787"
                className="flex items-start gap-3 text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>🇵🇰 +92 301 2987787</span>
              </a>

              <a
                href="mailto:hello@kiddistan.com"
                className="flex items-start gap-3 text-sm text-store-text-secondary hover:text-store-primary transition-colors"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>hello@kiddistan.com</span>
              </a>

              <p className="text-xs leading-6 text-store-text-secondary">
                Monday – Saturday
                <br />
                10:00 AM – 8:00 PM PKT
              </p>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-store-border py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-store-text-secondary text-center md:text-left">
            © {new Date().getFullYear()} Kiddistan. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-store-text-secondary">
            <span>Made in</span>
            <span>🇵🇰</span>
            <span>Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}