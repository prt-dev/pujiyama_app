import Link from "next/link";

export default function CartSummary() {
  return (
    <div className="mt-6 flex justify-end">
      <div className="w-full sm:w-80 rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-5 shadow-xs">
        <h3 className="heading-font text-lg font-bold text-[#de142a] mb-3 border-b border-[#de142a]/20 pb-2">
          Cart Total
        </h3>

        <div className="space-y-2 text-xs sm:text-sm text-gray-800 font-semibold">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹849.00</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery:</span>
            <span>Free</span>
          </div>

          <div className="border-t border-[#de142a]/20 pt-2 flex justify-between items-center text-sm">
            <span className="text-gray-900">Total:</span>
            <span className="text-[#de142a] text-base font-bold">₹849.00</span>
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
  );
}
