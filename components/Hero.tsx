"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#FFFFFF] pb-16 md:pb-24 overflow-hidden border-b border-[#EAE5D9]/60">
      {/* 100% Full-Width Edge-to-Edge Banner with NO Rounded Corners */}
      <div className="relative w-full h-[420px] sm:h-[540px] md:h-[660px] lg:h-[760px] xl:h-[840px] bg-[#000000] overflow-hidden flex items-center justify-center">
        {/* Normal Original Master Luxury Perfume Banner */}
        <div className="relative w-full h-full max-w-[1300px] flex items-center justify-center select-none">
          <Image
            src="/assets/379634755_6038874569546754_3507137899045099349_n.webp"
            alt="Oud Arabia Luxury Perfume Bottle"
            fill
            sizes="100vw"
            priority
            className="object-contain object-center select-none pointer-events-none"
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
            <p className="text-[#4A4A4A] text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed sm:leading-loose tracking-wide font-sans">
              We believe that a perfumer is a poet or a storyteller who use intangible
              ingredients to create emotions. The main idea behind Miya Ji Oud is to
              Abstract memories that evoke our cores. We paint pictures without using
              paint. We are storytellers who do not need words.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
