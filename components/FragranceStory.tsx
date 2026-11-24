import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function FragranceStory() {
  return (
    <section id="story" className="w-full bg-[#FFFFFF] text-[#1A1A1A] py-10 sm:py-12 md:py-14 border-y border-[#EAE5D9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal direction="up" duration={700}>
          <h2 className="text-[#1A1A1A] text-sm sm:text-base md:text-lg font-semibold tracking-[0.25em] uppercase mb-3">
            A Fragrance Story
          </h2>
          <div className="w-10 h-[2px] bg-[#DCA52D] mx-auto mb-4" />
          <div className="max-w-3xl mx-auto">
            <p className="text-[#555555] text-xs sm:text-[13px] md:text-sm font-normal leading-relaxed tracking-wide">
              Luxury perfumes with blended Nature and most iconic fragrances, inspired
              by the scent of natural flowers and natural resources. The Jewel of Dubai.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
