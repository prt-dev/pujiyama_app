"use client";

import React from "react";

export interface LoadingProps {
  message?: string;
  variant?: "fullscreen" | "container" | "inline" | "web" | "admin";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Loading({
  message = "Loading...",
  variant = "fullscreen",
  size = "md",
  className = "",
}: LoadingProps) {
  const isFullscreen = variant === "fullscreen" || variant === "web" || variant === "admin";

  // Sizing definitions for the sacred logo and glow rings
  const sizeMap = {
    sm: {
      container: "w-20 h-20",
      logo: "w-14",
      spinner: "w-16 h-16",
      text: "text-[10px]",
    },
    md: {
      container: "w-28 h-28",
      logo: "w-20",
      spinner: "w-24 h-24",
      text: "text-xs",
    },
    lg: {
      container: "w-36 h-36",
      logo: "w-28",
      spinner: "w-32 h-32",
      text: "text-sm",
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`flex flex-col items-center justify-center transition-all duration-300 ${isFullscreen
        ? "min-h-screen w-full bg-white/95 fixed inset-0 z-50 p-4"
        : "w-full py-12 px-4"
        } ${className}`}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Glowing Pulsing Circle */}
        <div
          className={`relative flex items-center justify-center ${currentSize.container}`}
        >
          {/* Soft Sacred Crimson Aura */}
          <div className="absolute inset-0 rounded-2xl bg-[#de142a]/20 opacity-70 animate-ping blur-md pointer-events-none" />
          <div className="absolute -inset-2 rounded-2xl bg-[#de142a]/25 opacity-80 animate-pulse blur-sm pointer-events-none" />

          {/* Logo Container */}
          <div className="relative z-10 flex items-center justify-center p-3 rounded-2xl bg-[#0a0a0a] border border-[#de142a]/35 shadow-lg">
            <img
              src="/assets/logo.png"
              alt="Pujyama"
              className={`${currentSize.logo} h-auto object-contain transition-transform duration-500 animate-pulse`}
            />
          </div>
        </div>

        {/* Loading Devotional Message */}
        {message && (
          <p
            className={`heading-font mt-3 font-bold tracking-wider uppercase text-[#de142a] animate-pulse ${currentSize.text}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
