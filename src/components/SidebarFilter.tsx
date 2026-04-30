"use client";

import { Check } from "lucide-react";

interface SidebarFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  stockFilter: "all" | "inStock" | "outOfStock";
  onStockFilterChange: (filter: "all" | "inStock" | "outOfStock") => void;
}

export default function SidebarFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceRangeChange,
  maxPrice,
  stockFilter,
  onStockFilterChange,
}: SidebarFilterProps) {
  return (
    <aside className="w-full lg:w-64 flex flex-col gap-8 shrink-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto scrollbar-hide">
      {/* Categories */}
      <section>
        <h3 className="text-base font-bold text-foreground mb-4">Categories</h3>
        <ul className="flex lg:flex-col gap-2 flex-wrap pb-2 lg:pb-0 scrollbar-hide">
          <li>
            <button
              onClick={() => onSelectCategory("all")}
              className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-foreground/5 text-foreground"
                  : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              All Products
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onSelectCategory(category)}
                className={`flex items-center w-full px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap capitalize transition-colors ${
                  selectedCategory === category
                    ? "bg-foreground/5 text-foreground"
                    : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Price Range */}
      <section className="hidden lg:block">
        <h3 className="text-base font-bold text-foreground mb-4">
          Price Range
        </h3>
        <div className="space-y-4">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([0, Number(e.target.value)])}
            className="w-full h-1.5 bg-foreground/10 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[10px] text-foreground/60 font-medium">
            <span>BDT 0</span>
            <span>BDT {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* Availability */}
      <section className="hidden lg:block">
        <h3 className="text-base font-bold text-foreground mb-4">
          Availability
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${stockFilter === "inStock" ? "bg-primary border-primary text-white" : "border-foreground/20 text-transparent group-hover:border-primary"}`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={stockFilter === "inStock"}
              onChange={() =>
                onStockFilterChange(
                  stockFilter === "inStock" ? "all" : "inStock",
                )
              }
            />
            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
              In Stock
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${stockFilter === "outOfStock" ? "bg-primary border-primary text-white" : "border-foreground/20 text-transparent group-hover:border-primary"}`}
            >
              <Check className="w-3.5 h-3.5" />
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={stockFilter === "outOfStock"}
              onChange={() =>
                onStockFilterChange(
                  stockFilter === "outOfStock" ? "all" : "outOfStock",
                )
              }
            />
            <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground">
              Out of Stock
            </span>
          </label>
        </div>
      </section>
    </aside>
  );
}
