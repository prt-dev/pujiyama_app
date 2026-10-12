"use client";

import React from "react";

export interface CategoryItem {
  label: string;
  count: number;
  value?: string;
}

interface ShopSidebarCategoriesProps {
  categories?: CategoryItem[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const defaultCategories: CategoryItem[] = [
  { label: "All Items", count: 6, value: "" },
  { label: "Floral Dhoop", count: 2, value: "Floral Dhoop" },
  { label: "Rose (Gulab) Dhoop", count: 1, value: "Rose (Gulab) Dhoop" },
  { label: "Luxury Parfum", count: 1, value: "Luxury Parfum" },
  { label: "Sandalwood (Chandan)", count: 1, value: "Sandalwood (Chandan)" },
  { label: "Combo Packs", count: 1, value: "Combo Packs" },
];

export default function ShopSidebarCategories({
  categories = defaultCategories,
  selectedCategory = "",
  onSelectCategory,
}: ShopSidebarCategoriesProps) {
  return (
    <div className="rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-4 shadow-2xs">
      <div className="flex items-center justify-between mb-3 border-b border-[#de142a]/20 pb-2">
        <h4 className="heading-font text-base font-bold text-[#de142a] mb-0">
          Categories
        </h4>
        {selectedCategory && onSelectCategory && (
          <button
            type="button"
            onClick={() => onSelectCategory("")}
            className="text-[11px] text-[#de142a] hover:underline font-bold bg-transparent border-0 cursor-pointer p-0"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="space-y-1.5 p-0 list-none mb-0">
        {categories.map((cat) => {
          const catValue = cat.value !== undefined ? cat.value : cat.label;
          const isSelected =
            selectedCategory.toLowerCase() === catValue.toLowerCase() ||
            (catValue === "" && selectedCategory === "");

          return (
            <li key={cat.label}>
              <button
                type="button"
                onClick={() => onSelectCategory && onSelectCategory(catValue)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold transition border-0 text-left cursor-pointer ${
                  isSelected
                    ? "bg-[#de142a] text-white shadow-2xs"
                    : "bg-transparent text-gray-800 hover:bg-white hover:text-[#de142a]"
                }`}
              >
                <span className="truncate">{cat.label}</span>
                <span
                  className={`text-[11px] ml-2 ${
                    isSelected ? "text-white/90" : "text-gray-700"
                  }`}
                >
                  ({cat.count})
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

