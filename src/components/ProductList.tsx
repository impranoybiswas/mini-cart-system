"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { productsTracker } from "@/data/products";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import SidebarFilter from "./SidebarFilter";

const PRODUCTS_PER_PAGE = 12;

export default function ProductList() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [stockFilter, setStockFilter] = useState<
    "all" | "inStock" | "outOfStock"
  >("all");

  // collect all unique categories
  const categories = useMemo(() => {
    const caps = productsTracker.map((p) => p.category).filter(Boolean);
    return Array.from(new Set(caps));
  }, []);

  const maxPossiblePrice = useMemo(() => {
    const max = Math.max(...productsTracker.map((p) => p.price), 0);
    return max > 0 ? max : 1000;
  }, []);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    maxPossiblePrice,
  ]);

  // Filter and Sort purely on client side
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsTracker];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    if (stockFilter === "inStock") {
      result = result.filter((p) => p.quantity > 0);
    } else if (stockFilter === "outOfStock") {
      result = result.filter((p) => p.quantity === 0);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery),
      );
    }

    return result;
  }, [selectedCategory, priceRange, sortBy, stockFilter, searchQuery]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const getSectionTitle = () => {
    if (selectedCategory === "all") return "Top Products";
    return selectedCategory;
  };

  const getSectionDescription = () => {
    if (selectedCategory === "all")
      return "Discover our curated selection of highly aesthetic tools, gear, and accessories for the modern creator.";
    return `Discover our curated selection of high-end ${selectedCategory}.`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
      {/* Sidebar Filter */}
      <SidebarFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
        priceRange={priceRange}
        onPriceRangeChange={(range) => {
          setPriceRange(range);
          setCurrentPage(1);
        }}
        maxPrice={maxPossiblePrice}
        stockFilter={stockFilter}
        onStockFilterChange={(filter: "all" | "inStock" | "outOfStock") => {
          setStockFilter(filter);
          setCurrentPage(1);
        }}
      />

      {/* Main product area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Dynamic Header & Sort */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-foreground/5">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-2 capitalize">
              {getSectionTitle()}
            </h1>
            <p className="text-foreground/60 text-base md:text-lg">
              {getSectionDescription()}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-medium text-foreground/60">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-transparent border-none py-2 pl-2 pr-8 text-sm font-semibold text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-md"
              >
                <option
                  value="featured"
                  className="bg-background text-foreground"
                >
                  Featured
                </option>
                <option
                  value="price-asc"
                  className="bg-background text-foreground"
                >
                  Price: Low to High
                </option>
                <option
                  value="price-desc"
                  className="bg-background text-foreground"
                >
                  Price: High to Low
                </option>
              </select>
              <ChevronDown className="w-4 h-4 text-foreground absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </header>

        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 auto-rows-fr mb-12">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
            <h3 className="text-xl font-bold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-foreground/60">
              Try adjusting your filters to find what you&apos;re looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setPriceRange([0, maxPossiblePrice]);
                setStockFilter("all");
                setCurrentPage(1);
              }}
              className="mt-6 px-6 py-2 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-auto pt-4 border-t border-foreground/5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-foreground/5 hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                // simple pagination capping for UI cleanlyness if lots of pages
                if (
                  totalPages > 5 &&
                  i !== 0 &&
                  i !== totalPages - 1 &&
                  Math.abs(currentPage - 1 - i) > 1
                ) {
                  if (Math.abs(currentPage - 1 - i) === 2) {
                    return (
                      <span key={i} className="text-foreground/40 px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-all cursor-pointer ${
                      currentPage === i + 1
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-foreground/5 hover:bg-foreground/10 text-foreground"
                    }`}
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-foreground/5 hover:bg-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
