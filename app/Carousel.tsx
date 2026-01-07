"use client";

import React, { useRef, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Aurora Retreat",
    price: "$3,500,000",
    subtitle:
      "A sanctuary with timeless design and exceptional craftsmanship to inspire your next chapter.",
    image: "/a1.JPG",
    alt: "Aurora Retreat",
  },
  {
    id: 2,
    title: "Chuzzy Home Retreat",
    price: "$500,000",
    subtitle:
      "A sanctuary with timeless design and exceptional craftsmanship to inspire your next chapter.",
    image: "/a2.JPG",
    alt: "Chuzzy Home Retreat",
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

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    handleDelta(e.clientX - startX.current);
    startX.current = null;
    try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch {}
  };

  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    handleDelta(e.changedTouches[0].clientX - startX.current);
    startX.current = null;
  };

  return (
    <div
      className="relative w-full h-56 md:h-72 overflow-hidden rounded-2xl shadow-lg"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label="Featured properties carousel"
    >
      <div className="flex h-full transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s) => (
          <article
            key={s.id}
            className="flex-shrink-0 w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url('${s.image}')` }}
            role="img"
            aria-label={s.alt}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center bg-white text-sm font-semibold px-3 py-1 rounded-full shadow">{s.price}</div>
            </div>
            <div className="absolute bottom-0 left-0 w-full px-4">
              <div className="w-full md:w-3/4 lg:w-1/2 bg-gradient-to-b from-green-950/60 to-green-950/60 text-white px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md">
                <h3 className="text-base md:text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-xs text-gray-300 font-light">{s.subtitle}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 pointer-events-auto transition-opacity" style={{ opacity: 0 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/60"}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
