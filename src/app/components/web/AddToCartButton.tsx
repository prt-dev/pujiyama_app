"use client";

import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { ProductItem as ApiProductItem } from "@/app/services/productService";
import { ProductItem as StaticProductItem } from "@/app/data/products";
import { addLocalCartItem } from "@/services/cartService";

export interface AddToCartButtonProps {
  productId: number | string;
  variant?: string; // variant is size of product (e.g., "Size 4", "Size 0")
  price: number | string;
  quantity?: number;
  product?: ApiProductItem | StaticProductItem;
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  loadingText?: string;
  successText?: string;
  pill?: boolean;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export default function AddToCartButton({
  productId,
  variant,
  price,
  quantity = 1,
  product,
  className = "",
  children,
  showIcon = false,
  loadingText = "Adding...",
  successText = "Added!",
  pill = false,
  onSuccess,
  onError,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addStatus, setAddStatus] = useState<"idle" | "success" | "error">("idle");

  const handleAddToCart = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isAdding) return;

    setIsAdding(true);
    setAddStatus("idle");

    try {
      addLocalCartItem({
        id: productId,
        product_id: productId,
        name: product?.name,
        variant: variant || "Standard Pack",
        quantity: quantity,
        price,
        image_url: product?.image_url || product?.img,
      });

      setAddStatus("success");
      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        setAddStatus("idle");
      }, 2500);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      // Still show success indicator for optimistic experience
      setAddStatus("success");
      if (onError) {
        onError(error);
      }
      setTimeout(() => {
        setAddStatus("idle");
      }, 2500);
    } finally {
      setIsAdding(false);
    }
  };

  const defaultClasses = pill
    ? "w-full rounded-full py-3 px-4 text-sm font-semibold text-white transition-all duration-200 border-0 cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] disabled:cursor-not-allowed"
    : "rounded px-3.5 py-1.5 text-xs font-bold text-white transition border-0 cursor-pointer shadow-xs inline-flex items-center justify-center gap-1.5 disabled:cursor-not-allowed";

  const statusClasses =
    addStatus === "success"
      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
      : "bg-[#de142a] hover:bg-[#b90f22] text-white disabled:opacity-70";

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${defaultClasses} ${statusClasses} ${className}`}
      title={typeof children === "string" ? children : "Add to Cart"}
    >
      {isAdding ? (
        <>
          <i className="fa fa-spinner fa-spin text-xs" />
          <span>{loadingText}</span>
        </>
      ) : addStatus === "success" ? (
        <>
          <i className="fa fa-check text-xs" />
          <span>{successText}</span>
        </>
      ) : (
        <>
          {showIcon && <i className="fa fa-shopping-basket text-xs" />}
          {children || <span>Add To Cart</span>}
        </>
      )}
    </button>
  );
}
