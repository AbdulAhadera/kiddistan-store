import { notFound } from "next/navigation";
import FemaleSection from "@/components/sections/female/FemaleSection";
import MaleSection from "@/components/sections/male/MaleSection";

export default async function GenderPage({ params }) {
  const { gender } = await params;
  const route = gender?.toLowerCase();

  if (route === "baba") {
    return (
      <div className="bg-baba-bg min-h-screen text-baba-text">
        <main className="container mx-auto px-4 lg:px-8 py-8">
          <MaleSection />
        </main>
      </div>
    );
  }

  if (route === "baby") {
    return (
      <div className="bg-baby-bg min-h-screen text-baby-text">
        <main className="container mx-auto px-4 lg:px-8 py-8">
          <FemaleSection />
        </main>
      </div>
    );
  }

  notFound();
}