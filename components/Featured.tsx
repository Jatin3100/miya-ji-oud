import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_GALLERY } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

export default function Featured() {
  return (
    <section id="featured" className="w-full bg-[#FBF9F5] py-16 md:py-24 border-y border-[#EAE5D9]/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Product Gallery Images with Staggered Scroll Entrance */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            {FEATURED_GALLERY.map((item, index) => (
              <ScrollReveal
                key={item.id}
                direction="up"
                delay={index * 150}
                duration={750}
                className="w-full"
              >
                <div className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-[#EAE5D9] shadow-[0_6px_25px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:border-[#DCA52D] hover:shadow-[0_20px_40px_rgba(220,165,45,0.25)] transition-all duration-500 bg-[#0A0A0A]">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                  />

                  {/* Subtle Luxury Sheen Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Right Column: Heading, Description, and Golden Button */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-6">
            <ScrollReveal direction="up" delay={200} duration={750}>
              <span className="text-[#DCA52D] text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase block mb-2">
                Exquisite Craftsmanship
              </span>
              <h2 className="text-[#1A1A1A] font-serif text-2xl sm:text-3xl font-normal tracking-[0.1em] uppercase mb-4">
                The Royal Gallery
              </h2>

              <p className="text-[#2C2620] text-xs sm:text-sm leading-relaxed max-w-md mb-8 font-normal tracking-wide">
                Immerse yourself in our meticulously curated image gallery,
                showcasing the regal artistry, bottle craftsmanship, and rich amber essences of Miya Ji Oud.
              </p>

              <Link
                href="#gallery"
                className="inline-block bg-[#DCA52D] hover:bg-[#B8861B] text-[#FFFFFF] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_15px_rgba(220,165,45,0.35)] hover:shadow-[0_6px_25px_rgba(184,134,27,0.45)] hover:-translate-y-0.5"
              >
                Visit Gallery
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
