"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ShopSidebar from "./ShopSidebar";
import ShopProducts from "./ShopProducts";
import { CategoryItem } from "./ShopSidebarCategories";
import { ProductItem } from "@/app/services/productService";
import { useGeneral } from "@/app/context/GeneralContext";
import Spinner from "./Spinner";
import Loading from "@/app/components/common/Loading";

export default function ShopSection() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSize = searchParams.get("size") || "";
  const initialQuery = searchParams.get("q") || "";

  const { products, categories: categoriesList, isLoading } = useGeneral();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<string>("");

  // Sync state when URL params change (e.g. from navbar, footer, or explore buttons)
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat !== null) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    const size = searchParams.get("size");
    if (size !== null) {
      setSelectedSize(size);
    }
  }, [searchParams]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Extract dynamic category counts and list
  const uniqueCategories: CategoryItem[] = useMemo(() => {
    const totalCount = products.length;
    const catItems: CategoryItem[] = [
      { label: "All Items", count: totalCount, value: "" },
    ];

    if (categoriesList.length > 0) {
      categoriesList.forEach((c) => {
        const cName = c.name || "";
        const count = products.filter(
          (p) =>
            p.category_id === c.id ||
            (p.category && p.category.toLowerCase() === cName.toLowerCase())
        ).length;
        catItems.push({
          label: cName,
          value: cName,
          count,
        });
      });
    } else {
      const rawCategories = Array.from(new Set(products.map((p) => p.category || ""))).filter(Boolean);
      rawCategories.forEach((cat) => {
        catItems.push({
          label: cat,
          value: cat,
          count: products.filter((p) => (p.category || "").toLowerCase() === cat.toLowerCase()).length,
        });
      });
    }

    return catItems;
  }, [products, categoriesList]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory((prev) =>
      prev.toLowerCase() === category.toLowerCase() ? "" : category
    );
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize((prev) => (prev === size ? "" : size));
  };

  const handleClearAllFilters = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setSearchQuery("");
    setSortBy("");
  };

  const hasActiveFilters = Boolean(selectedCategory || selectedSize || searchQuery);

  return (
    <div className="mx-auto max-w-[1100px] px-5 py-8">
      {/* Top Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-[#fbf6ee] p-4 rounded-xl border border-[#eddcc6] shadow-xs">
        <div className="w-full sm:w-72">
          <div className="relative">
            <input
              type="search"
              placeholder="Search dhoop sticks, floral, gulab, chandan, parfum..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-xs text-black focus:border-[#de142a] focus:outline-hidden"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute right-2.5 top-2.5 text-[#de142a] text-xs">
              <i className="fa fa-search" />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end text-xs font-semibold text-gray-800">
          <label htmlFor="shop-sort">Sort by:</label>
          <select
            id="shop-sort"
            className="rounded-lg border border-gray-300 bg-white py-1.5 px-2.5 text-xs font-semibold text-black focus:border-[#de142a] focus:outline-hidden cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Featured Items</option>
            <option value="bestseller">Top Selling</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Active Filter Badges Bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-3 rounded-xl border border-[#eddcc6] shadow-2xs">
          <span className="text-xs font-bold text-gray-700">Active Filters:</span>

          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className="inline-flex items-center gap-1 rounded-full bg-[#de142a] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#b90f22] cursor-pointer border-0 shadow-2xs"
            >
              <span>Category: {selectedCategory}</span>
              <span className="font-bold">&times;</span>
            </button>
          )}

          {selectedSize && (
            <button
              type="button"
              onClick={() => setSelectedSize("")}
              className="inline-flex items-center gap-1 rounded-full bg-[#de142a] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#b90f22] cursor-pointer border-0 shadow-2xs"
            >
              <span>Size: {selectedSize}</span>
              <span className="font-bold">&times;</span>
            </button>
          )}

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="inline-flex items-center gap-1 rounded-full bg-[#de142a] px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-[#b90f22] cursor-pointer border-0 shadow-2xs"
            >
              <span>Search: &ldquo;{searchQuery}&rdquo;</span>
              <span className="font-bold">&times;</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleClearAllFilters}
            className="text-[11px] font-semibold text-[#de142a] hover:underline bg-transparent border-0 cursor-pointer ml-auto"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-16 flex justify-center items-center">
          <Loading
            variant="container"
            size="lg"
            message="Loading Sacred Devotional Collection..."
          />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <ShopProducts
            products={products}
            filterCategory={selectedCategory}
            filterSize={selectedSize}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onSelectCategory={handleSelectCategory}
            onClearFilters={handleClearAllFilters}
          />
          <ShopSidebar
            categories={uniqueCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            selectedSize={selectedSize}
            onSelectSize={handleSelectSize}
          />
        </div>
      )}
    </div>
  );
}
