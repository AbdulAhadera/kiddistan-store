import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const StorefrontLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-store-bg text-store-text">
      <Header />

      <main className="flex-1 container mx-auto">{children}</main>

      <Footer />
    </div>
  );
};

export default StorefrontLayout;
