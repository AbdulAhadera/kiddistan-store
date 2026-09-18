import "./globals.css";
import { Manrope, Noto_Sans_Arabic, Playfair_Display } from "next/font/google";

// 1. English Body Font
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

// 2. Headings Font
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// 3. Urdu Font Configuration
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-arabic",
  display: "swap",
});

export const metadata = {
  title: "Kiddistan | Premium Kids & Baby Apparel",
  description:
    "Explore high-quality, culturally rich apparel for children aged 1.5 to 12 years. Discover Kurtas, Waistcoats, Lehengas & more, designed and made in Pakistan.",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  charSet: "utf-8",
  icons: {
    icon: "/icon.svg",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} ${notoSansArabic.variable}`}
    >
      <body
        className={`${manrope.className} bg-slate-50 text-slate-900 antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
