"use client";

import React from "react";
import Link from "next/link";
import CartItemRow from "./CartItemRow";
import { useCart } from "@/app/context/CartContext";
import { removeLocalCartItem, updateLocalCartItemQuantity } from "@/services/cartService";

export default function CartTable() {
  const { items, subtotal } = useCart();

  // 1. Empty Basket / Not Found State
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-2xl border border-[#eddcc6] bg-[#fbf6ee] text-center shadow-xs">
        <div className="h-20 w-20 rounded-full bg-white border border-[#eddcc6] flex items-center justify-center mb-4 text-[#de142a] shadow-xs">
          <i className="fa fa-shopping-basket text-3xl" />
        </div>
        <h3 className="heading-font text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Your Devotional Basket is Empty
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-6 max-w-md">
          You have not added any sacred poshak, pagdi, or shringar items to your basket yet.
        </p>
        <Link
          href="/shop"
          className="rounded-lg bg-[#de142a] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#b90f22] no-underline shadow-sm"
        >
          Explore Divine Collection &rarr;
        </Link>
      </div>
    );
  }

  // 3. Cart Table Content
  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-[#eddcc6] bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#eddcc6] bg-[#fbf6ee] text-xs font-bold text-[#de142a]">
              <th className="py-3.5 px-4">Item</th>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Quantity</th>
              <th className="py-3.5 px-4">Total</th>
              <th className="py-3.5 px-4 text-center">Remove</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 text-xs sm:text-sm text-black">
            {items.map((item) => (
              <CartItemRow
                key={`${item.product_id}-${item.variant || ""}`}
                item={item}
                onUpdateQuantity={updateLocalCartItemQuantity}
                onRemove={removeLocalCartItem}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Coupon & Summary Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Coupon Row */}
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            className="hidden rounded-lg border border-gray-300 px-3 py-2 text-xs text-black focus:border-[#de142a] focus:outline-hidden sm:w-60"
            placeholder="Coupon Code"
          />
          <button
            className="hidden rounded-lg bg-[#de142a] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#b90f22] border-0 cursor-pointer shadow-xs"
            type="button"
          >
            Apply Coupon
          </button>
        </div>

        {/* Cart Total Summary */}
        <div className="flex justify-end">
          <div className="w-full sm:w-80 rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-5 shadow-xs">
            <h3 className="heading-font text-lg font-bold text-[#de142a] mb-3 border-b border-[#de142a]/20 pb-2">
              Cart Total
            </h3>

            <div className="space-y-2 text-xs sm:text-sm text-gray-800 font-semibold">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{subtotal?.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="text-emerald-700">Free</span>
              </div>

              <div className="border-t border-[#de142a]/20 pt-2 flex justify-between items-center text-sm">
                <span className="text-gray-900">Total:</span>
                <span className="text-[#de142a] text-base font-extrabold">
                  ₹{subtotal?.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-4 block w-full rounded-lg bg-[#de142a] py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#b90f22] no-underline shadow-sm"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
