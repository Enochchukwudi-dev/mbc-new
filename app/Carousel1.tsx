"use client";

import React from "react";
import Image from "next/image";


const slides = [
  {
    id: 1,
    title: "Marock  Construction Enterprise",
    title2: "CAC Registered • 3492332",
    subtitle:
      "Registered & Verified Nigerian Const. Firm",
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
    <div className="relative w-full md:w-auto h-116 md:h-auto lg:h-[32rem] overflow-hidden  px-5">
      <div className="w-full md:w-auto h-full md:h-auto relative rounded-sm overflow-hidden">
        <div className="relative md:w-auto w-full md:h-auto">
          <Image src={s.image} alt={s.alt} width={1600} height={600} className="rounded-sm block mx-auto object-cover" />
        </div>
        <div className="absolute inset-0 " />
        <div className="absolute bottom-5 left-0 w-full px-1 ">
          <div
            className={
              `mx-auto text-center ${
                s.title.includes("MBC")
                  ? "bg-black/60"
                  : "bg-black/60"
              } text-white px-8 py-1 rounded-2xl shadow-lg backdrop-blur-md w-full md:w-4/4 lg:w-4/4`
            }
          >
            <h3 className="text-base md:text-lg font-semibold  py-1 rounded-lg ">
              {s.title}
            </h3>
            {s.title2 && (
             <p
               className={`mt-1 text-sm font-medium flex items-center mx-auto justify-center gap-2 ${s.title.includes("MBC") ? "text-white/90" : "text-gray-300"}`}
               
             >
               <Image src="/teek.svg" alt="teek" width={14} height={14} className="inline-block align-middle" />
               {s.title2}
             </p>
            )}
             
            <p className={`mt-4 text-sm font-light italic ${s.title.includes("MBC") ? "text-white/96" : "text-gray-300"}`}>
              {s.subtitle1}
            </p>
           
          </div>
        </div>
      </div>

    </div>
  );
}
