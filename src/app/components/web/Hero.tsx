"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  link: string;
  ctaText: string;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    image: "/assets/banners/banner-navratri.png",
    title: "नवरात्रि संग्रह - दिव्य आरंभ के लिए",
    subtitle: "संपूर्ण नवरात्रि पूजा किट, मूर्ति, चुनरी, पूजा सामग्री, प्रसाद एवं अन्य आवश्यक वस्तुएँ",
    link: "/shop?category=Combo%20Packs",
    ctaText: "अभी खरीदें (Shop Now)",
  },
  {
    id: 2,
    image: "/assets/banners/banner-agarbatti.png",
    title: "Your Pooja Space, Blessed with Pujyaama Agarbatti",
    subtitle: "Pure Chandan, Mogra & Guggal Divine Fragrance Experience",
    link: "/shop",
    ctaText: "Discover Now →",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left -> next
        nextSlide();
      } else {
        // Swiped right -> prev
        prevSlide();
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden select-none bg-neutral-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Pujyama Featured Banner Slider"
    >
      {/* Slider Viewport */}
      <div className="relative w-full aspect-[1024/374] min-h-[170px] sm:min-h-[260px] md:min-h-[340px] lg:min-h-[420px] max-h-[580px] overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Link
                href={slide.link}
                className="block relative w-full h-full cursor-pointer focus:outline-none"
                title={`${slide.title} - ${slide.ctaText}`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                  className="w-full h-full object-cover sm:object-contain md:object-cover transition-transform duration-1000 ease-out hover:scale-[1.01]"
                />
              </Link>
            </div>
          );
        })}

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 shadow-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 focus:outline-none"
          aria-label="Previous Banner Slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 shadow-md transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 focus:outline-none"
          aria-label="Next Banner Slide"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Bottom Pagination Dots */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-xs border border-white/10">
          {slides.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                  isActive
                    ? "w-7 sm:w-8 h-2 sm:h-2.5 bg-[#de142a] shadow-xs"
                    : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
