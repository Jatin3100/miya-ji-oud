import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

export default function ShopByCategory() {
  return (
    <section id="categories" className="w-full bg-[#FBF9F5] py-14 md:py-24 border-y border-[#EAE5D9]/60">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Golden Section Heading */}
        <ScrollReveal direction="up" duration={600}>
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-[#DCA52D] text-base md:text-lg lg:text-xl font-medium tracking-[0.25em] uppercase">
              Shop by category
            </h2>
            <div className="w-12 h-[2px] bg-[#DCA52D] mx-auto mt-3 rounded-full" />
          </div>
        </ScrollReveal>

        {/* Two Centered Image Cards with Rounded Corners & Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {CATEGORIES.map((category, index) => (
            <ScrollReveal
              key={category.id}
              direction="up"
              delay={index * 150}
              duration={750}
              className="w-full"
            >
              <Link
                href={category.href}
                className="group relative block aspect-square w-full overflow-hidden rounded-2xl border border-[#EAE5D9] shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(220,165,45,0.25)] transition-all duration-500"
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
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />

                {/* Subtle Luxury Sheen Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                {/* Ivory & Gold Category Label over the image */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCA52D] px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:border-[#B8861B] group-hover:shadow-[0_0_25px_rgba(220,165,45,0.4)] group-hover:scale-105">
                    <span className="text-[#1A1A1A] group-hover:text-[#DCA52D] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase whitespace-nowrap transition-colors">
                      {category.title}
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
