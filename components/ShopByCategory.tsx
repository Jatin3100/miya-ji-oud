"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES as INITIAL_CATEGORIES } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

export default function ShopByCategory() {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setCategories(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch dynamic categories:", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section id="categories" className="w-full bg-[#FAF8F5] py-16 md:py-24 border-y border-[#EAE5D9]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Golden Section Heading */}
        <ScrollReveal direction="up" duration={600}>
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[#DCA52D] text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase block mb-1">
              Curated Collections • Live API
            </span>
            <h2 className="text-[#1A1A1A] font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.1em] uppercase">
              Shop by Category
            </h2>
            <div className="w-16 h-[2px] bg-[#DCA52D] mx-auto mt-3 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Two Centered Image Cards with Rounded Corners & Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <ScrollReveal
              key={category.id}
              direction="up"
              delay={index * 150}
              duration={750}
              className="w-full"
            >
              <Link
                href={category.href}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-[#EAE5D9] shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:border-[#DCA52D] hover:shadow-[0_20px_45px_rgba(220,165,45,0.25)] transition-all duration-500 bg-[#0A0A0A]"
              >
                {/* Category Background Image */}
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                />

                {/* Ambient Overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />

                {/* Subtle Luxury Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                {/* Ivory & Gold Category Label over the image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCA52D] px-7 sm:px-9 py-3 sm:py-4 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:border-[#B8861B] group-hover:shadow-[0_0_30px_rgba(220,165,45,0.4)] group-hover:scale-105 text-center">
                    <span className="text-[#1A1A1A] group-hover:text-[#DCA52D] font-serif text-sm sm:text-base font-bold tracking-[0.25em] uppercase block transition-colors">
                      {category.title}
                    </span>
                    <span className="text-[#777777] text-[10px] tracking-[0.15em] uppercase font-medium mt-1 block">
                      Explore Collection →
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
