"use client";
export const dynamic = "force-dynamic";

import Carousel from "./Carousel";
import Carousel1 from "./Carousel1";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 pt-28 bg-stone-200 dark:bg-gray-900 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
           <section className="mt-5 mb-4 grid md:grid-cols-2 gap-6 items-center">
            <div className="max-w-xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white" style={{ lineHeight: '1.05' }}>
                Quality 
              <span className="text-black font-bold"> Construction</span> Delivered On Time & On Budget
              </h1>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            With 10+ years of experience, we deliver residential and commercial projects that meet all safety standards, completed on time and within budget.
              </p>

              <div className="mt-4 mb-3 flex gap-3">
                <Link href="/Booking" className="inline-flex border border-gray-400 items-center px-4 py-2 bg-green-600 hover:text-green-900  hover:border-green-900 text-gray-50 rounded-md font-semibold shadow">
                  Request a Free Quote
                </Link>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="relative h-60 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <Image src="/conc7.jpeg" alt="Completed project" fill className="object-cover" />
              </div>
            </div>
          </section>

          {/* Carosuel */}
          <Carousel1 />

          {/* Gallery */}
          <div className="mt-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Gallery</h2>
              <p className="text-xs text-gray-500">
                Completed projects and architectural Design
              </p>
            </div>

            <Link
              href="/Gallery"
              className="text-sm text-gray-500 hover:underline"
            >
              View all
            </Link>
          </div>

          {/* Cards grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {/* Carousel of two featured cards */}
              <Carousel />
            </div>

             {/* Videos */}
          <div className="mt-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Reels</h2>
              <p className="text-xs text-gray-500">
               Videos of Completed projects 
              </p>
            </div>

            <Link
              href="/Gallery"
              className="text-sm text-gray-500 hover:underline"
            >
              View all
            </Link>
          </div>

            {/* video card (two autoplaying reels) */}
            <article
              className="relative rounded-2xl overflow-hidden shadow-lg h-56 md:h-72"
              role="region"
              aria-label="Palmview Estate videos"
            >
              <div className="grid grid-cols-2 h-full">
                <div className="relative w-full h-56 md:h-72">
                  <video
                    src="/house1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative w-full h-56 md:h-72">
                  <video
                    src="/podcast2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    preload="metadata"
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-4 left-4">
               
              </div>

              <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v12l7-4 7 4V5a2 2 0 00-2-2H5z" />
                </svg>
              </button>

              <div className="absolute inset-x-0 bottom-6 flex justify-center">
                <Link href="/Gallery#videos" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M4.5 3.5a1 1 0 011.5-.86l10 6.5a1 1 0 010 1.72l-10 6.5A1 1 0 014.5 16.5V3.5z" />
                  </svg>
                  Watch Reels
                </Link>
              </div>
            </article>
          </div>


          {/* Services */}
          <div className="mt-8 flex items-center justify-between mt-15 ">
            <div>
              <h2 className="text-xl font-semibold">Our Services</h2>
              <p className="text-xs text-gray-500">
                What we offer
              </p>
            </div>
          </div>

          {/* Services grid */}
          <div className="mt-6 grid grid-cols-2 h-full  sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                img: "/conc7.jpeg",
                title: "Structural Building Construction",
              },
              {
                img: "/roof2.jpeg",
                title: "Roofing Systems Installation",
   
              },
              {
                img: "/felt2.jpeg",
                title: "Felting & Waterproofing Solutions",
       
              },
              {
                img: "/conc2.jpeg",
                title: "Concrete & Reinforcement Works",
   
              },
               {
                img: "/conc1.jpeg",
                title: "Mansory & Block Works",
   
              },
               {
                img: "/inte3.jpeg",
                title: "Interior & Exterior Finishing",
   
              },
               {
                img: "/inte4.jpeg",
                title: "Flooring, Tiling & Paving",
   
              },
               {
                img: "/inte6.jpeg",
                title: "Construction Project Supervision",
   
              },
            ].map((s, i) => (
              <article
                key={i}
                className="bg-gray-300 text-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="relative h-48 w-full  shadow-lg">
                  <Image src={s.img} alt={s.title} fill className="object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-semibold text-black">{s.title}</h3>
                  <div className="mt-4">
                    <button className="inline-flex items-center px-3 py-2 bg-slate-700/95 hover:bg-slate-600 rounded-md text-xs text-white">
                      View full image
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
