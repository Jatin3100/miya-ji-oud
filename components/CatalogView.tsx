"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { Product } from "@/lib/db";
import {
  Crown,
  Sparkles,
  ShoppingBag,
  Star,
  Check,
  ArrowUpDown,
  Filter,
  ShieldCheck,
  Package,
  Award,
} from "lucide-react";

interface CatalogViewProps {
  pageTitle: string;
  badgeText: string;
  description: string;
  products: Product[];
  currentSlug: string;
}

export default function CatalogView({
  pageTitle,
  badgeText,
  description,
  products,
  currentSlug,
}: CatalogViewProps) {
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [selectedNote, setSelectedNote] = useState<string>("all");
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  // Extract all unique scent accords from notes
  const availableAccords = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.notes) {
        [...p.notes.top, ...p.notes.heart, ...p.notes.base].forEach((n) => {
          if (n.toLowerCase().includes("rose")) set.add("Rose");
          if (n.toLowerCase().includes("oud") || n.toLowerCase().includes("agarwood")) set.add("Oud");
          if (n.toLowerCase().includes("amber")) set.add("Amber");
          if (n.toLowerCase().includes("saffron") || n.toLowerCase().includes("spice")) set.add("Spicy");
          if (n.toLowerCase().includes("musk")) set.add("Musk");
          if (n.toLowerCase().includes("smoke") || n.toLowerCase().includes("incense")) set.add("Smoky");
        });
      }
    });
    return Array.from(set);
  }, [products]);

  // Filter and sort products
  const displayProducts = useMemo(() => {
    let list = [...products];

    // Filter by note accord
    if (selectedNote !== "all") {
      const q = selectedNote.toLowerCase();
      list = list.filter((p) => {
        if (!p.notes) return false;
        const allNotes = [...p.notes.top, ...p.notes.heart, ...p.notes.base].join(" ").toLowerCase();
        return allNotes.includes(q) || p.description.toLowerCase().includes(q);
      });
    }

    // Sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedNote, sortBy]);

  // Handle live Add to Cart
  const handleAddToCart = async (productId: string) => {
    setAddingId(productId);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        setAddedId(productId);
        window.dispatchEvent(new Event("cartUpdated"));
        setTimeout(() => setAddedId(null), 1800);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#DCA52D] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main>
        {/* Page Hero Header */}
        <section className="relative bg-[#FAF8F5] border-b border-[#EAE5D9] py-12 sm:py-16 md:py-20 overflow-hidden">
          {/* Subtle Radial Ambient Gold Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#DCA52D]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#888888] mb-4">
              <Link href="/" className="hover:text-[#DCA52D] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#666666]">Catalog</span>
              <span>/</span>
              <span className="text-[#DCA52D] font-medium">{pageTitle}</span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#FFFFFF] border border-[#DCA52D]/40 rounded-full text-[10px] uppercase tracking-[0.24em] text-[#9A7016] mb-4 shadow-xs">
              <Crown className="w-3.5 h-3.5 text-[#DCA52D]" />
              <span>{badgeText}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] tracking-wide font-normal max-w-4xl mx-auto leading-tight">
              {pageTitle}
            </h1>
            <div className="w-16 h-[2px] bg-[#DCA52D] mx-auto my-4" />
            <p className="text-xs sm:text-sm text-[#666666] font-light max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* Quick Catalog Sibling Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
              {[
                { title: "Best Sellers", href: "/best-sellers", slug: "best-sellers" },
                { title: "All Perfumes", href: "/all-perfumes", slug: "all-perfumes" },
                { title: "Attars", href: "/attars", slug: "attars" },
                { title: "Bakhoor Sets", href: "/bakhoor-sets", slug: "bakhoor-sets" },
              ].map((tab) => (
                <Link
                  key={tab.slug}
                  href={tab.href}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                    currentSlug === tab.slug
                      ? "bg-[#DCA52D] text-white shadow-xs font-bold"
                      : "bg-[#FFFFFF] border border-[#EAE5D9] text-[#666666] hover:text-[#1A1A1A] hover:border-[#DCA52D]"
                  }`}
                >
                  {tab.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Filter and Control Bar */}
        <section className="bg-[#FFFFFF] border-b border-[#EAE5D9] sticky top-20 sm:top-24 z-20 shadow-xs">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left: Item Counter & Scent Accords Filter */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#666666]">
              <span className="font-medium text-[#1A1A1A] mr-2">
                Showing {displayProducts.length} Creations
              </span>

              {availableAccords.length > 0 && (
                <div className="hidden md:flex items-center space-x-1.5 border-l border-[#EAE5D9] pl-3">
                  <Filter className="w-3.5 h-3.5 text-[#DCA52D]" />
                  <span className="text-[11px] uppercase tracking-wider text-[#888888]">Accord:</span>
                  <button
                    onClick={() => setSelectedNote("all")}
                    className={`px-2 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                      selectedNote === "all"
                        ? "bg-[#DCA52D] text-white font-semibold"
                        : "bg-[#FAF8F5] text-[#666666] hover:text-[#1A1A1A]"
                    }`}
                  >
                    All
                  </button>
                  {availableAccords.map((accord) => (
                    <button
                      key={accord}
                      onClick={() => setSelectedNote(accord)}
                      className={`px-2 py-0.5 text-[11px] rounded transition-colors cursor-pointer ${
                        selectedNote === accord
                          ? "bg-[#DCA52D] text-white font-semibold"
                          : "bg-[#FAF8F5] text-[#666666] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {accord}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Sort By Dropdown */}
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#DCA52D]" />
              <label htmlFor="sort-select" className="text-xs uppercase tracking-wider text-[#777777] font-medium">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF8F5] border border-[#EAE5D9] text-[#1A1A1A] text-xs py-1.5 px-3 rounded-sm outline-none focus:border-[#DCA52D] cursor-pointer"
              >
                <option value="featured">Royal Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Patron Rating (★)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Product Cards Grid */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            {displayProducts.length === 0 ? (
              <div className="text-center py-20 bg-[#FAF8F5] border border-[#EAE5D9] p-8">
                <Crown className="w-10 h-10 text-[#DCA52D] mx-auto mb-3 opacity-60" />
                <h3 className="font-serif text-xl font-normal text-[#1A1A1A] mb-1">
                  No matching flacons found
                </h3>
                <p className="text-xs text-[#777777] mb-6 font-light">
                  Try selecting a different fragrance accord or resetting filters.
                </p>
                <button
                  onClick={() => setSelectedNote("all")}
                  className="px-6 py-2.5 bg-[#DCA52D] text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {displayProducts.map((product) => {
                  const isAdding = addingId === product.id;
                  const isAdded = addedId === product.id;

                  return (
                    <div
                      key={product.id}
                      className="group bg-[#FFFFFF] border border-[#EAE5D9] hover:border-[#DCA52D]/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg"
                    >
                      {/* Top Visual Container */}
                      <div className="relative aspect-square w-full bg-[#FAF8F5] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Top Badge */}
                        {product.badge && (
                          <div className="absolute top-3 left-3 bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EAE5D9] px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-bold text-[#9A7016] shadow-xs">
                            {product.badge}
                          </div>
                        )}

                        {/* Volume Tag */}
                        {product.volume && (
                          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-xs">
                            {product.volume}
                          </div>
                        )}
                      </div>

                      {/* Content Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Rating Row */}
                          <div className="flex items-center space-x-1 mb-1.5 text-[#DCA52D]">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(product.rating)
                                      ? "fill-[#DCA52D] text-[#DCA52D]"
                                      : "text-[#EAE5D9] fill-[#EAE5D9]"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[11px] font-semibold text-[#1A1A1A] ml-1">
                              {product.rating.toFixed(1)}
                            </span>
                            <span className="text-[10px] text-[#888888]">
                              ({product.reviewsCount})
                            </span>
                          </div>

                          {/* Product Title */}
                          <h3 className="font-serif text-sm sm:text-base font-semibold text-[#1A1A1A] group-hover:text-[#DCA52D] transition-colors leading-snug uppercase">
                            {product.name}
                          </h3>
                          <p className="text-[11px] text-[#777777] uppercase tracking-wider mt-0.5 font-light">
                            {product.subtitle}
                          </p>

                          {/* Olfactory Notes Chips */}
                          {product.notes && (
                            <div className="mt-3 pt-3 border-t border-[#EAE5D9]/70 space-y-1">
                              <p className="text-[9px] uppercase tracking-widest text-[#9A7016] font-bold">
                                Key Accords:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {[...product.notes.top.slice(0, 1), ...product.notes.heart.slice(0, 1), ...product.notes.base.slice(0, 1)].map(
                                  (note, idx) => (
                                    <span
                                      key={idx}
                                      className="text-[10px] bg-[#FAF8F5] border border-[#EAE5D9] px-2 py-0.5 text-[#555555] rounded-xs font-light"
                                    >
                                      {note}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Price & Add to Bag */}
                        <div className="pt-3 border-t border-[#EAE5D9] flex items-center justify-between">
                          <div>
                            <span className="block text-[9px] uppercase tracking-wider text-[#888888]">
                              Patron Price
                            </span>
                            <span className="text-sm font-bold text-[#DCA52D] tracking-wide">
                              {product.price}
                            </span>
                          </div>

                          <button
                            onClick={() => handleAddToCart(product.id)}
                            disabled={isAdding}
                            className={`flex items-center space-x-1.5 px-3.5 py-2 text-xs uppercase tracking-[0.14em] font-bold transition-all duration-300 cursor-pointer ${
                              isAdded
                                ? "bg-emerald-600 text-white"
                                : "bg-[#DCA52D] hover:bg-[#B8861B] text-white shadow-xs hover:shadow"
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>In Bag</span>
                              </>
                            ) : isAdding ? (
                              <span>Adding...</span>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Section: Patron Reassurance Bar */}
        <section className="py-14 bg-[#FAF8F5] border-t border-[#EAE5D9]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
                <Crown className="w-5 h-5 text-[#DCA52D] mx-auto mb-2" />
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Royal Authenticity
                </h4>
                <p className="text-[11px] text-[#666666] font-light mt-1">
                  100% certified pure aged agarwood and botanicals.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
                <Package className="w-5 h-5 text-[#DCA52D] mx-auto mb-2" />
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  VIP Express Shipping
                </h4>
                <p className="text-[11px] text-[#666666] font-light mt-1">
                  Insured door-to-door transit for royal flacons.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
                <Sparkles className="w-5 h-5 text-[#DCA52D] mx-auto mb-2" />
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Discovery Samples
                </h4>
                <p className="text-[11px] text-[#666666] font-light mt-1">
                  Complimentary perfume vials included in every shipment.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#DCA52D] mx-auto mb-2" />
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  24kt Gold Brass Caps
                </h4>
                <p className="text-[11px] text-[#666666] font-light mt-1">
                  Signature heavy flacons hand-hammered for royalty.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Floating Action Buttons */}
      <Footer />
      <FloatingButtons />
    </div>
  );
}
