"use client";

import { ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { items, isHydrated } = useAppSelector((state) => state.cart);

  const isInCart = isHydrated && items.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-foreground/2 border border-foreground/10 hover:border-foreground/20 shadow-sm hover:shadow-md transition-all duration-300 ease-out">
      <div className="aspect-square w-full overflow-hidden bg-foreground/5 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 will-change-transform"
        />
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-foreground/60 line-clamp-2 max-w-[250px]">
          {product.description}
        </p>
        <div className="mt-auto pt-5 flex items-center justify-between">
          <p className="text-lg font-medium text-foreground">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={isInCart || !isHydrated}
            className={`btn relative overflow-hidden transition-all duration-300 ${
              isInCart
                ? "bg-foreground/10 text-foreground cursor-default"
                : "bg-primary text-white hover:opacity-90 active:scale-95"
            }`}
          >
            <span className="flex items-center gap-2 relative z-10 font-medium">
              {isInCart ? (
                <>
                  <Check className="w-4 h-4" />
                  In Cart
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
  );
}
