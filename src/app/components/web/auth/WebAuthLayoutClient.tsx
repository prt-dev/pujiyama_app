"use client";

import React from "react";

interface WebAuthLayoutClientProps {
  children: React.ReactNode;
}

export default function WebAuthLayoutClient({ children }: WebAuthLayoutClientProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fbf6ee] via-white to-[#fbf6ee] py-12 px-4">
      <main className="w-full flex items-center justify-center">{children}</main>
    </div>
  );
}
