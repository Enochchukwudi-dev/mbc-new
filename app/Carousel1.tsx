"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "MBC Building Const. Enterprise",
    title2: "RC NO: 3492332",
    subtitle:
      "Led by Engr. Chukwudi Uchemba",
    image: "/enginner.jpeg",
    alt: "Aurora Retreat",
  },
  {
    id: 2,
    title: "Aurora Retreat",
    price: "",
    subtitle:
      "A sanctuary with timeless design and exceptional craftsmanship to inspire your next chapter.",
    image: "/w2.jpeg",
    alt: "Aurora Retreat",
  },
  {
    id: 3,
    title: "Aurora Retreat",
    price: "",
    subtitle:
      "A sanctuary with timeless design and exceptional craftsmanship to inspire your next chapter.",
    image: "/w3.jpeg",
    alt: "Aurora Retreat",
  },
  {
    id: 4,
    title: "Aurora Retreat",
    price: "",
    subtitle:
      "A sanctuary with timeless design and exceptional craftsmanship to inspire your next chapter.",
    image: "/w4.jpeg",
    alt: "Aurora Retreat",
  },
  {
    id: 5,
    title: "Aurora Retreat",
    price: "",
    subtitle:
      "A sanctuary with timeless design and exceptional craftsmanship to inspire your next chapter.",
    image: "/w5.jpeg",
    alt: "Aurora Retreat",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);

  const handleDelta = (dx: number) => {
    const THRESH = 50;
    if (dx > THRESH) setIndex((i) => (i - 1 + slides.length) % slides.length);
    else if (dx < -THRESH) setIndex((i) => (i + 1) % slides.length);
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current == null) return;
    handleDelta(e.clientX - startX.current);
    startX.current = null;
    try {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const onTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    handleDelta(e.changedTouches[0].clientX - startX.current);
    startX.current = null;
  };

  return (
    <div
      className="relative w-full h-106 md:h-72 overflow-hidden  mb-12"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Carousel"
    >
      <div
        className="flex h-full transition-transform duration-700"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <div
            key={s.id}
            className="flex-shrink-0 w-full h-full relative rounded-2xl overflow-hidden"
          >
            <div className="relative w-full h-full flex items-center justify-center ">
              <Image
                src={s.image}
                alt={s.alt}
                width={1200}
                height={800}
                className="object-contain max-w-full max-h-full rounded-2xl"
              />
            </div>
            <div className="absolute inset-0 " />
            <div className="absolute bottom-6 left-0 w-full px-4">
              <div
                className={
                  `mx-auto text-center ${
                    s.title.includes("MBC")
                      ? "bg-blue-gray/20"
                      : "bg-gradient-to-b from-green-950/60 to-green-950/60"
                  } text-white px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md w-full md:w-3/4 lg:w-1/2`
                }
              >
                <h3 className="text-base md:text-lg font-semibold bg-black/20 py-1 rounded-lg ">
                  {s.title}
                </h3>
                {s.title2 && (
                  <p className={`mt-1 text-sm font-medium ${s.title.includes("MBC") ? "text-white/90" : "text-gray-300"}`}>
                    {s.title2}
                  </p>
                )}
                <p className={`mt-1 text-xs font-light ${s.title.includes("MBC") ? "text-white/96" : "text-gray-300"}`}>
                  {s.subtitle}
                </p>
              </div>
              <div className="mt-4 flex flex-row items-center gap-1 mb-4">
                {s.title.includes("MBC") && (
                  <Link href="/projects" className="w-45 mx-auto text-center px-3 py-2 bg-blue-600/10 border border-gray-200 hover:bg-blue-700 text-white text-sm font-semibold rounded-md shadow inline-flex items-center justify-center">
                    <Image src="/build.svg" alt="Build" width={18} height={18} className="inline-block mr-2 filter invert" />
                    View Our Projects
                  </Link>
                )}
               
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
