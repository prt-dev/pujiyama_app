"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getProductById, ProductItem } from "@/app/services/productService";
import AddToCartButton from "@/app/components/web/AddToCartButton";
import Spinner from "@/app/components/web/Spinner";
import Loading from "@/app/components/common/Loading";

interface ProductDetailProps {
  productId?: number | string;
  initialSize?: string;
}

export default function ProductDetail({ productId, initialSize }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize || "Size 0");

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      if (!productId) return;
      try {
        setIsLoading(true);
        const data = await getProductById(productId);
        if (isMounted) {
          setProduct(data);
          const sizes = data.sizes || ["Size 0", "Size 1", "Size 2", "Size 3", "Size 4", "Size 5", "Size 6"];
          if (initialSize && sizes.includes(initialSize)) {
            setSelectedSize(initialSize);
          } else {
            setSelectedSize(sizes[0] || "Size 0");
          }
        }
      } catch (err) {
        console.error("Error loading product detail:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [productId, initialSize]);

  if (isLoading || !product) {
    return (
      <div className="w-full lg:w-3/4 flex justify-center items-center py-16 bg-white rounded border border-[#eddcc6]">
        <Loading
          variant="container"
          size="md"
          message="Loading sacred item details..."
        />
      </div>
    );
  }

  const sizes = product.sizes || ["Size 0", "Size 1", "Size 2", "Size 3", "Size 4", "Size 5", "Size 6"];
  const basePrice = typeof product.price === "number" ? product.price : parseFloat(String(product.price || 0)) || 0;
  const currentPrice =
    product.variant_prices && product.variant_prices[selectedSize] !== undefined
      ? Number(product.variant_prices[selectedSize])
      : basePrice;
  const formattedPrice = `₹${currentPrice.toFixed(2)}`;

  return (
    <div className="w-full lg:w-3/4">
      <div className="rounded-2xl border border-[#eddcc6]/80 bg-white p-5 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="flex items-center justify-center rounded-xl bg-[#fbf6ee] p-6 border border-[#eddcc6] relative overflow-hidden">
            <img
              src={product.img || product.image_url || "/assets/best-selling.png"}
              alt={product.name}
              className="max-h-72 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
            {product.category && (
              <span className="absolute top-3 left-3 rounded-full bg-[#de142a] px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                {product.category}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-[#fbf6ee] border border-[#eddcc6] px-3 py-0.5 text-[11px] font-semibold text-[#de142a]">
                  In Stock &bull; SKU: {product.sku || "N/A"}
                </span>
              </div>

              <h1 className="heading-font text-xl sm:text-2xl font-bold text-[#de142a] mt-2 mb-2">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#de142a]">{formattedPrice}</span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.oldPrice}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-[1.6] text-gray-700">
                {product.desc || product.description}
              </p>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-gray-800">
                    Select Pack / Quantity:
                  </label>
                  <span className="text-xs font-bold text-[#de142a]">
                    Selected: {selectedSize}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer border ${isSelected
                          ? "bg-[#de142a] text-white border-[#de142a] shadow-xs scale-105"
                          : "bg-[#fbf6ee] text-gray-800 border-[#eddcc6] hover:bg-[#de142a] hover:text-white"
                          }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-3">
              <AddToCartButton
                productId={product.id || 1}
                variant={selectedSize}
                price={currentPrice}
                quantity={1}
                product={product as any}
                className="px-6 py-2.5 text-sm"
                showIcon={true}
                loadingText="Adding to Basket..."
                successText="Added to Devotional Basket!"
              />

              <Link
                href="/cart"
                className="rounded-lg border border-[#de142a] px-5 py-2.5 text-sm font-semibold text-[#de142a] hover:bg-[#de142a] hover:text-white transition no-underline text-center inline-flex items-center gap-1.5"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specs && product.specs.length > 0 && (
          <div className="mt-8 border-t border-zinc-100 pt-6">
            <h3 className="heading-font text-lg font-bold text-[#de142a] mb-3">
              Product Specifications &amp; Features:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {product.specs.map((s, idx) => (
                <div key={idx} className="rounded-xl bg-[#fbf6ee] border border-[#eddcc6] p-3 text-black">
                  <span className="text-xs font-bold text-[#de142a] block mb-0.5">
                    {s.label}
                  </span>
                  <span className="text-xs font-semibold text-gray-800">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
