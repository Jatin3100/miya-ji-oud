import React from "react";
import { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { getProducts } from "@/lib/db";

export const metadata: Metadata = {
  title: "All Perfumes | Complete Eau De Parfum Collection | MIYA JI OUD",
  description:
    "Explore the complete artisanal perfume flacon collection by Miya Ji Oud. Rare agarwoods, taif roses, and exotic oriental accords in 100ml Eau De Parfum flacons.",
};

export default async function AllPerfumesPage() {
  const allProducts = await getProducts();
  const perfumes = allProducts.filter((p) => p.category === "perfumes");

  return (
    <CatalogView
      pageTitle="All Perfumes"
      badgeText="Eau De Parfum Collection"
      description="Handcrafted in 100ml luxury crystal flacons adorned with hand-hammered gold brass royal crown caps. Formulated with high-concentration perfume oils that linger on skin for up to 48 hours."
      products={perfumes}
      currentSlug="all-perfumes"
    />
  );
}
