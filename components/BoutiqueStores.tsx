"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Play } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function BoutiqueStores() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      <section id="stores" className="relative w-full overflow-hidden bg-[#FFFFFF] py-8 sm:py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10">
          <ScrollReveal direction="up" duration={800} className="w-full">
            <div className="group relative w-full h-[380px] sm:h-[480px] md:h-[580px] lg:h-[660px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.14)] border border-[#EAE5D9]">
              {/* Full-Width Store Interior Banner */}
              <Image
                src="/assets/Final-Store-Image-2-scaled.jpg"
                alt="Oud Arabia Luxury Boutique Retail Stores Interior"
                fill
                sizes="100vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                priority
              />

              {/* Subtle Ambient Overlay for Contrast */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Centered Circular Video Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="group/btn relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#FFFFFF]/90 border-2 border-[#DCA52D] hover:border-[#B8861B] hover:bg-[#FFFFFF] hover:scale-110 transition-all duration-300 shadow-[0_6px_30px_rgba(0,0,0,0.25)] backdrop-blur-md cursor-pointer"
                  aria-label="Play Store Video"
                >
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#DCA52D] fill-[#DCA52D] ml-1 transition-transform group-hover/btn:scale-110" />
                </button>
              </div>

              {/* Overlay Box with Heading and Find Locations Button (Positioned on the Left) */}
              <div className="absolute top-6 left-4 sm:top-10 sm:left-8 md:top-14 md:left-12 max-w-xs sm:max-w-sm bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCA52D] p-6 sm:p-8 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
                <h3 className="text-[#1A1A1A] text-xs sm:text-sm md:text-base font-semibold tracking-[0.2em] uppercase leading-relaxed mb-4">
                  OUR BOUTIQUE RETAIL STORES
                </h3>

                <Link
                  href="/stores"
                  className="inline-block bg-[#DCA52D] hover:bg-[#B8861B] text-[#FFFFFF] font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-[0_4px_18px_rgba(220,165,45,0.4)] hover:-translate-y-0.5"
                >
                  FIND LOCATIONS
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-[#DCA52D]/40 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-white hover:text-[#DCA52D] bg-black/60 p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full aspect-video">
              <video
                src="https://cdn.shopify.com/videos/c/o/v/c50d741367364b89a9bb19e4e8279a17.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
