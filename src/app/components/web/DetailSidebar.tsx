"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useGeneral } from "@/app/context/GeneralContext";

interface DetailSidebarProps {
  currentProductId?: number | string;
}

export default function DetailSidebar({ currentProductId = 1 }: DetailSidebarProps) {
  const { products, categories } = useGeneral();
  const numericCurrentId = typeof currentProductId === "string" ? parseInt(currentProductId, 10) : currentProductId;

  const featured = useMemo(() => {
    return products.filter((p) => p.id !== numericCurrentId).slice(0, 3);
  }, [products, numericCurrentId]);

  const productCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    categories.forEach((c) => {
      counts[c.name || ""] = products.filter(
        (p) => p.category_id === c.id || (p.category && p.category.toLowerCase() === (c.name || "").toLowerCase())
      ).length;
    });
    return counts;
  }, [products, categories]);

  return (
    <div className="w-full lg:w-1/4">
      <div className="space-y-4">
        {/* Categories */}
        <div className="rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-4 shadow-2xs">
          <h4 className="heading-font text-base font-bold text-[#de142a] mb-3 border-b border-[#de142a]/20 pb-2">
            Categories
          </h4>
          <ul className="space-y-2 p-0 list-none mb-0">
            {categories.map((cat) => {
              const count = cat.name ? productCounts[cat.name] ?? 0 : 0;
              return (
                <li key={cat.id || cat.slug || cat.name}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat.name || "")}`}
                    className="flex items-center justify-between text-xs font-semibold text-gray-800 hover:text-[#de142a] transition no-underline"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-gray-500">({count})</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Featured Items */}
        {featured.length > 0 && (
          <div className="rounded-xl border border-[#eddcc6] bg-white p-4 shadow-2xs">
            <h4 className="heading-font text-base font-bold text-[#de142a] mb-3 border-b border-[#de142a]/20 pb-2">
              Featured Dhoop Sticks
            </h4>
            <div className="space-y-3">
              {featured.map((p) => {
                const formattedPrice = typeof p.price === "number" ? `₹${p.price.toFixed(2)}` : p.price;
                const defaultSize = p.sizes?.[0] || "100g Box (approx. 50 sticks)";
                return (
                  <Link
                    key={p.id}
                    href={`/shop-detail?id=${p.id}&size=${encodeURIComponent(defaultSize)}`}
                    className="flex items-center gap-2.5 rounded-lg border border-[#eddcc6] p-2 hover:bg-[#fbf6ee] transition no-underline block"
                  >
                    <div className="h-12 w-12 flex-shrink-0 bg-[#fbf6ee] p-1 flex items-center justify-center rounded-md overflow-hidden border border-[#eddcc6]">
                      <img
                        src={p.img || p.image_url || "/assets/best-selling.png"}
                        className="h-full w-full object-contain transition-transform hover:scale-105"
                        alt={p.name}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h6 className="heading-font text-xs font-bold text-gray-900 truncate mb-0.5 hover:text-[#de142a]" title={p.name}>
                        {p.name}
                      </h6>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#de142a]">{formattedPrice}</span>
                        {p.oldPrice && (
                          <span className="text-[10px] text-gray-500 line-through">{p.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
