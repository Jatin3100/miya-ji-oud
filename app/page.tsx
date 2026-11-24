import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TopSellers from "@/components/TopSellers";
import ShopByCategory from "@/components/ShopByCategory";
import BakhoorSet from "@/components/BakhoorSet";
import Featured from "@/components/Featured";
import BoutiqueStores from "@/components/BoutiqueStores";
import FragranceStory from "@/components/FragranceStory";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#DCA52D] selection:text-white">
      {/* 1. Header / Navbar (Sticky at the top of the viewport) */}
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Top Sellers */}
        <TopSellers />

        {/* 4. Shop by Category */}
        <ShopByCategory />

        {/* 5. Bakhoor Set */}
        <BakhoorSet />

        {/* 6. Featured Section */}
        <Featured />

        {/* 7. Boutique Retail Stores */}
        <BoutiqueStores />

        {/* 8. A Fragrance Story */}
        <FragranceStory />

        {/* 9. Footer */}
        <Footer />

        {/* 10. Floating Action Buttons */}
        <FloatingButtons />
      </main>
    </div>
  );
}
