"use client";

import { ShoppingBag, Trash2, ArrowRight, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, closeCart } from "@/store/cartSlice";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, isHydrated } = useAppSelector((state) => state.cart);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  if (!isHydrated) {
    return (
      <div className="h-full flex items-center justify-center animate-pulse text-foreground/40 bg-foreground/2">
        Loading cart...
      </div>
    );
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete));
      toast("Item removed from cart", {
        icon: <Trash2 className="w-4 h-4 text-red-600" />,
        style: {
          color: "var(--color-red-600)",
        },
      });
      setItemToDelete(null);
    }
  };

  const handleCheckout = () => {
    toast("Checkout not implemented yet!!", {
      icon: <AlertCircle className="w-4 h-4 text-primary" />,
      style: {
        color: "var(--color-primary)",
      },
    });
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-foreground/2">
      {/* Background flare */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-3 p-6 pb-2 relative z-10 shrink-0">
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
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mb-4 text-foreground/20">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-foreground font-medium mb-1">
            Your cart is empty
          </h3>
          <p className="text-sm text-foreground/50 max-w-50 mb-8">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <button
            onClick={() => dispatch(closeCart())}
            className="btn bg-primary text-white px-6 rounded-xl hover:opacity-90 active:scale-95 transition-all"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 space-y-4 py-4 pb-12 relative z-10">
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex gap-4 p-3 bg-background border border-foreground/5 rounded-xl hover:border-foreground/10 transition-colors relative"
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
                    BDT {item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => setItemToDelete(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-background border-t border-foreground/10 shrink-0 relative z-10">
            <div className="flex items-center justify-between font-medium mb-6">
              <span className="text-foreground/70">Subtotal</span>
              <span className="text-xl font-bold text-foreground">
                BDT {totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn bg-primary text-white hover:opacity-90 h-12 rounded-xl flex items-center justify-center gap-2 group transition-all"
            >
              <span className="font-semibold">Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center p-4 transition-all duration-300 ${
          itemToDelete
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setItemToDelete(null)}
        />
        <div
          className={`bg-background border border-foreground/10 p-6 rounded-2xl shadow-2xl max-w-50 w-full relative z-10 flex flex-col items-center text-center transition-all duration-300 ${
            itemToDelete ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold mb-2">Remove Item?</h3>
          <p className="text-sm text-foreground/60 mb-6">
            Are you sure you want to remove this item from your cart?
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setItemToDelete(null)}
              className="flex-1 btn bg-foreground/5 text-foreground hover:bg-foreground/10 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="flex-1 btn bg-red-500 text-white hover:bg-red-600 rounded-xl transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
