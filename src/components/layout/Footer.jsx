// src/components/layout/Footer.jsx
"use client";


import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
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
    <footer className="bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* ================= TOP SECTION ================= */}
        <div className="py-12 lg:py-16 border-b border-white/10">
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
                  loading="eager"
                  className="w-36 h-36 object-contain brightness-0 invert"
                />
              </Link>


              <p className="mt-4 max-w-sm text-sm leading-7 text-white/60">
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
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>


                <a
                  href="https://www.facebook.com/profile.php?id=61594247902720"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
              </div>
            </div>


            {/* NEWSLETTER */}
            <div className="lg:col-span-2 lg:max-w-xl lg:ml-auto">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50">
                Stay in the loop
              </p>


              <h2 className="mt-3 text-2xl lg:text-3xl font-semibold tracking-tight text-white">
                New collections. Seasonal drops. No noise.
              </h2>


              <p className="mt-3 text-sm leading-6 text-white/60">
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
                  className="h-12 flex-1 px-4 bg-white/5 border border-white/20 text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/60"
                />


                <button
                  type="submit"
                  className="mt-2 sm:mt-0 sm:ml-2 h-12 px-6 bg-white text-black text-sm font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors"
                >
                  {isSubmitted ? "Subscribed" : "Subscribe"}
                </button>
              </form>


              <p className="mt-2 text-xs text-white/40">
                We respect your inbox. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>


        {/* ================= LINKS ================= */}
        <div className="justify-between py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16">


          {/* CUSTOMER CARE */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
              Customer Care
            </h3>


            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/shipping"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Shipping & Delivery
              </Link>


              <Link
                href="/returns"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Returns & Exchanges
              </Link>


              <Link
                href="/faq"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                FAQs
              </Link>

            </div>
          </div>


          {/* ABOUT */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
              About
            </h3>


            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/privacy"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>


              <Link
                href="/terms"
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>


          {/* CONTACT */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-white">
              Need Help?
            </h3>


            <div className="mt-5 space-y-4">
              <a
                href="tel:+923012987787"
                className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <Image
                  src="/pk-flag.png"
                  alt="Kiddistan Logo"
                  width={20}
                  height={20}
                />
                <span>+92 301 2987787</span>
              </a>


              <a
                href="mailto:info@kiddistan.com"
                className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@kiddistan.com</span>
              </a>


              {/* OFFICE ADDRESS */}
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  DJ Collection, Sector 14/A, House No 92, Orangi Town, Karachi
                </span>
              </div>


              <p className="text-xs leading-6 text-white/40">
                Monday – Saturday
                <br />
                10:00 AM – 8:00 PM PKT
              </p>
            </div>
          </div>
        </div>


        {/* ================= BOTTOM BAR ================= */}
        <div className="border-t border-white/10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} Kiddistan. All rights reserved.
          </p>


          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>Made in</span>
            <span className="text-base">🇵🇰</span>
            <span>Pakistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}