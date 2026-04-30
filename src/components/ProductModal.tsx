"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { X, ShoppingCart, Check } from "lucide-react";
import Image from "next/image";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  isInCart: boolean;
  isOutOfStock: boolean;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isInCart,
  isOutOfStock,
}: ProductModalProps) {
  const [showModal, setShowModal] = useState(false);

  // Trigger animations and scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Small delay to allow the DOM to render before triggering the CSS transition
      const timer = setTimeout(() => setShowModal(true), 10);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Handle cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          showModal ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          setShowModal(false);
          setTimeout(onClose, 300); // Wait for transition before actual close
        }}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-4xl bg-background border border-foreground/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 transition-all duration-300 transform ${
          showModal
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <button
          onClick={() => {
            setShowModal(false);
            setTimeout(onClose, 300);
          }}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-foreground/5 relative shrink-0 min-h-75">
          <Image
            src={product.image}
            alt={product.name}
            height={300}
            width={300}
            className={`w-full h-full object-cover ${isOutOfStock ? "grayscale opacity-70" : ""}`}
          />
          {isOutOfStock && (
            <div className="absolute top-6 left-6 bg-red-500/90 text-white px-4 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase rounded-full backdrop-blur-sm shadow-md border border-red-400/20">
              Out of Stock
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 flex flex-col">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
              {product.category}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground mb-4 leading-tight">
            {product.name}
          </h2>
          <p className="text-sm text-foreground/80 mb-6 flex items-center gap-4">
            <span>SKU: {product.id}</span>
            <span>Quantity: {product.quantity}</span>
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-foreground/90 mb-8 font-mono">
            BDT{" "}
            {product.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>

          <div className="flex-1">
            <h3 className="text-xs font-bold tracking-widest text-foreground/50 uppercase mb-3 border-b border-foreground/10 pb-2">
              Product Description
            </h3>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>
          </div>

          <div className="mt-8 pt-8 flex flex-col items-center gap-4">
            <button
              onClick={onAddToCart}
              disabled={isInCart || isOutOfStock}
              className={`w-full h-14 rounded-xl flex items-center justify-center gap-3 font-semibold text-base transition-all duration-300 ${
                isInCart
                  ? "bg-foreground/10 text-foreground cursor-not-allowed"
                  : isOutOfStock
                    ? "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                    : "bg-primary text-white hover:opacity-90 hover:scale-[0.98] active:scale-95 shadow-xl shadow-primary/20 cursor-pointer"
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-5 h-5" />
                  Already in Cart
                </>
              ) : isOutOfStock ? (
                <>
                  <X className="w-5 h-5" />
                  Out of Stock
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
