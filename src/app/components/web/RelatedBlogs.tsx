import React from "react";
import Link from "next/link";
import { BlogItem } from "@/services/blogService";
import { getFullImageUrl } from "@/utils/utils";

interface RelatedBlogsProps {
  blogs?: BlogItem[];
}

const defaultRelated = [
  {
    title: "Daily Seva Vidhi & Sizing Guide for Bal Gopal",
    excerpt: "Learn traditional Laddu Gopal seva vidhi, poshak sizing, and shringar tips.",
    date: "Aug 12, 2026",
    image: "/assets/best-selling.png",
    slug: "daily-seva-vidhi-sizing-guide",
  },
  {
    title: "How to Style Pagdi & Mor Pankh for Janmashtami",
    excerpt: "A complete step-by-step guide to dressing your Laddu Gopal for festival celebrations.",
    date: "Aug 08, 2026",
    image: "/assets/pagdi.png",
    slug: "how-to-style-pagdi-mor-pankh",
  },
  {
    title: "Significance of Kundan Shringar in Krishna Bhakti",
    excerpt: "Understanding the divine beauty and spiritual significance of handmade shringar ornaments.",
    date: "Aug 02, 2026",
    image: "/assets/kundan.png",
    slug: "significance-kundan-shringar",
  },
];

export default function RelatedBlogs({ blogs = [] }: RelatedBlogsProps) {
  const items = blogs.length > 0 ? blogs.slice(0, 3) : defaultRelated;

  return (
    <div className="mt-8 border-t border-zinc-200 pt-6">
      <h3 className="heading-font text-xl font-bold text-[#de142a] mb-4">
        Related Devotional Articles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="rounded-xl border border-[#eddcc6] bg-white overflow-hidden flex flex-col shadow-xs hover:shadow-md transition">
            <div className="h-40 w-full bg-[#fbf6ee] p-2 flex items-center justify-center border-b border-[#eddcc6]">
              <img
                src={
                  (item as any).featured_image
                    ? getFullImageUrl((item as any).featured_image)
                    : (item as any).image || "/assets/best-selling.png"
                }
                className="h-full w-full object-contain"
                alt={item.title}
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="text-[11px] font-semibold text-gray-600 mb-1">
                <i className="fa fa-calendar-alt text-[#de142a] mr-1" />
                {(item as any).published_at
                  ? new Date((item as any).published_at).toLocaleDateString()
                  : (item as any).date || "August 2026"}
              </span>
              <h5 className="heading-font text-sm font-bold text-gray-900 mb-2 line-clamp-1">
                <Link
                  href={`/blog-preview?slug=${item.slug || ""}`}
                  className="text-gray-900 hover:text-[#de142a] no-underline"
                >
                  {item.title}
                </Link>
              </h5>
              <p className="text-xs text-gray-600 line-clamp-2 mb-3 flex-1">
                {item.excerpt}
              </p>
              <Link
                href={`/blog-preview?slug=${item.slug || ""}`}
                className="rounded-lg bg-[#de142a] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#b90f22] no-underline self-start"
              >
                Read Article &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
