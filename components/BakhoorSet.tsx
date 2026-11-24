import React from "react";
import Image from "next/image";
import { ShoppingBag, Sparkles } from "lucide-react";
import { BAKHOOR_PRODUCT } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

export default function BakhoorSet() {
  return (
    <section id="bakhoor" className="w-full bg-[#FFFFFF] py-16 md:py-24">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Centered Golden Section Heading */}
        <ScrollReveal direction="up" duration={600}>
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[#DCA52D] text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase block mb-1">
              Traditional Incense & Aromatics
            </span>
            <h2 className="text-[#1A1A1A] font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.1em] uppercase">
              Bakhoor Set
            </h2>
            <div className="w-16 h-[2px] bg-[#DCA52D] mx-auto mt-3 rounded-full" />
          </div>
        </ScrollReveal>

        {/* 3-Column Grid Maintaining the Left-Aligned Product Positioning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-12 lg:gap-x-16">
          <ScrollReveal direction="up" delay={100} duration={750} className="w-full">
            <div className="group relative bg-[#FDFCF9] rounded-2xl border border-[#EAE5D9] p-4 sm:p-5 flex flex-col h-full shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(220,165,45,0.22)] hover:border-[#DCA52D] transition-all duration-500 hover:-translate-y-2 cursor-pointer">
              {/* Badge: Royal Brass Edition */}
              <div className="absolute top-6 left-6 z-10 flex items-center space-x-1 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#DCA52D]/60 px-2.5 py-1 rounded-full shadow-sm">
                <Sparkles className="w-3 h-3 text-[#DCA52D]" />
                <span className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                  Gold Brass Edition
                </span>
              </div>

              {/* Weight Tag */}
              <div className="absolute top-6 right-6 z-10 bg-[#1A1A1A]/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                <span className="text-[10px] font-medium tracking-wider text-[#DCA52D] uppercase">
                  50 gms
                </span>
              </div>

              {/* Product Image Frame with Rounded Corners & Luxury Hover Effect */}
              <div className="relative w-full aspect-square overflow-hidden bg-[#0A0A0A] rounded-xl border border-[#EAE5D9] mt-6">
                <Image
                  src={BAKHOOR_PRODUCT.image}
                  alt={BAKHOOR_PRODUCT.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                />

                {/* Subtle Luxury Sheen Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
              </div>

              {/* Product Info */}
              <div className="mt-5 flex flex-col flex-grow items-center text-center">
                <span className="text-[#888888] text-[10px] tracking-[0.25em] uppercase font-medium mb-1">
                  Rare Incense Wood
                </span>
                <h3 className="text-[#1A1A1A] group-hover:text-[#DCA52D] font-serif text-sm sm:text-base font-semibold tracking-wider uppercase transition-colors">
                  {BAKHOOR_PRODUCT.name}
                </h3>
                <p className="text-[#DCA52D] text-sm sm:text-base font-bold mt-2 tracking-wide">
                  {BAKHOOR_PRODUCT.price}
                </p>

                {/* Quick Add Button */}
                <button className="mt-4 w-full py-2.5 px-4 bg-[#FFFFFF] hover:bg-[#DCA52D] text-[#1A1A1A] hover:text-[#FFFFFF] border border-[#EAE5D9] hover:border-[#DCA52D] rounded-xl text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md cursor-pointer">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Empty grid slots to keep alignment */}
          <div className="hidden sm:block" />
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}
