"use client";

import React, { useRef, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Aurora Retreat",
    price: "",
    subtitle:
      "A sanctuary with timeless design and exceptional craftsmanship to inspire your next chapter.",
    image: "/w1.jpeg",
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

export default function Carousel(): JSX.Element {
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
      className="relative w-full h-116 md:h-72 overflow-hidden rounded-2xl shadow-lg mb-12"
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
            <img
              src={s.image}
              alt={s.alt}
              className="w-full h-full object-cover block rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-0 w-full px-4">
              <div className="mx-auto text-center bg-gradient-to-b from-green-950/60 to-green-950/60 text-white px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md w-full md:w-3/4 lg:w-1/2">
                <h3 className="text-base md:text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="mt-1 text-xs text-gray-300 font-medium">
                  {s.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left / Right nav buttons */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-800 rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-800"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 16.293a1 1 0 010-1.414L15.586 11H5a1 1 0 110-2h10.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

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
