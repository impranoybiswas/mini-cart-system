"use client";

import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeCart } from "@/store/cartSlice";
import Cart from "./Cart";
import { useEffect } from "react";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { isCartOpen } = useAppSelector((state) => state.cart);

  // Close drawer on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(closeCart());
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [dispatch]);

  // Prevent scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => dispatch(closeCart())}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-dvh w-full sm:w-[400px] md:w-[450px] bg-background shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => dispatch(closeCart())}
          className="absolute top-4 right-4 z-100 w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-hidden h-full">
          <Cart />
        </div>
      </div>
    </>
  );
}
