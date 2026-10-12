interface ShopSidebarSizeFilterProps {
  sizes?: string[];
  selectedSize?: string;
  onSelectSize?: (size: string) => void;
}

const defaultSizes = ["100g Box", "200g Saver", "400g Mega Pack"];

export default function ShopSidebarSizeFilter({
  sizes = defaultSizes,
  selectedSize,
  onSelectSize,
}: ShopSidebarSizeFilterProps) {
  return (
    <div className="rounded-xl border border-[#eddcc6] bg-white p-4 shadow-2xs">
      <h4 className="heading-font text-base font-bold text-[#de142a] mb-3 border-b border-[#de142a]/20 pb-2">
        Pack / Quantity
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize && onSelectSize(size)}
              className={`rounded-lg border px-2 py-1 text-xs font-semibold transition cursor-pointer ${
                isSelected
                  ? "bg-[#de142a] text-white border-[#de142a]"
                  : "bg-[#fbf6ee] text-gray-800 border-[#eddcc6] hover:bg-[#de142a] hover:text-white"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
