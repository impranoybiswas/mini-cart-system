"use client";

import { Search, User, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openCart } from "@/store/cartSlice";
import Link from "next/link";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { items, isHydrated } = useAppSelector((state) => state.cart);

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-foreground/5 py-4">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-foreground flex items-center"
        >
          MiniCart<span className="text-primary">.</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors"
            aria-label="User Account"
          >
            <User className="w-5 h-5" />
          </button>
          <button
            onClick={() => dispatch(openCart())}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors relative"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {isHydrated && items.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-2 ring-background">
                {items.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
