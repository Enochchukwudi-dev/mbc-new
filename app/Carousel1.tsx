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
    <div className="relative w-full h-116 md:h-96 lg:h-[32rem] overflow-hidden mb-12 px-5" >
      <div className="w-full h-full relative rounded-2xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image src={s.image} alt={s.alt} fill className="object-cover rounded-2xl" />
        </div>
        <div className="absolute inset-0 " />
        <div className="absolute bottom-6 left-0 w-full px-4">
          <div
            className={
              `mx-auto text-center ${
                s.title.includes("MBC")
                  ? "bg-black/60"
                  : "bg-black/60"
              } text-white px-4 py-3 rounded-2xl shadow-lg backdrop-blur-md w-full md:w-3/4 lg:w-1/2`
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
             
            <p className={`mt-5 text-sm font-light italic ${s.title.includes("MBC") ? "text-white/96" : "text-gray-300"}`}>
              {s.subtitle1}
            </p>
           
          </div>
        </div>
      </div>

     
    </div>
  );
}
