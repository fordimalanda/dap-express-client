"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  originalPrice?: number;
  price: number;
}

export function ProductGallery({ images, productName, originalPrice, price }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gray-100 border border-gray-200/80 shadow-sm">
        {discount > 0 && (
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full bg-red-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md">
              -{discount}% Promo
            </span>
          </div>
        )}
        <div className="absolute right-4 top-4 z-10">
          <Badge variant="brand" className="bg-white/95 text-orange-600 shadow-sm backdrop-blur">
            Stock Limité 🔥
          </Badge>
        </div>
        {images && images.length > 0 ? (
          <img
            src={images[selectedIndex] || images[0]}
            alt={`${productName} - Vue ${selectedIndex + 1}`}
            className="h-full w-full object-cover object-center transition-all duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            Image indisponible
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-150 ${
                selectedIndex === idx
                  ? "border-[#FF6B00] ring-2 ring-[#FF6B00]/30 scale-95"
                  : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Miniature ${idx + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
