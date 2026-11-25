import React from "react";
import { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { getProducts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Best Sellers | Most Coveted Royal Fragrances | MIYA JI OUD",
  description:
    "Explore the most celebrated and beloved Eau De Parfums and Attars by Miya Ji Oud. Opulent aged oud and taif rose masterpieces.",
};

export default async function BestSellersPage() {
  const allProducts = await getProducts();
  const topSellers = allProducts.filter((p) => p.isTopSeller);

  return (
    <CatalogView
      pageTitle="Royal Best Sellers"
      badgeText="Signature Collection"
      description="Our most sought-after olfactory masterpieces, celebrated by royal patrons and perfume connoisseurs worldwide for their extraordinary sillage and hypnotic depth."
      products={topSellers}
      currentSlug="best-sellers"
    />
  );
}
