import Link from "next/link";

interface BlogSidebarProps {
  recentBlogs?: { title: string; date: string; slug?: string }[];
}

const defaultCategories = [
  { name: "Charcoal-Free Dhoop Vidhi", count: 12 },
  { name: "Spiritual Aromatherapy & Wellness", count: 8 },
  { name: "Daily Aarti & Shodashopachara", count: 15 },
  { name: "Gulab & Chandan Traditions", count: 10 },
  { name: "Eco-Friendly Incense Crafting", count: 6 },
];

export default function BlogSidebar({ recentBlogs = [] }: BlogSidebarProps) {
  return (
    <aside className="space-y-5">
      {/* Categories */}
      <div className="rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-5 shadow-2xs">
        <h4 className="heading-font text-base font-bold text-[#de142a] mb-3 border-b border-[#de142a]/20 pb-2">
          Devotional Topics
        </h4>
        <ul className="space-y-2 p-0 list-none mb-0">
          {defaultCategories.map((c) => (
            <li key={c.name}>
              <Link
                href="/blog-preview"
                className="flex items-center justify-between text-xs font-semibold text-gray-800 hover:text-[#de142a] transition no-underline"
              >
                <span>{c.name}</span>
                <span className="text-xs text-gray-500">({c.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured Pagdi & Kundan Banner */}
      <div className="rounded-xl border border-[#eddcc6] bg-[#fbf6ee] p-5 text-center shadow-2xs">
        <h4 className="heading-font text-base font-bold text-[#de142a] mb-2">
          Janmashtami Special
        </h4>
        <p className="text-xs text-gray-700 mb-3">
          Explore handcrafted poshak &amp; pagdi collection curated with love.
        </p>
        <Link
          href="/shop"
          className="rounded-lg bg-[#de142a] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#b90f22] no-underline inline-block shadow-sm"
        >
          View Collection
        </Link>
      </div>
    </aside>
  );
}
