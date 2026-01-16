"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Building2, FileText, UserStar, ChevronLeft, ChevronRight } from 'lucide-react';
const slides = [
  {

    id: 1,
    title: "Marock  Construction Enterprise",
    title2: "CAC Registered • 3492332",
    subtitle1: "Led by Engr.  Marshal Uzor",
    image: "/boss.jpeg",
    alt: "Aurora Retreat",
  },
  {
    id: 2,
    title: "Marock  Construction Enterprise",
    title2: "CAC Registered • 3492332",
    subtitle1: "Led by Engr.  Marshal Uzor",
    image: "/tolo.jpeg",
    alt: "Tolo",
  },
  {
    id: 3,
    title: "Marock  Construction Enterprise",
    title2: "CAC Registered • 3492332",
    subtitle1: "Led by Engr.  Marshal Uzor",
    image: "/s7.jpeg",
    alt: "Tolo",
  },
];
export default function Carousel() {
  // Slider/carousel behavior removed — render a single static slide
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setIsDark(document.documentElement.classList.contains('dark'));
    update();

    const observer = new MutationObserver(() => update());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onStorage = (e: StorageEvent) => { if (e.key === 'theme') update(); };
    window.addEventListener('storage', onStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const [index, setIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const s = slides[index];

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3500);
    return () => clearInterval(id);
  }, [isPaused]);

  const prevSlide = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="relative w-full md:w-auto h-116 md:h-[700px] lg:h-[800px] md:mb-7 px-5">
      <div className="w-full md:w-auto h-full md:h-[700px] lg:h-[800px] relative rounded-sm overflow-hidden">
        <div className="relative md:w-auto w-full h-full">
          <Image src={s.image} alt={s.alt} fill className="rounded-sm object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/20 z-10" />
        <button aria-label="Previous" onClick={prevSlide} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white rounded-full p-2 hover:bg-black/50">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button aria-label="Next" onClick={nextSlide} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/30 text-white rounded-full p-2 hover:bg-black/50">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mt-4 px-1 w-full z-20 md:mt-6 lg:mt-10">
        <div
          className={
            `mx-auto text-center px-2 md:px-10 lg:px-14 py-2 md:py-3 lg:py-4 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-3xl ${isDark ? 'bg-slate-900 text-white' : 'bg-amber-900/5 text-black/90'}`
          }
        >
          <h3 className={`text-base mb-4 md:text-lg shadow-amber-900/40 lg:text-xl font-semibold ${isDark ? 'text-white' : ' text-black'} py-1 md:py-2 rounded-lg shadow-sm`}>
            <Building2 className={`${isDark ? 'text-yellow-200/80' : 'text-amber-700'} w-5 h-5 inline-block mr-2`} />
            {s.title}
          </h3>
          {s.title2 && (
           <p
             className={`mt-1 mb-4 pb-2 text-base font-normal shadow-sm shadow-amber-900/20 flex items-center mx-auto justify-center gap-1 ${isDark ? 'text-white' : ' text-gray-800'}`}
           >
             <FileText className={`${isDark ? 'text-yellow-200/80' : 'text-amber-700'} w-6 h-6`} />
             {(() => {
               const m = s.title2.match(/(.*?)(\d+)(.*)/);
               if (m) {
                 return (
                   <>
                     <span>{m[1]}</span>
                     <strong className={isDark ? 'text-blue-300 font-bold' : 'text-amber-700 font-semibold'}>{m[2]}</strong>
                     <span>{m[3]}</span>
                   </>
                 );
               }
               return <span>{s.title2}</span>;
             })()}
           </p>
          )}
           
          <p className={`mt-4 text-sm font-light flex items-center justify-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>
            <UserStar className={`${isDark ? 'text-yellow-200/80' : 'text-amber-700'} w-6 h-6 mr-2`} />
            {s.subtitle1}
          </p>
         
        </div>
      </div>
    </div>
  );
}
