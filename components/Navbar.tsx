"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/products";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#EAE5D9] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-[#FFFFFF] border-b border-[#EAE5D9]/60"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
          {/* Left section: Search & Left Navigation */}
          <div className="flex items-center space-x-6 lg:space-x-8 flex-1">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-[#1A1A1A] hover:text-[#DCA52D] transition-colors p-1"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#1A1A1A] hover:text-[#DCA52D] transition-colors p-1"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Desktop Left Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A]">
              <Link
                href="/"
                className="hover:text-[#DCA52D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DCA52D] hover:after:w-full after:transition-all"
              >
                Home
              </Link>

              {/* Catalog Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCatalogOpen(true)}
                onMouseLeave={() => setCatalogOpen(false)}
              >
                <button
                  onClick={() => setCatalogOpen(!catalogOpen)}
                  className="flex items-center space-x-1.5 hover:text-[#DCA52D] transition-colors py-1 uppercase tracking-[0.2em]"
                >
                  <span>Catalog</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      catalogOpen ? "rotate-180 text-[#DCA52D]" : ""
                    }`}
                  />
                </button>

                {catalogOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xl py-3 rounded-xl backdrop-blur-md">
                    <Link
                      href="#top-sellers"
                      className="block px-5 py-2.5 text-xs tracking-wider text-[#333333] hover:text-[#DCA52D] hover:bg-[#FBF9F5] transition-colors"
                      onClick={() => setCatalogOpen(false)}
                    >
                      Best Sellers
                    </Link>
                    <Link
                      href="#categories"
                      className="block px-5 py-2.5 text-xs tracking-wider text-[#333333] hover:text-[#DCA52D] hover:bg-[#FBF9F5] transition-colors"
                      onClick={() => setCatalogOpen(false)}
                    >
                      All Perfumes
                    </Link>
                    <Link
                      href="#categories"
                      className="block px-5 py-2.5 text-xs tracking-wider text-[#333333] hover:text-[#DCA52D] hover:bg-[#FBF9F5] transition-colors"
                      onClick={() => setCatalogOpen(false)}
                    >
                      Attars
                    </Link>
                    <Link
                      href="#bakhoor"
                      className="block px-5 py-2.5 text-xs tracking-wider text-[#333333] hover:text-[#DCA52D] hover:bg-[#FBF9F5] transition-colors"
                      onClick={() => setCatalogOpen(false)}
                    >
                      Bakhoor Sets
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Centered Brand Logo Text (Clean Standalone Luxury Brand Name, No Subtitle) */}
          <div className="flex-shrink-0 flex items-center justify-center px-2 sm:px-4">
            <Link href="/" className="group flex items-center justify-center py-1">
              <span className="font-serif text-[#DCA52D] group-hover:text-[#B8861B] text-xl sm:text-2xl md:text-[25px] font-bold tracking-[0.28em] uppercase transition-colors whitespace-nowrap">
                {SITE_CONFIG.name}
              </span>
            </Link>
          </div>

          {/* Right section: Right Navigation & Action Icons */}
          <div className="flex items-center justify-end space-x-6 lg:space-x-8 flex-1">
            {/* Desktop Right Nav Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A]">
              <Link
                href="#footer"
                className="hover:text-[#DCA52D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DCA52D] hover:after:w-full after:transition-all"
              >
                Contact
              </Link>
              <Link
                href="#stores"
                className="hover:text-[#DCA52D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DCA52D] hover:after:w-full after:transition-all"
              >
                Stores
              </Link>
              <Link
                href="#story"
                className="hover:text-[#DCA52D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DCA52D] hover:after:w-full after:transition-all"
              >
                About Us
              </Link>
            </nav>

            {/* Account & Cart Icons */}
            <div className="flex items-center space-x-5 text-[#1A1A1A]">
              <button
                className="hover:text-[#DCA52D] transition-colors p-1"
                aria-label="User Account"
              >
                <User className="w-5 h-5 stroke-[1.75]" />
              </button>

              <button
                className="hover:text-[#DCA52D] transition-colors relative p-1"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                <span className="absolute -top-1 -right-1 bg-[#DCA52D] text-[#FFFFFF] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {searchOpen && (
          <div className="bg-[#FFFFFF] border-t border-b border-[#EAE5D9] px-4 py-4 animate-in fade-in slide-in-from-top-2 duration-200 shadow-md">
            <div className="max-w-2xl mx-auto flex items-center bg-[#FBF9F5] border border-[#DCA52D] rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-[#DCA52D] mr-3" />
              <input
                type="text"
                placeholder="Search perfumes, attars, bakhoor..."
                className="w-full bg-transparent text-sm text-[#1A1A1A] focus:outline-none placeholder-[#888888] font-light"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#666666] hover:text-[#DCA52D] ml-2 text-xs uppercase tracking-wider"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu */}
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-[#FFFFFF] border-r border-[#EAE5D9] p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300 shadow-2xl">
            <div>
              {/* Drawer Header with Brand Logo Text (No Subtitle) */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE5D9]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center"
                >
                  <span className="font-serif text-[#DCA52D] text-xl font-bold tracking-[0.26em] uppercase">
                    {SITE_CONFIG.name}
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#1A1A1A] hover:text-[#DCA52D] p-1"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-8 flex flex-col space-y-5 text-sm uppercase tracking-[0.2em] font-medium text-[#1A1A1A]">
                <Link
                  href="/"
                  className="hover:text-[#DCA52D] transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>

                {/* Mobile Catalog Expandable */}
                <div>
                  <button
                    onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
                    className="flex items-center justify-between w-full hover:text-[#DCA52D] transition-colors py-1 text-left uppercase tracking-[0.2em]"
                  >
                    <span>Catalog</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileCatalogOpen ? "rotate-180 text-[#DCA52D]" : ""
                      }`}
                    />
                  </button>

                  {mobileCatalogOpen && (
                    <div className="mt-3 ml-4 flex flex-col space-y-3 border-l border-[#DCA52D]/40 pl-4 text-xs tracking-wider text-[#666666]">
                      <Link
                        href="#top-sellers"
                        className="hover:text-[#DCA52D] transition-colors py-0.5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Best Sellers
                      </Link>
                      <Link
                        href="#categories"
                        className="hover:text-[#DCA52D] transition-colors py-0.5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        All Perfumes
                      </Link>
                      <Link
                        href="#categories"
                        className="hover:text-[#DCA52D] transition-colors py-0.5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Attars
                      </Link>
                      <Link
                        href="#bakhoor"
                        className="hover:text-[#DCA52D] transition-colors py-0.5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Bakhoor Sets
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="#stores"
                  className="hover:text-[#DCA52D] transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Stores
                </Link>

                <Link
                  href="#story"
                  className="hover:text-[#DCA52D] transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>

                <Link
                  href="#footer"
                  className="hover:text-[#DCA52D] transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-8 border-t border-[#EAE5D9] mt-8">
              <div className="flex items-center space-x-4 text-[#666666] text-xs tracking-wider">
                <User className="w-4 h-4 text-[#DCA52D]" />
                <Link
                  href="#footer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#DCA52D]"
                >
                  My Account / Sign In
                </Link>
              </div>
              <p className="mt-4 text-[11px] text-[#888888] tracking-wider">
                Luxury Arabian Perfumes & Fragrances
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
