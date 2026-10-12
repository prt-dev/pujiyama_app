"use client";

import React from "react";
import Link from "next/link";
import { useGeneral } from "@/context/web/GeneralContext";

export interface FeaturedProductItem {
  img: string;
  name: string;
  price: string;
  oldPrice?: string;
  href?: string;
}

interface ShopSidebarFeaturedProps {
  products?: FeaturedProductItem[];
}

const defaultFeaturedProducts: FeaturedProductItem[] = [
  { img: "/assets/products/mix-floral-front.jpg", name: "Pujyama Mix Floral Dhoop", price: "₹149", oldPrice: "₹199", href: "/shop-detail?id=1" },
  { img: "/assets/products/gulab-benefits.jpg", name: "Pujyama Gulab (Rose) Dhoop", price: "₹149", oldPrice: "₹199", href: "/shop-detail?id=2" },
  { img: "/assets/products/dhoop-sticks-packet.jpg", name: "Pujyama Parfum 1M Dhoop", price: "₹175", oldPrice: "₹230", href: "/shop-detail?id=3" },
];

export default function ShopSidebarFeatured({
  products: propProducts,
}: ShopSidebarFeaturedProps) {
  const { products: contextProducts } = useGeneral();

  // Use the first 3 products from GeneralContext, or fallback to prop/defaults
  const featuredItems: FeaturedProductItem[] =
    propProducts ||
    (contextProducts && contextProducts.length > 0
      ? contextProducts.slice(0, 3).map((p) => {
          const firstSize = p.sizes?.[0] || "Size 0";
          const basePrice =
            typeof p.price === "number"
              ? p.price
              : parseFloat(String(p.price || 0)) || 0;
          const oldPriceVal = (p as any).original_price || (p as any).oldPrice;

          return {
            img: p.img || p.image_url || "/assets/best-selling.png",
            name: p.name || "Sacred Item",
            price: `₹${basePrice}`,
            oldPrice: oldPriceVal ? `₹${oldPriceVal}` : undefined,
            href: `/shop-detail?id=${p.id || 1}&size=${encodeURIComponent(firstSize)}`,
          };
        })
      : defaultFeaturedProducts);

  return (
    <div className="rounded-xl border border-[#eddcc6] bg-white p-4 shadow-2xs">
      <h4 className="heading-font text-base font-bold text-[#de142a] mb-3 border-b border-[#de142a]/20 pb-2">
        Featured Fragrances
      </h4>
      <div className="space-y-3">
        {featuredItems.map((p, i) => (
          <Link
            key={i}
            href={p.href || "/shop-detail"}
            className="flex items-center gap-2 rounded-lg border border-[#eddcc6] p-2 no-underline text-black hover:border-[#de142a]/40 hover:bg-[#fbf6ee] transition group"
          >
            <div className="h-12 w-12 flex-shrink-0 bg-[#fbf6ee] p-1 flex items-center justify-center rounded-md overflow-hidden border border-[#eddcc6]">
              <img
                src={p.img}
                className="h-full w-full object-contain transition-transform group-hover:scale-105"
                alt={p.name}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h6
                className="heading-font text-xs font-bold text-black truncate mb-0.5 group-hover:text-[#de142a]"
                title={p.name}
              >
                {p.name}
              </h6>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#de142a]">{p.price}</span>
                {p.oldPrice && (
                  <span className="text-[10px] text-gray-500 line-through">{p.oldPrice}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
