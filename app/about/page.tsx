import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import {
  Crown,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
  ArrowRight,
  Flame,
  Droplets,
  Gem,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | The Royal Heritage of Miya Ji Oud Dubai",
  description:
    "Discover the royal story, sacred agarwood distillation, and artisanal heritage behind Miya Ji Oud Dubai. 100% pure aged oriental fragrances.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#FFFFFF] text-[#1A1A1A] selection:bg-[#DCA52D] selection:text-white">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main>
        {/* Page Banner / Hero */}
        <section className="relative bg-[#FAF8F5] border-b border-[#EAE5D9] py-14 sm:py-20 md:py-24 overflow-hidden">
          {/* Subtle Background Radial Gold Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#DCA52D]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] text-[#888888] mb-4">
              <Link href="/" className="hover:text-[#DCA52D] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#DCA52D] font-medium">About Us</span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1 bg-[#FFFFFF] border border-[#DCA52D]/40 rounded-full text-[10px] uppercase tracking-[0.24em] text-[#9A7016] mb-4 shadow-xs">
              <Crown className="w-3.5 h-3.5 text-[#DCA52D]" />
              <span>Royal Arabian Haute Perfumery</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] tracking-wide font-normal max-w-4xl mx-auto leading-tight">
              The Heritage of Miya Ji Oud
            </h1>
            <div className="w-16 h-[2px] bg-[#DCA52D] mx-auto my-5" />
            <p className="text-sm sm:text-base text-[#666666] font-light max-w-2xl mx-auto leading-relaxed">
              We create memories that evoke our cores through the ancient language of scent. Unveiling the world&apos;s most precious aged agarwoods and royal botanical distillates.
            </p>
          </div>
        </section>

        {/* Section 1: The Master Philosophy & Origin */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FFFFFF]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left Column: Visual Flacon Masterpiece */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-[440px] lg:max-w-none">
                  {/* Gold Border Offset Frame */}
                  <div className="absolute -inset-3 sm:-inset-4 border border-[#DCA52D]/40 -z-10 translate-x-2.5 translate-y-2.5 pointer-events-none" />

                  <div className="relative h-[440px] sm:h-[500px] md:h-[540px] w-full bg-[#070708] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                    <Image
                      src="/assets/380106563_733516658642350_5647525499345431176_n.png"
                      alt="Voice of the Soul Flacon on Obsidian Coal"
                      fill
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Luxury Quote */}
                    <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EAE5D9] shadow-lg">
                      <p className="font-serif italic text-xs sm:text-[13px] text-[#1A1A1A] leading-relaxed">
                        &ldquo;We believe that a perfumer is a poet or a storyteller who uses intangible ingredients to create emotions. We paint pictures without using paint.&rdquo;
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-[#DCA52D] font-bold mt-2">
                        — The Vision of Miya Ji Oud
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative Story */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                    Chapter I • The Origin
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-normal mt-1.5 leading-snug">
                    An Imperial Passion For Sacred Scent
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed font-light">
                  Born in Dubai, the global crossroads of oriental luxury, <strong>MIYA JI OUD</strong> was conceived with a profound calling: to rescue authentic traditional attar and agarwood craftsmanship from the compromises of mass-production.
                </p>

                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed font-light">
                  In Middle Eastern royal heritage, Oud is far more than a fragrance. It is a sacred ritual, a hospitality blessing, and an indelible aura of nobility. From palace welcoming ceremonies to the quiet sanctuary of the royal chamber, the scent of burning wild agarwood chips and pure distilled oils defines the soul of Arabia.
                </p>

                <p className="text-xs sm:text-sm text-[#4A4A4A] leading-relaxed font-light">
                  We bridge this time-honored heritage with European haute perfumery standards. Every accord is hand-blended by master noses using 100% natural essences, rare botanicals, and vintage aged oud oils that cannot be synthesized by machines.
                </p>

                {/* 3 Quick Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#EAE5D9]">
                    <Crown className="w-4 h-4 text-[#DCA52D] mb-1.5" />
                    <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Dubai Origin</p>
                    <p className="text-[11px] text-[#777777] font-light mt-0.5">Royal heritage formulation</p>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#EAE5D9]">
                    <Flame className="w-4 h-4 text-[#DCA52D] mb-1.5" />
                    <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">Aged Oudh</p>
                    <p className="text-[11px] text-[#777777] font-light mt-0.5">Matured in dark cellars</p>
                  </div>
                  <div className="p-3.5 bg-[#FAF8F5] border border-[#EAE5D9]">
                    <Gem className="w-4 h-4 text-[#DCA52D] mb-1.5" />
                    <p className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">24kt Brass</p>
                    <p className="text-[11px] text-[#777777] font-light mt-0.5">Hand-hammered caps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: The Artisanal Sourcing & Distillation Process */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FAF8F5] border-y border-[#EAE5D9]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                Chapter II • The Craft
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-normal mt-1.5">
                The Sacred Distillation Process
              </h2>
              <div className="w-12 h-[2px] bg-[#DCA52D] mx-auto my-4" />
              <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed">
                Step behind the scenes into our artisanal alembics where raw nature is elevated into olfactory art.
              </p>
            </div>

            {/* 4 Process Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="bg-[#FFFFFF] border border-[#EAE5D9] p-6 shadow-xs hover:border-[#DCA52D] transition-colors">
                <span className="font-serif text-3xl font-bold text-[#DCA52D]/40">01</span>
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mt-2 mb-2">
                  Ethical Forest Harvesting
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  We hand-select naturally infected Aquilaria trees from wild forests in Assam, Cambodia, and Kalimantan that have produced dark resin over decades.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#FFFFFF] border border-[#EAE5D9] p-6 shadow-xs hover:border-[#DCA52D] transition-colors">
                <span className="font-serif text-3xl font-bold text-[#DCA52D]/40">02</span>
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mt-2 mb-2">
                  Copper Alembic Distillation
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  Using traditional wood-fired hydro-distillation in pure copper cauldrons, capturing the full spectrum of top, heart, and resinous base notes without scorching.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#FFFFFF] border border-[#EAE5D9] p-6 shadow-xs hover:border-[#DCA52D] transition-colors">
                <span className="font-serif text-3xl font-bold text-[#DCA52D]/40">03</span>
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mt-2 mb-2">
                  Cellar Aging (Up to 12 Yrs)
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  Raw extracts rest in darkened, temperature-controlled subterranean rooms where volatile sharpness mellows into hypnotic, creamy, and leathery undertones.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[#FFFFFF] border border-[#EAE5D9] p-6 shadow-xs hover:border-[#DCA52D] transition-colors">
                <span className="font-serif text-3xl font-bold text-[#DCA52D]/40">04</span>
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1A1A1A] mt-2 mb-2">
                  Royal Flacon Bottling
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed font-light">
                  Hand-filled into French crystal flacons and crowned with 24kt gold brass royal crowns. Inspected individually by our master quality controller.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Historical Timeline */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FFFFFF]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#DCA52D] font-bold">
                Chapter III • Milestones
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-normal mt-1.5">
                The Journey of Distinction
              </h2>
              <div className="w-12 h-[2px] bg-[#DCA52D] mx-auto my-4" />
            </div>

            {/* Timeline */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:h-full before:w-[1px] before:bg-[#EAE5D9]">
              {/* Event 1 */}
              <div className="relative flex items-center justify-between sm:justify-normal sm:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF8F5] border-2 border-[#DCA52D] text-[#DCA52D] shadow-sm z-10 sm:mx-auto">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="w-[calc(100%-3rem)] sm:w-[calc(50%-2.5rem)] bg-[#FAF8F5] p-5 border border-[#EAE5D9] shadow-xs">
                  <span className="text-xs font-bold text-[#DCA52D] uppercase tracking-wider">2012 • The First Distillate</span>
                  <h4 className="font-serif text-sm font-bold text-[#1A1A1A] mt-1 mb-1.5">
                    Assam & Taif Rose Synthesis
                  </h4>
                  <p className="text-xs text-[#666666] font-light leading-relaxed">
                    Our founder successfully extracted the first single-origin batch of pure distilled Hindi Oud, marrying it with mountain Taif roses for personal royal patron gifts.
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-center justify-between sm:justify-normal sm:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF8F5] border-2 border-[#DCA52D] text-[#DCA52D] shadow-sm z-10 sm:mx-auto">
                  <Crown className="w-3.5 h-3.5" />
                </div>
                <div className="w-[calc(100%-3rem)] sm:w-[calc(50%-2.5rem)] bg-[#FAF8F5] p-5 border border-[#EAE5D9] shadow-xs">
                  <span className="text-xs font-bold text-[#DCA52D] uppercase tracking-wider">2017 • Dubai Flagship</span>
                  <h4 className="font-serif text-sm font-bold text-[#1A1A1A] mt-1 mb-1.5">
                    Launch of Miya Ji Oud Maison
                  </h4>
                  <p className="text-xs text-[#666666] font-light leading-relaxed">
                    Formal establishment of our private salon in Dubai, introducing the signature 24kt gold brass crown flacon that has become our globally recognizable emblem.
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative flex items-center justify-between sm:justify-normal sm:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF8F5] border-2 border-[#DCA52D] text-[#DCA52D] shadow-sm z-10 sm:mx-auto">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div className="w-[calc(100%-3rem)] sm:w-[calc(50%-2.5rem)] bg-[#FAF8F5] p-5 border border-[#EAE5D9] shadow-xs">
                  <span className="text-xs font-bold text-[#DCA52D] uppercase tracking-wider">2021 • Mohali Expansion</span>
                  <h4 className="font-serif text-sm font-bold text-[#1A1A1A] mt-1 mb-1.5">
                    Bespoke Bridal & Royal Gifting Salon
                  </h4>
                  <p className="text-xs text-[#666666] font-light leading-relaxed">
                    Opening of our flagship boutique at 2266 Phase 7 Mohali, serving premier Indian patrons, celebrity weddings, and private collectors.
                  </p>
                </div>
              </div>

              {/* Event 4 */}
              <div className="relative flex items-center justify-between sm:justify-normal sm:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF8F5] border-2 border-[#DCA52D] text-[#DCA52D] shadow-sm z-10 sm:mx-auto">
                  <Gem className="w-3.5 h-3.5" />
                </div>
                <div className="w-[calc(100%-3rem)] sm:w-[calc(50%-2.5rem)] bg-[#FAF8F5] p-5 border border-[#EAE5D9] shadow-xs">
                  <span className="text-xs font-bold text-[#DCA52D] uppercase tracking-wider">2024 • The Imperial Reserve</span>
                  <h4 className="font-serif text-sm font-bold text-[#1A1A1A] mt-1 mb-1.5">
                    Single-Origin Pure Aged Kalakassi
                  </h4>
                  <p className="text-xs text-[#666666] font-light leading-relaxed">
                    Release of our highly sought-after 12-year aged Pure Oud extract, recognized across GCC as an ultra-luxurious milestone in modern oriental perfumery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Call to Action / Explore */}
        <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#EAE5D9] text-center">
          <div className="max-w-3xl mx-auto px-4">
            <Crown className="w-8 h-8 text-[#DCA52D] mx-auto mb-4" />
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-normal mb-3">
              Experience The Royal Accords
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed mb-8 max-w-xl mx-auto">
              Every creation is available for private acquisition with complimentary express insured delivery across the UAE, GCC, and India.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#top-sellers"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#DCA52D] hover:bg-[#B8861B] text-white font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-sm"
              >
                Browse Master Perfumes
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FFFFFF] border border-[#EAE5D9] hover:border-[#DCA52D] text-[#1A1A1A] hover:text-[#DCA52D] font-bold text-xs uppercase tracking-[0.2em] transition-all"
              >
                Contact Fragrance Concierge
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Floating Buttons */}
      <Footer />
      <FloatingButtons />
    </div>
  );
}
