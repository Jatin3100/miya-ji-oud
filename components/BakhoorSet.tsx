import React from "react";
import Image from "next/image";
import { BAKHOOR_PRODUCT } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

export default function BakhoorSet() {
  return (
    <section id="bakhoor" className="w-full bg-[#FFFFFF] py-14 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Centered Golden Section Heading */}
        <ScrollReveal direction="up" duration={600}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[#DCA52D] text-base md:text-lg lg:text-xl font-medium tracking-[0.25em] uppercase">
              Bakhoor Set
            </h2>
            <div className="w-12 h-[2px] bg-[#DCA52D] mx-auto mt-3 rounded-full" />
          </div>
        </ScrollReveal>

        {/* 3-Column Grid Maintaining the Left-Aligned Product Positioning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-12 lg:gap-x-16">
          <ScrollReveal direction="up" delay={100} duration={750} className="w-full">
            <div className="group flex flex-col items-center sm:items-start cursor-pointer transition-transform duration-500 hover:-translate-y-2">
              {/* Product Image Frame with Rounded Corners & Luxury Hover Effect */}
              <div className="relative w-full aspect-square overflow-hidden bg-[#0A0A0A] rounded-2xl border border-[#EAE5D9] shadow-[0_4px_20px_rgba(0,0,0,0.06)] group-hover:border-[#DCA52D] group-hover:shadow-[0_20px_40px_rgba(220,165,45,0.25)] transition-all duration-500">
                <Image
                  src={BAKHOOR_PRODUCT.image}
                  alt={BAKHOOR_PRODUCT.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                />

                {/* Subtle Luxury Sheen Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
              </div>

              {/* Product Info */}
              <div className="mt-4 text-center sm:text-left flex flex-col items-center sm:items-start w-full">
                <h3 className="text-[#1A1A1A] group-hover:text-[#DCA52D] text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors">
                  {BAKHOOR_PRODUCT.name}
                </h3>
                <p className="text-[#666666] text-xs sm:text-sm font-normal mt-1 tracking-wide">
                  {BAKHOOR_PRODUCT.price}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Empty grid slots to keep perfect alignment with Top Sellers */}
          <div className="hidden sm:block" />
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}
