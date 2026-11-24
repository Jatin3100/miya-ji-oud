"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#FFFFFF] pb-16 md:pb-24 overflow-hidden border-b border-[#EAE5D9]/60">
      {/* 100% Full-Width Edge-to-Edge Banner with NO Rounded Corners */}
      <div className="relative w-full h-[450px] sm:h-[580px] md:h-[680px] lg:h-[780px] xl:h-[860px] bg-[#000000] overflow-hidden flex items-center justify-center">
        {/* 100% Full-Width Master Luxury Perfume Banner */}
        <div className="relative w-full h-full select-none">
          <Image
            src="/assets/379634755_6038874569546754_3507137899045099349_n.webp"
            alt="Miya Ji Oud Luxury Perfume Bottle"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center select-none pointer-events-none"
          />
        </div>

        {/* Ambient Top & Bottom Seamless Dark Edge Blends */}
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Brand Introduction Paragraph Below the Full-Width Banner with Scroll Entrance */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center mt-10 md:mt-14">
        <ScrollReveal direction="up" delay={150} duration={750}>
          <div className="max-w-3xl text-center px-4">
            <span className="text-[#DCA52D] text-xs uppercase tracking-[0.3em] font-semibold block mb-2">
              Royal Oud Parfumerie
            </span>
            <p className="text-[#222222] text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed sm:leading-loose tracking-wide font-sans">
              We believe that a perfumer is a poet or a storyteller who use intangible
              ingredients to create emotions. The main idea behind Miya Ji Oud is to
              Abstract memories that evoke our cores. We paint pictures without using
              paint. We are storytellers who do not need words.
            </p>
          </div>
        </ScrollReveal>

        {/* Royal Trust & Heritage Pillars */}
        <ScrollReveal direction="up" delay={250} duration={750} className="w-full mt-10 sm:mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 border-t border-[#EAE5D9]/80">
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#FDFCF9] border border-[#EAE5D9]">
              <span className="text-xl mb-2">👑</span>
              <h4 className="text-[#1A1A1A] font-serif text-xs font-semibold tracking-wider uppercase">
                Royal Heritage
              </h4>
              <p className="text-[#777777] text-[11px] mt-1 font-light tracking-wide">
                Century-old distillation methods
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#FDFCF9] border border-[#EAE5D9]">
              <span className="text-xl mb-2">🌿</span>
              <h4 className="text-[#1A1A1A] font-serif text-xs font-semibold tracking-wider uppercase">
                100% Pure Extracts
              </h4>
              <p className="text-[#777777] text-[11px] mt-1 font-light tracking-wide">
                Rare aged Indian & Cambodian agarwood
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#FDFCF9] border border-[#EAE5D9]">
              <span className="text-xl mb-2">✨</span>
              <h4 className="text-[#1A1A1A] font-serif text-xs font-semibold tracking-wider uppercase">
                Bespoke Packaging
              </h4>
              <p className="text-[#777777] text-[11px] mt-1 font-light tracking-wide">
                Crest-engraved flacons & gold trim
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
