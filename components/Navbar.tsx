"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Crown,
  LogOut,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/products";
import { useAuth } from "@/context/AuthContext";

interface CartItem {
  productId: string;
  product: {
    id: string;
    name: string;
    subtitle?: string;
    price: string;
    priceNumeric: number;
    image: string;
    volume?: string;
  };
  quantity: number;
}

interface CartSummary {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const catalogTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCatalogEnter = () => {
    if (catalogTimeoutRef.current) {
      clearTimeout(catalogTimeoutRef.current);
      catalogTimeoutRef.current = null;
    }
    setCatalogOpen(true);
  };

  const handleCatalogLeave = () => {
    if (catalogTimeoutRef.current) {
      clearTimeout(catalogTimeoutRef.current);
    }
    catalogTimeoutRef.current = setTimeout(() => {
      setCatalogOpen(false);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (catalogTimeoutRef.current) clearTimeout(catalogTimeoutRef.current);
    };
  }, []);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [cartSummary, setCartSummary] = useState<CartSummary>({
    items: [],
    itemCount: 0,
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
    currency: "₹",
  });

  // Fetch live cart data from backend API
  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCartSummary(json.data);
        }
      }
    } catch (err) {
      console.error("Failed to load cart from API:", err);
    }
  };

  useEffect(() => {
    fetchCart();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleCartUpdated = () => {
      fetchCart();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("cartUpdated", handleCartUpdated);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("cartUpdated", handleCartUpdated);
    };
  }, []);

  // Update item quantity in live cart API
  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCartSummary(json.data);
          window.dispatchEvent(new Event("cartUpdated"));
        }
      }
    } catch (err) {
      console.error("Failed to update cart quantity:", err);
    }
  };

  // Remove item from live cart API
  const handleRemoveItem = async (productId: string) => {
    try {
      const res = await fetch(`/api/cart?productId=${encodeURIComponent(productId)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCartSummary(json.data);
          window.dispatchEvent(new Event("cartUpdated"));
        }
      }
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    }
  };

  return (
    <>
      <header
        style={{ position: "sticky", top: 0 }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#EAE5D9] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
            : "bg-[#FFFFFF] border-b border-[#EAE5D9]/60"
        }`}
      >
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
          {/* Left section: App Logo */}
          <div className="flex items-center space-x-4">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-[#1A1A1A] hover:text-[#DCA52D] transition-colors p-1 cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* App Logo: MIYA JI (top) and OUD (bottom) */}
            <Link href="/" className="group flex flex-col items-center justify-center leading-tight py-1 flex-shrink-0">
              <span className="font-serif text-[#DCA52D] group-hover:text-[#B8861B] text-lg sm:text-xl md:text-[22px] font-bold tracking-[0.2em] uppercase transition-colors whitespace-nowrap">
                MIYA JI
              </span>
              <span className="font-serif text-[#DCA52D] group-hover:text-[#B8861B] text-[10px] sm:text-[11px] font-semibold tracking-[0.45em] uppercase transition-colors -mt-0.5 pl-[0.45em]">
                OUD
              </span>
            </Link>
          </div>

          {/* Center section: Navigation Tabs (Centered in Navbar) */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-9 text-xs uppercase tracking-[0.2em] font-medium text-[#1A1A1A] absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="hover:text-[#DCA52D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DCA52D] hover:after:w-full after:transition-all"
            >
              Home
            </Link>

            {/* Catalog Dropdown */}
            <div
              className="relative py-2 -my-2 flex items-center"
              onMouseEnter={handleCatalogEnter}
              onMouseLeave={handleCatalogLeave}
            >
              <button
                onClick={() => setCatalogOpen((prev) => !prev)}
                className="flex items-center space-x-1.5 hover:text-[#DCA52D] transition-colors py-1 uppercase tracking-[0.2em] cursor-pointer"
              >
                <span>Catalog</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    catalogOpen ? "rotate-180 text-[#DCA52D]" : ""
                  }`}
                />
              </button>

              {catalogOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-52 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={handleCatalogEnter}
                  onMouseLeave={handleCatalogLeave}
                >
                  {/* Invisible bridge ensuring uninterrupted hover boundary */}
                  <div className="absolute top-0 left-0 right-0 h-3 bg-transparent" />

                  <div className="bg-[#FFFFFF] border border-[#EAE5D9] shadow-xl py-2 rounded-xl backdrop-blur-md overflow-hidden">
                    <Link
                      href="/best-sellers"
                      className="block px-5 py-2.5 text-xs tracking-wider text-[#333333] hover:text-[#DCA52D] hover:bg-[#FBF9F5] transition-colors font-medium"
                      onClick={() => setCatalogOpen(false)}
                    >
                      Best Sellers
                    </Link>
                    <Link
                      href="/all-perfumes"
                      className="block px-5 py-2.5 text-xs tracking-wider text-[#333333] hover:text-[#DCA52D] hover:bg-[#FBF9F5] transition-colors font-medium"
                      onClick={() => setCatalogOpen(false)}
                    >
                      All Perfumes
                    </Link>
                    <Link
                      href="/attars"
                      className="block px-5 py-2.5 text-xs tracking-wider text-[#333333] hover:text-[#DCA52D] hover:bg-[#FBF9F5] transition-colors font-medium"
                      onClick={() => setCatalogOpen(false)}
                    >
                      Attars
                    </Link>
                    <Link
                      href="/bakhoor-sets"
                      className="block px-5 py-2.5 text-xs tracking-wider text-[#333333] hover:text-[#DCA52D] hover:bg-[#FBF9F5] transition-colors font-medium"
                      onClick={() => setCatalogOpen(false)}
                    >
                      Bakhoor Sets
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/stores"
              className="hover:text-[#DCA52D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DCA52D] hover:after:w-full after:transition-all"
            >
              Stores
            </Link>
            <Link
              href="/about"
              className="hover:text-[#DCA52D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DCA52D] hover:after:w-full after:transition-all"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#DCA52D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#DCA52D] hover:after:w-full after:transition-all"
            >
              Contact
            </Link>
          </nav>

          {/* Right section: Search, Login & Sign Up buttons (or User Profile), and Shopping Bag */}
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-5 text-[#1A1A1A]">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:text-[#DCA52D] transition-colors p-1 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Account: User Profile Dropdown OR Login & Sign Up buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 py-1.5 px-3 rounded-full bg-[#FAF8F5] border border-[#DCA52D]/60 text-[#1A1A1A] hover:border-[#DCA52D] hover:shadow-sm transition-all cursor-pointer"
                  aria-label="User Account Menu"
                >
                  <Crown className="w-3.5 h-3.5 text-[#DCA52D]" />
                  <span className="text-xs font-semibold tracking-wider uppercase truncate max-w-[95px]">
                    {user.name.split(" ")[0]}
                  </span>
                </button>

                {/* Royal Patron Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2.5 w-60 bg-[#FFFFFF] border border-[#EAE5D9] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-[#EAE5D9]/70 bg-[#FBF9F5]">
                      <p className="text-xs font-bold text-[#1A1A1A] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#777777] truncate">{user.email}</p>
                      <span className="inline-flex items-center space-x-1 mt-1.5 px-2 py-0.5 bg-[#DCA52D]/15 text-[#9A7016] text-[9px] font-semibold tracking-widest uppercase rounded">
                        <Crown className="w-2.5 h-2.5" />
                        <span>Royal Patron</span>
                      </span>
                    </div>

                    <div className="pt-1.5">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out of Chamber</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                {/* Mobile icon fallback */}
                <Link
                  href="/login"
                  className="sm:hidden hover:text-[#DCA52D] transition-colors p-1"
                  aria-label="Sign In"
                >
                  <User className="w-5 h-5 stroke-[1.75]" />
                </Link>

                {/* Desktop Login Button */}
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center text-xs uppercase tracking-[0.16em] font-semibold text-[#1A1A1A] hover:text-[#DCA52D] px-2.5 py-1.5 transition-colors cursor-pointer"
                >
                  Login
                </Link>

                {/* Desktop Sign Up Button */}
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex items-center text-xs uppercase tracking-[0.16em] font-bold text-[#0A0A0A] bg-gradient-to-r from-[#DCA52D] via-[#F3CE74] to-[#C49326] hover:brightness-105 hover:shadow-[0_2px_12px_rgba(220,165,45,0.35)] px-3.5 py-1.5 rounded-sm transition-all duration-200 cursor-pointer"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Live Cart Icon with Dynamic Count Badge from API */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="hover:text-[#DCA52D] transition-colors relative p-1 cursor-pointer group"
              aria-label={`Shopping Bag, ${cartSummary.itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75] transition-transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 bg-[#DCA52D] text-[#FFFFFF] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartSummary.itemCount}
              </span>
            </button>
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
                className="text-[#666666] hover:text-[#DCA52D] ml-2 text-xs uppercase tracking-wider cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-over Luxury Cart Drawer */}
      {cartDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setCartDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col justify-between border-l border-[#EAE5D9] animate-in slide-in-from-right duration-300">
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#EAE5D9] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-[#1A1A1A] text-lg font-bold tracking-wider uppercase">
                    Your Royal Bag
                  </h3>
                  <span className="text-[11px] text-[#DCA52D] tracking-widest uppercase font-semibold">
                    {cartSummary.itemCount} {cartSummary.itemCount === 1 ? "Item" : "Items"}
                  </span>
                </div>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="text-[#1A1A1A] hover:text-[#DCA52D] p-1 cursor-pointer transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content: Product List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartSummary.items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-[#EAE5D9] stroke-[1] mb-4" />
                    <h4 className="font-serif text-[#1A1A1A] text-base font-semibold tracking-wider uppercase mb-1">
                      Your Bag is Empty
                    </h4>
                    <p className="text-xs text-[#777777] max-w-xs mb-6">
                      Explore our royal collection of aged agarwood and artisanal perfumes.
                    </p>
                    <button
                      onClick={() => setCartDrawerOpen(false)}
                      className="bg-[#DCA52D] hover:bg-[#B8861B] text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-md cursor-pointer"
                    >
                      Discover Fragrances
                    </button>
                  </div>
                ) : (
                  cartSummary.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center space-x-4 p-3 bg-[#FDFCF9] rounded-xl border border-[#EAE5D9]"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black flex-shrink-0 border border-[#EAE5D9]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-semibold text-[#1A1A1A] truncate uppercase">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-[#DCA52D] font-bold mt-0.5">
                          {item.product.price}
                        </p>

                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.productId, item.quantity - 1)
                            }
                            className="w-5 h-5 rounded border border-[#EAE5D9] flex items-center justify-center text-[#1A1A1A] hover:bg-[#EAE5D9] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.productId, item.quantity + 1)
                            }
                            className="w-5 h-5 rounded border border-[#EAE5D9] flex items-center justify-center text-[#1A1A1A] hover:bg-[#EAE5D9] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="text-[#999999] hover:text-red-500 p-1 cursor-pointer transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer: Subtotal and Checkout Button */}
              {cartSummary.items.length > 0 && (
                <div className="p-6 border-t border-[#EAE5D9] bg-[#FAF8F5] space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#666666]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1A1A1A]">
                      {cartSummary.currency} {cartSummary.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#666666]">
                    <span>Complimentary Shipping</span>
                    <span className="text-[#DCA52D] font-medium">
                      {cartSummary.shipping === 0 ? "FREE" : `${cartSummary.currency} ${cartSummary.shipping}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#666666]">
                    <span>Estimated Tax (5%)</span>
                    <span className="text-[#1A1A1A]">
                      {cartSummary.currency} {cartSummary.tax.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-[#1A1A1A] pt-2 border-t border-[#EAE5D9]">
                    <span>Total</span>
                    <span className="text-[#DCA52D] text-base">
                      {cartSummary.currency} {cartSummary.total.toLocaleString()}
                    </span>
                  </div>

                  <button className="w-full mt-4 py-3 bg-[#DCA52D] hover:bg-[#B8861B] text-[#FFFFFF] rounded-xl text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer">
                    <span>Proceed to Royal Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
              {/* Drawer Header with Brand Logo Text */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE5D9]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-start leading-tight"
                >
                  <span className="font-serif text-[#DCA52D] text-lg sm:text-xl font-bold tracking-[0.2em] uppercase">
                    MIYA JI
                  </span>
                  <span className="font-serif text-[#DCA52D] text-[10px] sm:text-[11px] font-semibold tracking-[0.45em] uppercase -mt-0.5 pl-[0.45em]">
                    OUD
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#1A1A1A] hover:text-[#DCA52D] p-1 cursor-pointer"
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
                    className="flex items-center justify-between w-full hover:text-[#DCA52D] transition-colors py-1 text-left uppercase tracking-[0.2em] cursor-pointer"
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
                        href="/best-sellers"
                        className="hover:text-[#DCA52D] transition-colors py-0.5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Best Sellers
                      </Link>
                      <Link
                        href="/all-perfumes"
                        className="hover:text-[#DCA52D] transition-colors py-0.5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        All Perfumes
                      </Link>
                      <Link
                        href="/attars"
                        className="hover:text-[#DCA52D] transition-colors py-0.5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Attars
                      </Link>
                      <Link
                        href="/bakhoor-sets"
                        className="hover:text-[#DCA52D] transition-colors py-0.5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Bakhoor Sets
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/stores"
                  className="hover:text-[#DCA52D] transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Stores
                </Link>

                <Link
                  href="/about"
                  className="hover:text-[#DCA52D] transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>

                <Link
                  href="/contact"
                  className="hover:text-[#DCA52D] transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Drawer Footer: User Profile / Auth */}
            <div className="pt-8 border-t border-[#EAE5D9] mt-8">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs tracking-wider">
                    <Crown className="w-4 h-4 text-[#DCA52D]" />
                    <div>
                      <p className="font-bold text-[#1A1A1A]">{user.name}</p>
                      <p className="text-[10px] text-[#777777]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-xs text-red-600 hover:underline pt-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[11px] uppercase tracking-wider text-[#888888] font-medium">
                    Royal Patron Access
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 px-3 text-center text-xs uppercase tracking-[0.16em] font-semibold text-[#1A1A1A] border border-[#EAE5D9] hover:border-[#DCA52D] hover:text-[#DCA52D] transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2.5 px-3 text-center text-xs uppercase tracking-[0.16em] font-bold text-[#0A0A0A] bg-gradient-to-r from-[#DCA52D] via-[#F3CE74] to-[#C49326] transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
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
