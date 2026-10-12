"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "../../config/site";
import { useWebAuth } from "@/context/web/WebAuthContext";
import { useGeneral } from "@/context/web/GeneralContext";
import CategoryDropdown from "./CategoryDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout } = useWebAuth();
  const { products: productsList, categories: categoriesList, cartCount } = useGeneral();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsNavOpen(false);
    setIsUserMenuOpen(false);
    setIsSearchOpen(false);
    setIsCategoryOpen(false);
    setIsMobileCategoryOpen(false);
  }, [pathname]);

  const handleCategoryMouseEnter = () => {
    if (categoryTimeoutRef.current) clearTimeout(categoryTimeoutRef.current);
    setIsCategoryOpen(true);
  };

  const handleCategoryMouseLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setIsCategoryOpen(false);
    }, 220);
  };

  // Handle ESC key to close search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
    setIsSearchOpen(false);
  };

  const handleCategoryQuickSearch = (cat: string) => {
    router.push(`/shop?category=${encodeURIComponent(cat)}`);
    setIsSearchOpen(false);
  };

  // Instant live search results as devotee types
  const liveResults = searchQuery.trim()
    ? productsList
      .filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        return (
          (p.name || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q) ||
          (p.desc || p.description || "").toLowerCase().includes(q)
        );
      })
      .slice(0, 4)
    : [];

  const quickCategories =
    categoriesList.length > 0
      ? categoriesList.map((c) => c.name || "").filter(Boolean)
      : ["Poshak", "Pagdi", "Kundan Shringar", "Special"];

  return (
    <>
      {/* ================= HEADER ================= */}
      {/* ================= HEADER ================= */}
      <header className="bg-[#0a0a0a] sticky top-0 z-50 border-b border-[#de142a]/30 shadow-md">
        <div className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between px-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center no-underline py-1"
          >
            <img src="/assets/logo.png" alt="Pujyama" className="h-11 sm:h-12 w-auto object-contain" />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-200">
            <Link
              href="/"
              className={`transition hover:text-[#de142a] no-underline ${pathname === "/" ? "text-[#de142a] font-bold" : "text-gray-200"
                }`}
            >
              Home
            </Link>

            {/* Category Dropdown Trigger */}
            <div
              className="relative py-2"
              onMouseEnter={handleCategoryMouseEnter}
              onMouseLeave={handleCategoryMouseLeave}
            >
              <button
                type="button"
                onClick={() => setIsCategoryOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 transition hover:text-[#de142a] bg-transparent border-0 cursor-pointer font-semibold text-sm ${pathname.includes("/shop") || isCategoryOpen ? "text-[#de142a] font-bold" : "text-gray-200"
                  }`}
              >
                <span>Products</span>
                <i
                  className={`fas fa-chevron-down text-[10px] transition-transform duration-200 ${isCategoryOpen ? "rotate-180 text-[#de142a]" : ""
                    }`}
                />
              </button>

              {/* Mega Dropdown Menu */}
              <CategoryDropdown
                isOpen={isCategoryOpen}
                onMouseEnter={handleCategoryMouseEnter}
                onClose={() => setIsCategoryOpen(false)}
              />
            </div>

            <Link
              href="/blogs"
              className={`transition hover:text-[#de142a] no-underline ${pathname === "/blogs" || pathname === "/blog" || pathname === "/blog-preview"
                ? "text-[#de142a] font-bold"
                : "text-gray-200"
                }`}
            >
              Blogs
            </Link>

            <Link
              href="/contact"
              className={`transition hover:text-[#de142a] no-underline ${pathname === "/contact" ? "text-[#de142a] font-bold" : "text-gray-200"
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={() => {
                setSearchQuery("");
                setIsSearchOpen(true);
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#de142a] hover:text-white border border-white/10 cursor-pointer shadow-xs"
              title="Search Sacred Items"
              type="button"
            >
              <i className="fas fa-search text-xs"></i>
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#de142a] hover:text-white no-underline border border-white/10 shadow-xs"
              title="Cart"
            >
              <i className="fas fa-shopping-bag text-xs"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#de142a] text-[10px] font-bold text-white shadow-xs">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Auth / Account */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-[#de142a]/20 border border-white/15 px-2.5 py-1 text-xs font-semibold text-white transition cursor-pointer shadow-xs"
                  title="My Account"
                >
                  <img
                    src="/assets/login-icon.png"
                    alt="Account"
                    className="h-5 w-5 object-contain"
                  />
                  <span className="max-w-[70px] truncate hidden sm:inline">{user?.name || "Account"}</span>
                  <i className="fas fa-chevron-down text-[9px]"></i>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-lg bg-[#18181b] p-2 shadow-xl border border-zinc-700 z-50 text-xs">
                    <div className="border-b border-zinc-700 px-2 py-1.5 text-gray-400 truncate">
                      {user?.email}
                    </div>
                    <Link
                      href="/cart"
                      className="block px-2 py-1.5 text-gray-200 hover:bg-white/10 hover:text-[#de142a] no-underline rounded font-medium transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Cart
                    </Link>
                    <Link
                      href="/checkout"
                      className="block px-2 py-1.5 text-gray-200 hover:bg-white/10 hover:text-[#de142a] no-underline rounded font-medium transition"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Checkout
                    </Link>
                    {user?.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        className="block px-2 py-1.5 text-[#de142a] hover:bg-white/10 no-underline rounded font-medium transition"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 text-red-400 hover:bg-red-950/40 rounded font-medium border-0 bg-transparent cursor-pointer transition"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-[#de142a]/20 hover:border-[#de142a] border border-white/10 no-underline shadow-xs hover:scale-105"
                title="Log In / Account"
              >
                <img
                  src="/assets/login-icon.png"
                  alt="Log In"
                  className="h-5 w-5 object-contain"
                />
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsNavOpen((prev) => !prev)}
              type="button"
              className="flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#de142a] border border-white/10 cursor-pointer transition"
              aria-label="Toggle navigation"
            >
              <i className={`fas ${isNavOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu (Scrollable for all screen heights) */}
        {isNavOpen && (
          <div className="border-t border-[#de142a]/30 bg-[#0c0c0e] px-4 sm:px-5 py-4 md:hidden max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain shadow-2xl">
            <nav className="flex flex-col gap-3 text-sm font-semibold text-gray-200 pb-6">
              <Link
                href="/"
                className={`transition hover:text-[#de142a] no-underline ${pathname === "/" ? "text-[#de142a]" : ""}`}
                onClick={() => setIsNavOpen(false)}
              >
                Home
              </Link>
              <div>
                <button
                  type="button"
                  onClick={() => setIsMobileCategoryOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between transition hover:text-[#de142a] bg-transparent border-0 cursor-pointer font-semibold text-sm py-1.5 ${pathname === "/shop" || isMobileCategoryOpen ? "text-[#de142a]" : "text-gray-200"
                    }`}
                >
                  <span>Category</span>
                  <i
                    className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isMobileCategoryOpen ? "rotate-180 text-[#de142a]" : ""
                      }`}
                  />
                </button>

                {isMobileCategoryOpen && (
                  <div className="pl-3 pt-2 border-l-2 border-[#de142a]/40 mt-1">
                    <CategoryDropdown
                      isOpen={true}
                      isMobile={true}
                      onClose={() => {
                        setIsNavOpen(false);
                        setIsMobileCategoryOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
              <Link
                href="/blogs"
                className={`transition hover:text-[#de142a] no-underline ${pathname.includes("blog") ? "text-[#de142a]" : ""}`}
                onClick={() => setIsNavOpen(false)}
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className={`transition hover:text-[#de142a] no-underline ${pathname === "/contact" ? "text-[#de142a]" : ""}`}
                onClick={() => setIsNavOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Auth Link */}
              <div className="pt-2 border-t border-white/10 mt-1">
                {isAuthenticated ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsNavOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold"
                  >
                    <img src="/assets/login-icon.png" alt="User" className="h-4 w-4 object-contain" />
                    <span>Log Out ({user?.name || "Account"})</span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 text-gray-200 hover:text-[#de142a] no-underline text-sm font-semibold"
                    onClick={() => setIsNavOpen(false)}
                  >
                    <img src="/assets/login-icon.png" alt="Log In" className="h-4 w-4 object-contain" />
                    <span>Log In / Register</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16 sm:pt-24"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl bg-white p-5 sm:p-6 shadow-2xl border border-zinc-200 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 border-b border-zinc-200 pb-2">
              <h3 className="heading-font text-lg font-bold text-[#de142a] flex items-center gap-2 mb-0">
                <i className="fas fa-search text-sm"></i>
                <span>Search Sacred Items</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="h-7 w-7 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 flex items-center justify-center border-0 bg-transparent text-lg font-bold cursor-pointer transition"
                title="Close"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search Poshak, Pagdi, Kundan, Mukut..."
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-black focus:border-[#de142a] focus:outline-hidden pr-8 shadow-2xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black border-0 bg-transparent cursor-pointer text-xs"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="rounded-lg bg-[#de142a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#b90f22] transition border-0 cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <span>Search</span>
              </button>
            </form>

            {/* Quick Category Tags */}
            <div className="mb-4">
              <span className="text-[11px] font-bold text-gray-500 block mb-1.5">
                Popular Categories:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryQuickSearch(cat)}
                    className="rounded-full bg-[#fbf6ee] hover:bg-[#de142a] hover:text-white text-gray-800 text-xs font-semibold px-3 py-1 border border-[#eddcc6] transition cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Instant Search Suggestions */}
            {searchQuery.trim() && (
              <div className="border-t border-zinc-200 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-700">
                    Quick Results ({liveResults.length}):
                  </span>
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="text-xs font-semibold text-[#de142a] hover:underline bg-transparent border-0 cursor-pointer p-0"
                  >
                    View all in Shop &rarr;
                  </button>
                </div>

                {liveResults.length > 0 ? (
                  <div className="space-y-2">
                    {liveResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/shop-detail?id=${product.id}&size=Size%202`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-3 p-2 rounded-lg border border-zinc-200 hover:bg-[#fbf6ee] transition no-underline text-black group"
                      >
                        <div className="h-10 w-10 flex-shrink-0 bg-[#fbf6ee] p-1 flex items-center justify-center rounded overflow-hidden border border-zinc-200">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="h-full w-full object-contain group-hover:scale-105 transition"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold truncate group-hover:text-[#de142a]">
                              {product.name}
                            </span>
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#de142a] text-white">
                              {product.category}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-[#de142a]">
                            {typeof product.price === "number"
                              ? `₹${product.price.toFixed(2)}`
                              : String(product.price || "").startsWith("₹")
                                ? product.price
                                : `₹${product.price || 0}`}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-gray-500">
                    No matching items found. Press search to browse all items in shop.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
