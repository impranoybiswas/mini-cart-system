"use client";

import { productsTracker } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
      {productsTracker.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
