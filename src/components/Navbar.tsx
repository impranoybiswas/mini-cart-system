"use client";

import { Search, User, ShoppingCart, X } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openCart } from "@/store/cartSlice";
import ThemeToggle from "./ThemeToggle";
import SiteTitle from "./SiteTitle";

function NavbarContent() {
  const dispatch = useAppDispatch();
  const { items, isHydrated } = useAppSelector((state) => state.cart);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [isSearchOpen, setIsSearchOpen] = useState(!!initialQuery);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentQ = searchParams.get("q") || "";
      if (searchQuery !== currentQ) {
        if (searchQuery) {
          router.replace(`/?q=${encodeURIComponent(searchQuery)}`, {
            scroll: false,
          });
        } else {
          router.replace(`/`, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, router, searchParams]);

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-foreground/5 flex flex-col">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <SiteTitle />
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className={`btn-circular ${isSearchOpen ? "bg-primary/10 text-primary" : ""}`}
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className={`h-5 w-5 ${isSearchOpen ? "text-primary" : "text-foreground"}`} />
          </button>
          <ThemeToggle />
          <button
            onClick={() => dispatch(openCart())}
            className="btn-circular relative"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {isHydrated && items.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
                {items.length}
              </span>
            )}
          </button>
          <button className="btn-circular" aria-label="User Account">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      <div
        className={`w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? "max-h-24 pb-4 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${searchQuery.length > 0 ? "text-primary" : "text-foreground/40"}`} />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-3 border border-foreground/10 rounded-xl leading-5 bg-foreground/5 text-foreground placeholder-foreground/40 focus:outline-none focus:ring-px focus:ring-primary/20 focus:border-primary/20 transition-colors sm:text-sm"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                router.replace(`/`, { scroll: false });
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground/40 hover:text-foreground cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense
      fallback={
        <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-foreground/5 py-4 min-h-[73px]"></nav>
      }
    >
      <NavbarContent />
    </Suspense>
  );
}
