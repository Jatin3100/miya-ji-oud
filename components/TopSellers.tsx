"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Check } from "lucide-react";
import { TOP_SELLERS as INITIAL_PRODUCTS, Product } from "@/data/products";
import ScrollReveal from "@/components/ScrollReveal";

export default function TopSellers() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Fetch dynamic products from the backend API
  useEffect(() => {
    async function loadDynamicProducts() {
      try {
        setLoading(true);
        const res = await fetch("/api/products?type=top-sellers");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setProducts(json.data);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic top sellers from API:", err);
      } finally {
        setLoading(false);
      }
    }
    loadDynamicProducts();
  }, []);

  // Responsive cards per view (3 on desktop, 2 on tablet, 1 on mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - cardsPerView);

  // Ensure currentIndex stays within bounds when resizing
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsPerView, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Add to Bag dynamic API action
  const handleAddToCart = async (product: Product) => {
    try {
      setAddingId(product.id);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (res.ok) {
        // Dispatch global event so the Navbar cart counter updates dynamically
        window.dispatchEvent(new Event("cartUpdated"));
        setAddedIds((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
          setAddedIds((prev) => ({ ...prev, [product.id]: false }));
        }, 2200);
      }
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    } finally {
      setAddingId(null);
    }
  };

  // Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section id="top-sellers" className="w-full bg-[#FFFFFF] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header with Title and Slider Navigation Buttons */}
        <ScrollReveal direction="up" duration={600}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 pb-4 border-b border-[#EAE5D9]">
            <div className="text-center sm:text-left">
              <span className="text-[#DCA52D] text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase block mb-1">
                Royal Fragrance Collection • Live API
              </span>
              <h2 className="text-[#1A1A1A] font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-[0.1em] uppercase">
                Top Sellers
              </h2>
              <div className="w-16 h-[2px] bg-[#DCA52D] mt-3 mx-auto sm:mx-0 rounded-full" />
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center justify-center sm:justify-end space-x-3 mt-6 sm:mt-0">
              <button
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="w-11 h-11 rounded-full border border-[#DCA52D] bg-[#FFFFFF] hover:bg-[#DCA52D] text-[#DCA52D] hover:text-[#FFFFFF] shadow-sm hover:shadow-md transition-all flex items-center justify-center cursor-pointer group"
              >
                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Slide"
                className="w-11 h-11 rounded-full border border-[#DCA52D] bg-[#FFFFFF] hover:bg-[#DCA52D] text-[#DCA52D] hover:text-[#FFFFFF] shadow-sm hover:shadow-md transition-all flex items-center justify-center cursor-pointer group"
              >
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* 3-Card Slider Track (Dynamic from API) */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {products.map((product) => {
              const isAdded = !!addedIds[product.id];
              const isAdding = addingId === product.id;

              return (
                <div
                  key={product.id}
                  style={{ width: `${100 / cardsPerView}%` }}
                  className="flex-shrink-0 px-3 sm:px-4"
                >
                  <div className="group relative bg-[#FDFCF9] rounded-2xl border border-[#EAE5D9] p-4 sm:p-5 flex flex-col h-full shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(220,165,45,0.22)] hover:border-[#DCA52D] transition-all duration-500 hover:-translate-y-2">
                    {/* Badge: Royal Bestseller */}
                    <div className="absolute top-6 left-6 z-10 flex items-center space-x-1 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#DCA52D]/60 px-2.5 py-1 rounded-full shadow-sm">
                      <Star className="w-3 h-3 text-[#DCA52D] fill-[#DCA52D]" />
                      <span className="text-[10px] font-semibold tracking-wider text-[#1A1A1A] uppercase">
                        {product.category === "perfumes" ? "Bestseller" : "Royal Edition"}
                      </span>
                    </div>

                    {/* Volume Tag */}
                    <div className="absolute top-6 right-6 z-10 bg-[#1A1A1A]/80 backdrop-blur-md px-2.5 py-1 rounded-full">
                      <span className="text-[10px] font-medium tracking-wider text-[#DCA52D] uppercase">
                        {product.volume || "100ml"}
                      </span>
                    </div>

                    {/* Product Image Frame */}
                    <div className="relative w-full aspect-square overflow-hidden bg-[#0A0A0A] rounded-xl border border-[#EAE5D9] mt-6">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                      />

                      {/* Subtle Luxury Sheen Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
                    </div>

                    {/* Product Information */}
                    <div className="mt-5 flex flex-col flex-grow items-center text-center">
                      <span className="text-[#888888] text-[10px] tracking-[0.25em] uppercase font-medium mb-1">
                        {product.category === "attars" ? "Artisanal Attar" : "Eau De Parfum"}
                      </span>
                      <h3 className="text-[#1A1A1A] group-hover:text-[#DCA52D] font-serif text-sm sm:text-base font-semibold tracking-wider uppercase transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[#DCA52D] text-sm sm:text-base font-bold mt-2 tracking-wide">
                        {product.price}
                      </p>

                      {/* Quick Add / Discover Button with Dynamic API Call */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isAdding}
                        className={`mt-4 w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md cursor-pointer ${
                          isAdded
                            ? "bg-[#181512] text-[#DCA52D] border border-[#DCA52D]"
                            : "bg-[#FFFFFF] hover:bg-[#DCA52D] text-[#1A1A1A] hover:text-[#FFFFFF] border border-[#EAE5D9] hover:border-[#DCA52D]"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#DCA52D]" />
                            <span>Added to Bag</span>
                          </>
                        ) : isAdding ? (
                          <span>Adding...</span>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Bag</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Indicators */}
        <div className="flex items-center justify-center space-x-2.5 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                currentIndex === idx
                  ? "w-8 bg-[#DCA52D]"
                  : "w-2.5 bg-[#EAE5D9] hover:bg-[#DCA52D]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
