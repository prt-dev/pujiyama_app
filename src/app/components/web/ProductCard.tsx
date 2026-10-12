"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductItem } from "@/app/services/productService";
import AddToCartButton from "@/app/components/web/AddToCartButton";

export type { ProductItem };

interface ProductCardProps {
  product: ProductItem;
  selectedSize?: string;
  onSelectSize?: (productId: number, size: string) => void;
  onSelectCategory?: (category: string) => void;
}

export default function ProductCard({
  product,
  selectedSize: controlledSize,
  onSelectSize,
  onSelectCategory,
}: ProductCardProps) {
  const sizes = product.sizes || ["100g Box", "200g Saver Pack", "400g Mega Pack"];
  const [internalSize, setInternalSize] = useState<string>(
    controlledSize || sizes[0] || "100g Box"
  );

  const activeSize = controlledSize !== undefined ? controlledSize : internalSize;

  const detailUrl = `/shop-detail?id=${product.id || 1}&size=${encodeURIComponent(activeSize)}`;
  const displayImage = product.img || product.image_url || "/assets/best-selling.png";
  const basePrice = typeof product.price === "number" ? product.price : parseFloat(String(product.price || 0)) || 0;
  const currentPrice =
    product.variant_prices && product.variant_prices[activeSize] !== undefined
      ? Number(product.variant_prices[activeSize])
      : basePrice;

  // Extract or calculate original price for strikethrough & discount pill badge
  let displayOldPrice: number | null = null;
  if (typeof product.oldPrice === "string") {
    const parsed = parseFloat(product.oldPrice.replace(/[^0-9.]/g, ""));
    if (!isNaN(parsed) && parsed > currentPrice) {
      displayOldPrice = parsed;
    }
  } else if (typeof product.oldPrice === "number" && product.oldPrice > currentPrice) {
    displayOldPrice = product.oldPrice;
  } else if ((product as any).old_price && Number((product as any).old_price) > currentPrice) {
    displayOldPrice = Number((product as any).old_price);
  }

  // Fallback to a realistic strikethrough price if not provided
  if (!displayOldPrice || displayOldPrice <= currentPrice) {
    displayOldPrice = Math.round(currentPrice * 1.25);
  }

  const discountPercent = Math.round(((displayOldPrice - currentPrice) / displayOldPrice) * 100);
  const discountBadge = discountPercent > 0 ? `${discountPercent}% OFF` : "10% OFF";

  return (
    <div className="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-3.5 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#faf7f2] flex items-center justify-center">
        <Link
          href={detailUrl}
          className="relative w-full h-full flex items-center justify-center p-3"
        >
          <img
            src={displayImage}
            alt={product.name || "Product Image"}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Discount Badge (Top Right Pill) */}
        <span className="absolute top-2.5 right-2.5 z-10 rounded-full bg-[#de142a] px-3 py-1 text-[11px] font-bold text-white tracking-wide shadow-xs uppercase pointer-events-none">
          {discountBadge}
        </span>
      </div>

      {/* Product Information */}
      <div className="mt-3.5 flex flex-col flex-1">
        {/* Title */}
        <Link
          href={detailUrl}
          className="no-underline block group/title"
        >
          <h3
            className="text-[15px] sm:text-base font-semibold text-[#1f2937] group-hover/title:text-[#de142a] transition-colors line-clamp-1 leading-snug tracking-tight"
            title={product.name}
          >
            {product.name}
          </h3>
        </Link>

        {/* Price Row: Current Price + Strikethrough Price */}
        <div className="mt-2 mb-3.5 flex items-baseline gap-2">
          <span className="text-[17px] sm:text-lg font-bold text-[#111827] tracking-tight">
            ₹ {currentPrice.toFixed(2)}
          </span>
          {displayOldPrice && (
            <span className="text-sm font-normal text-gray-400 line-through">
              ₹ {displayOldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add To Cart Button (Full-width rounded pill) */}
        <div className="mt-auto">
          <AddToCartButton
            productId={product.id || 1}
            variant={activeSize}
            price={currentPrice}
            quantity={1}
            product={product as any}
            pill={true}
          />
        </div>
      </div>
    </div>
  );
}
