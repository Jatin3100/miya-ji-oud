import React from "react";
import { Metadata } from "next";
import CatalogView from "@/components/CatalogView";
import { getProducts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Pure Concentrated Attars | Non-Alcoholic Royal Perfume Oils | MIYA JI OUD",
  description:
    "Experience pure, traditional, non-alcoholic concentrated perfume oils distilled in sandalwood bases with rare Cambodian and Assam oudh.",
};

export default async function AttarsPage() {
  const allProducts = await getProducts();
  const attars = allProducts.filter((p) => p.category === "attars");

  return (
    <CatalogView
      pageTitle="Pure Concentrated Attars"
      badgeText="Traditional Non-Alcoholic Oils"
      description="Distilled using century-old Deg-Bhapka hydrothermal methods into pure Mysore sandalwood oil bases. 100% alcohol-free, hyper-concentrated, and intensely long-lasting on pulse points."
      products={attars}
      currentSlug="attars"
    />
  );
}
