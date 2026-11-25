import React from "react";
import { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { getProducts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Bakhoor & Incense Sets | Pure Agarwood Chips & Burners | MIYA JI OUD",
  description:
    "Explore traditional royal bakhoor tablets, pure Kalakassi agarwood chips, and handcrafted gold brass burners for luxury home perfuming.",
};

export default async function BakhoorSetsPage() {
  const allProducts = await getProducts();
  const bakhoor = allProducts.filter((p) => p.category === "bakhoor");

  return (
    <CatalogView
      pageTitle="Bakhoor & Incense Sets"
      badgeText="Artisanal Burners & Incense"
      description="Precious agarwood woodchips soaked in fragrant botanical oils and pure musk. Designed for slow warming on charcoal or electric burners to scent your sanctuary with rich, hypnotic clouds of royal incense."
      products={bakhoor}
      currentSlug="bakhoor-sets"
    />
  );
}
