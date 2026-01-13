"use client";
import React from "react";
import Image from "next/image";
const slides = [
  {
    id: 1,
    title: "Marock  Construction Enterprise",
    title2: "CAC Registered • 3492332",
    subtitle1:
      "Led by Engr.  Uchemba",
    image: "/enginner.jpeg",
    alt: "Aurora Retreat",
  },
];

export default function Carousel() {
  // Slider/carousel behavior removed — render a single static slide
  const s = slides[0];

  return (
    <div className="relative w-full md:w-auto h-116 md:h-[700px] lg:h-[800px] md:mb-7 overflow-hidden px-5">
      <div className="w-full md:w-auto h-full md:h-[700px] lg:h-[800px] relative rounded-sm overflow-hidden">
        <div className="relative md:w-auto w-full h-full">
          <Image src={s.image} alt={s.alt} fill className="rounded-sm object-cover" />
        </div>
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute bottom-5 left-0 w-full px-1 z-20 md:bottom-6 lg:bottom-10">
          <div
            className={
              "mx-auto text-center bg-slate-950/70 text-white/90 px-2 md:px-10 lg:px-14 py-2 md:py-3 lg:py-4 rounded-2xl shadow-lg backdrop-blur-md w-full md:w-full lg:w-full max-w-3xl"
            }
          >
            <h3 className="text-base md:text-lg lg:text-xl font-extrabold text-slate-100 py-1 md:py-2 rounded-lg">
              {s.title}
            </h3>
            {s.title2 && (
             <p
               className={`mt-1 text-sm font-semibold flex items-center mx-auto justify-center gap-2 ${s.title.includes("MBC") ? "text-white/90" : "text-gray-300"}`}
               
             >
               <Image src="/teek.svg" alt="teek" width={14} height={14} className="inline-block align-middle" />
               {s.title2}
             </p>
            )}
             
            <p className={`mt-4 text-sm font-light  ${s.title.includes("MBC") ? "text-white/96" : "text-gray-300"}`}>
              {s.subtitle1}
            </p>
           
          </div>
        </div>
      </div>

    </div>
  );
}
