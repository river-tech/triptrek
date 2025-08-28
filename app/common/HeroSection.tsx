"use client";

import React, { ReactNode } from "react";

type HeroSectionProps = {
  backgroundUrl: string;
  heightClass?: string;
  children: ReactNode;
};

export default function HeroSection({ backgroundUrl, heightClass = "h-[600px]", children }: HeroSectionProps) {
  return (
    <section
      className={`relative ${heightClass} flex items-center justify-center text-white`}
      style={{
        backgroundImage: `url('${backgroundUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full px-4 max-w-5xl">
        {children}
      </div>
    </section>
  );
}
