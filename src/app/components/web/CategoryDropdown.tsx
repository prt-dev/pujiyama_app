"use client";

import React from "react";
import Link from "next/link";
import { allProducts } from "@/app/data/products";

export interface CategoryGroup {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  items: {
    name: string;
    href: string;
    badge?: string;
  }[];
}

export const activeCategoryGroups: CategoryGroup[] = [
  {
    id: "floral-dhoop",
    title: "FLORAL DHOOP",
    slug: "Floral Dhoop",
    tagline: "Natural botanical blends",
    items: [
      { name: "Pujyama Mix Floral Dhoop Sticks", href: "/shop-detail?id=1", badge: "Best Seller" },
      { name: "Pujyama Mogra Blossom Dhoop", href: "/shop-detail?id=5" },
      { name: "100% Charcoal-Free Natural Base", href: "/shop?category=Floral%20Dhoop" },
      { name: "Spiritual Calm & Meditation Pack", href: "/shop-detail?id=1" },
    ],
  },
  {
    id: "rose-gulab",
    title: "ROSE & GULAB",
    slug: "Rose (Gulab) Dhoop",
    tagline: "Sweet & refreshing aroma",
    items: [
      { name: "Pujyama Gulab (Rose) Dhoop Sticks", href: "/shop-detail?id=2", badge: "Aromatherapy" },
      { name: "Relaxing Ambient Rose Fragrance", href: "/shop-detail?id=2" },
      { name: "Mental & Physical Wellness Blend", href: "/shop-detail?id=2" },
      { name: "Evening Aarti Sweet Rose Sticks", href: "/shop?category=Rose%20(Gulab)%20Dhoop" },
    ],
  },
  {
    id: "chandan-parfum",
    title: "CHANDAN & LUXURY",
    slug: "Sandalwood (Chandan)",
    tagline: "Mysore chandan & fine parfum",
    items: [
      { name: "Pure Chandan (Sandalwood) Dhoop", href: "/shop-detail?id=4", badge: "Sacred" },
      { name: "Pujyama Parfum 1M Luxury Dhoop", href: "/shop-detail?id=3" },
      { name: "Bamboo-less Thick Dhoop Sticks", href: "/shop?category=Luxury%20Parfum" },
      { name: "Complimentary Ceramic Dhoop Stand", href: "/shop-detail?id=3" },
    ],
  },
  {
    id: "combo-packs",
    title: "SAMRIDDHI COMBOS",
    slug: "Combo Packs",
    tagline: "Festive sets & saver packs",
    items: [
      { name: "4-in-1 Divine Dhoop Samriddhi Box", href: "/shop-detail?id=6", badge: "Gift Box" },
      { name: "Navratri & Festival Puja Kit", href: "/shop?category=Combo%20Packs" },
      { name: "200g Saver & 400g Mega Packs", href: "/shop?category=Combo%20Packs" },
      { name: "Devotional Temple Gifting Set", href: "/shop-detail?id=6" },
    ],
  },
];

interface CategoryDropdownProps {
  isOpen?: boolean;
  onClose?: () => void;
  onMouseEnter?: () => void;
  className?: string;
  isMobile?: boolean;
}

export default function CategoryDropdown({
  isOpen = true,
  onClose,
  onMouseEnter,
  className = "",
  isMobile = false,
}: CategoryDropdownProps) {
  if (!isOpen) return null;

  // Featured promotion card
  const featuredCombo = allProducts.find((p) => p.id === 6) || allProducts[0];

  // ================= MOBILE ACCORDION (SCROLLABLE & TOUCH-OPTIMIZED) =================
  if (isMobile) {
    return (
      <div className={`w-full py-2 space-y-3 max-h-[55vh] overflow-y-auto overscroll-contain pr-1 ${className}`}>
        {activeCategoryGroups.map((group) => (
          <div
            key={group.id}
            className="rounded-xl bg-white/5 border border-white/10 p-3 shadow-xs"
          >
            <Link
              href={`/shop?category=${encodeURIComponent(group.slug)}`}
              onClick={onClose}
              className="font-serif text-sm font-bold tracking-wider text-[#de142a] uppercase block mb-1 no-underline flex items-center justify-between"
            >
              <span>{group.title}</span>
              <span className="text-[10px] font-normal text-gray-400 capitalize">
                {group.tagline}
              </span>
            </Link>

            <ul className="space-y-1.5 mt-2 pt-2 border-t border-white/10 list-none p-0 m-0">
              {group.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-serif text-[13px] text-gray-300 hover:text-white transition-colors block py-1 no-underline flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#de142a]/30 text-rose-300 font-sans font-medium shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // ================= DESKTOP & TABLET VIEWPORT-CENTERED MEGA MENU =================
  return (
    <div
      className={`fixed left-0 right-0 top-[72px] z-50 flex justify-center px-3 sm:px-5 pointer-events-none ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onClose}
    >
      <div className="pointer-events-auto w-full max-w-[1140px] max-h-[calc(100vh-88px)] overflow-y-auto rounded-2xl bg-white border border-[#eddcc6] border-t-2 border-t-[#de142a] shadow-2xl shadow-black/25 p-5 sm:p-7 md:p-8 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
        {/* Subtle decorative watermark */}
        <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none transform translate-x-12 translate-y-12">
          <img src="/assets/logo.png" alt="Decorative" className="w-96 h-auto" />
        </div>

        {/* Multi-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 relative z-10">
          {/* First 4 Columns: Available Category Collections */}
          {activeCategoryGroups.map((group) => (
            <div key={group.id} className="flex flex-col">
              {/* Category Header */}
              <Link
                href={`/shop?category=${encodeURIComponent(group.slug)}`}
                onClick={onClose}
                className="group/title inline-block mb-3 pb-2 border-b border-[#eddcc6]/70 no-underline"
              >
                <h3 className="font-serif text-[14px] sm:text-[15px] font-bold tracking-widest text-[#1a1a1a] uppercase group-hover/title:text-[#de142a] transition-colors flex items-center justify-between">
                  <span>{group.title}</span>
                  <i className="fa fa-angle-right text-xs opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all text-[#de142a]" />
                </h3>
                <span className="text-[11px] text-gray-500 font-sans block mt-0.5 truncate">
                  {group.tagline}
                </span>
              </Link>

              {/* Products in this category */}
              <ul className="space-y-2 list-none p-0 m-0">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group/item font-serif text-[13px] sm:text-[13.5px] text-[#374151] hover:text-[#de142a] hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 no-underline py-0.5 leading-snug"
                    >
                      <span className="line-clamp-1">{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#de142a]/10 text-[#de142a] font-sans font-semibold shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Quick-Action Bar */}
        <div className="mt-6 pt-4 border-t border-[#eddcc6]/70 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#de142a]" />
            <span className="font-serif italic text-gray-600">
              100% Charcoal-Free • Pure Botanical Natural Base • Free Ceramic Stand Included
            </span>
          </div>
          <Link
            href="/shop"
            onClick={onClose}
            className="font-serif font-bold text-[#de142a] hover:text-[#b90f22] no-underline flex items-center gap-1.5 transition-transform hover:translate-x-0.5 ml-auto"
          >
            <span>Browse Complete Sacred Catalog</span>
            <i className="fa fa-arrow-right text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
