"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Crown, Sparkles, Award, Clock, ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about-us" className="w-full bg-[#FAF8F5] py-16 sm:py-20 md:py-28 border-t border-[#EAE5D9] scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FFFFFF] border border-[#DCA52D]/40 rounded-full text-[10px] uppercase tracking-[0.22em] text-[#9A7016] mb-3 shadow-xs">
            <Crown className="w-3.5 h-3.5 text-[#DCA52D]" />
            <span>Our Royal Heritage</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#1A1A1A] tracking-wide font-normal">
            The Story of Miya Ji Oud
          </h2>
          <div className="w-12 h-[2px] bg-[#DCA52D] mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed tracking-wide">
            Where centuries-old oriental traditions meet modern haute perfumery. Each flacon is an olfactory poem crafted from the world&apos;s rarest botanicals.
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Artwork Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              {/* Decorative Background Frame */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#DCA52D]/40 -z-10 translate-x-2 translate-y-2 pointer-events-none" />

              {/* Main Image */}
              <div className="relative h-[420px] sm:h-[480px] md:h-[520px] w-full bg-[#0A0A0C] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                <Image
                  src="/assets/380106563_733516658642350_5647525499345431176_n.png"
                  alt="Miya Ji Oud Royal Flacon Masterpiece"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Quote Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EAE5D9] shadow-lg">
                  <p className="font-serif italic text-xs sm:text-[13px] text-[#1A1A1A] leading-relaxed">
                    &ldquo;We believe that a perfumer is a poet who uses intangible ingredients to evoke deep emotional transcendence.&rdquo;
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#DCA52D] font-bold mt-2">
                    — Master Nose, Miya Ji Oud
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 3 Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                Bespoke Artisanal Alchemy
              </span>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] font-normal leading-snug">
                Distilling Sacred Agarwood Into Royal Liquid Elegance
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed font-light">
                Rooted in Dubai&apos;s rich royal heritage, <strong>MIYA JI OUD</strong> was born out of a relentless passion for authentic, unadulterated perfumery. We venture deep into the forests of Assam, Cambodia, and Kalimantan to hand-select resinous agarwood trees that have matured over decades.
              </p>
              <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed font-light">
                Unlike mass-market perfumes, our master distillers utilize age-old hydro-distillation methods in custom copper alembics. The resulting oils are aged in darkened cellars for up to 12 years, yielding a smoky, velvety, and hypnotic sillage that lingers gracefully for days.
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
                <Crown className="w-5 h-5 text-[#DCA52D] mb-2" />
                <h4 className="font-serif text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Royal Heritage
                </h4>
                <p className="text-[11px] text-[#666666] leading-relaxed font-light">
                  Inspired by royal ceremonial traditions of Arabia.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
                <Sparkles className="w-5 h-5 text-[#DCA52D] mb-2" />
                <h4 className="font-serif text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  100% Pure Extract
                </h4>
                <p className="text-[11px] text-[#666666] leading-relaxed font-light">
                  Single-origin resins, taif roses, and aged amber.
                </p>
              </div>

              <div className="p-4 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xs">
                <Award className="w-5 h-5 text-[#DCA52D] mb-2" />
                <h4 className="font-serif text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-1">
                  Artisanal Flacons
                </h4>
                <p className="text-[11px] text-[#666666] leading-relaxed font-light">
                  Crowned with hand-hammered 24kt gold brass caps.
                </p>
              </div>
            </div>

            {/* Stats Counter Bar */}
            <div className="pt-4 border-t border-[#EAE5D9] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#DCA52D]">12+ Yrs</p>
                <p className="text-[10px] uppercase tracking-wider text-[#777777] mt-0.5 font-medium">Cellar Aged</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#DCA52D]">50K+</p>
                <p className="text-[10px] uppercase tracking-wider text-[#777777] mt-0.5 font-medium">Royal Patrons</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#DCA52D]">100%</p>
                <p className="text-[10px] uppercase tracking-wider text-[#777777] mt-0.5 font-medium">Pure Distillate</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#DCA52D]">3 Boutique</p>
                <p className="text-[10px] uppercase tracking-wider text-[#777777] mt-0.5 font-medium">Global Flagships</p>
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-2">
              <Link
                href="/best-sellers"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A] hover:text-[#DCA52D] transition-colors group"
              >
                <span>Explore The Master Collection</span>
                <ArrowRight className="w-4 h-4 text-[#DCA52D] transition-transform group-hover:translate-x-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
