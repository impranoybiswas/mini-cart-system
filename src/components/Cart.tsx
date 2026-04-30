"use client";

import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart } from "@/store/cartSlice";
import Image from "next/image";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, isHydrated } = useAppSelector((state) => state.cart);

  if (!isHydrated) {
    return (
      <div className="h-[300px] flex items-center justify-center animate-pulse text-foreground/40 rounded-2xl border border-foreground/10 bg-foreground/2">
        Loading cart...
      </div>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col h-full bg-foreground/2 border border-foreground/10 rounded-2xl p-6 shadow-sm relative overflow-hidden backdrop-blur-xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 relative">
        <div className="p-2.5 bg-foreground/5 rounded-xl text-primary">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight">Your Cart</h2>
          <p className="text-sm text-foreground/50">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4 text-foreground/20">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-foreground font-medium mb-1">
            Your cart is empty
          </h3>
          <p className="text-sm text-foreground/50 max-w-[200px]">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 min-h-[300px] max-h-[60vh] relative z-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex gap-4 p-3 bg-background border border-foreground/5 rounded-xl hover:border-foreground/10 transition-colors"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-foreground/5 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    width={64}
                    height={64}
                  />
                </div>
                <div className="flex flex-col flex-1 py-0.5 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {item.name}
                  </h4>
                  <p className="text-primary font-medium text-sm mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-6 mt-6 border-t border-foreground/10 relative z-10">
            <div className="flex items-center justify-between font-medium mb-6">
              <span className="text-foreground/70">Subtotal</span>
              <span className="text-xl font-bold text-foreground">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button className="w-full btn bg-primary text-white hover:opacity-90 h-12 rounded-xl flex items-center justify-center gap-2 group transition-all">
              <span className="font-semibold">Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
