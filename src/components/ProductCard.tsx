"use client";

import { ShoppingCart, Check, ShoppingCartIcon, X } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import ProductModal from "./ProductModal";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { items, isHydrated } = useAppSelector((state) => state.cart);

  const isInCart = isHydrated && items.some((item) => item.id === product.id);
  const isOutOfStock = product.quantity === 0;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(addToCart(product));
    toast.success("Added to cart", {
      icon: <ShoppingCartIcon className="w-4 h-4 text-green-600" />,
    });
  };

  return (
    <>
      <div
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-foreground/2 border border-foreground/10 hover:border-foreground/20 shadow-sm hover:shadow-md transition-all duration-300 ease-out cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="aspect-square w-full overflow-hidden bg-foreground/5 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`h-full w-full object-cover object-center transition-transform duration-500 will-change-transform ${isOutOfStock ? "grayscale opacity-70" : "group-hover:scale-105"}`}
          />
          {isOutOfStock && (
            <div className="absolute top-3 right-3 bg-red-500/90 text-white px-3 py-1.5 text-[8px] md:text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-sm shadow-sm z-10 border border-red-400/20">
              Out of Stock
            </div>
          )}
        </div>
        <div className="w-full h-30 bg-primary absolute bottom-0 left-0 z-1 text-sm text-white flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
          Click card to view details
        </div>
        <div className="flex flex-col flex-1 py-5 px-4 transition-all duration-300 ease-out z-2 bg-foreground/2 group-hover:bg-primary translate-y-0 group-hover:-translate-y-10 group-hover:rounded-t-2xl group-hover:text-white">
          <h3 className="text-sm md:text-base font-semibold tracking-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-[8px] md:text-[12px] opacity-80 line-clamp-1">
            {product.description}
          </p>
          <div className="mt-2 pt-5 flex flex-col gap-3">
            <p className="text-sm md:text-base font-medium ">
              BDT {product.price.toFixed(2)}
            </p>
            <button
              onClick={handleAddToCart}
              disabled={isInCart || isOutOfStock}
              className={`btn relative overflow-hidden transition-all duration-300 ${
                isInCart
                  ? "bg-foreground/10 text-foreground cursor-not-allowed"
                  : isOutOfStock
                    ? "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                    : "bg-primary group-hover:bg-secondary text-white hover:opacity-90 active:scale-95"
              }`}
            >
              <span className="flex items-center gap-2 relative z-10 font-medium">
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4" />
                    In Cart
                  </>
                ) : isOutOfStock ? (
                  <>
                    <X className="w-4 h-4" />
                    Out of Stock
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
        isInCart={isInCart}
        isOutOfStock={isOutOfStock}
      />
    </>
  );
}
