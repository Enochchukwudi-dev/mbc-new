"use client";
export const dynamic = "force-dynamic";


import Carousel1 from "./Carousel1";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import Trust from "@/pages/Trust";
import Featured from "@/pages/Featured";

export default function HomePage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const lightboxOverlayRef = useRef<HTMLDivElement | null>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightboxSrc(null)
    }
    if (lightboxSrc) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [lightboxSrc])

  useEffect(() => {
    if (lightboxSrc) lightboxCloseRef.current?.focus()
  }, [lightboxSrc])

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setIsDark(document.documentElement.classList.contains('dark'));
    // initialize from document element in case Navbar already set it
    update();

    // observe class changes on <html> so we pick up toggles from Navbar
    const observer = new MutationObserver(() => update());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // also handle theme changes from other tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme') update();
    };
    window.addEventListener('storage', onStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className={`min-h-screen py-8 pt-28 ${isDark ? 'bg-slate-900' : 'bg-amber-600/3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="mt-5 mb-4 md:mt-7 grid md:grid-cols-2 md:gap-2 gap-6 items-start">
            <section className="grid md:grid-cols-1 gap-6 items-center">
              <div className="max-w-xl">
                <h1
                  className={`text-3xl sm:text-4xl md:text-4xl  lg:text-5xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}
                  style={{ lineHeight: "1.05" }}
                >
                  Quality
                  <span className={`${isDark ? 'text-blue-400' : 'text-black'} font-bold`}>
                    {" "}
                    Construction
                  </span>{" "}
                  Delivered On Time & On Budget
                </h1>
                <p className={`mt-3 text-sm md:text-xl md:mt-16 ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                  With 10+ years of experience, we deliver residential and
                  commercial projects that meet all safety standards, completed
                  on time and within budget.
                </p>

                <div className="mt-4 mb-3 flex gap-3">
                  <Link
                    href="/Booking"
                    className={`inline-flex border border-gray-400 items-center px-4 py-2 ${isDark ? 'bg-blue-500' : 'bg-gray-900'} hover:text-green-900  hover:border-green-900 text-gray-50 rounded-md font-semibold shadow`}
                  >
                    Request a Free Quote
                  </Link>
                </div>
              </div>
            </section>

            {/* Carosuel */}
            <div>
              <Carousel1 />
            </div>
          </div>
          <div>
            <Trust />
          </div>
          <div>
            <Featured />
          </div>

          {/* Services */}
          <div id="services" className="mt-8  scroll-mt-28 flex flex-col items-center text-center mb-6">
            <h2 className="mt-2 text-3xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Our Services</h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-300">We manage every phase of a project with experienced oversight, quality materials, and clear communication so your build is durable and completed on time.</p>
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
                className="bg-[hsl(20,22%,95%)] text-white rounded-2xl shadow-lg overflow-hidden border border-[hsl(20,22%,85%)]"
              >
                <div className="relative h-48 w-full  shadow-lg">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                    <h3 className="text-xs font-semibold text-black">
                      {s.title}
                    </h3>
                    <div className="mt-4">
                      <button onClick={() => setLightboxSrc(s.img)} className="inline-flex items-center px-3 py-2 bg-gray-900 hover:bg-slate-600 rounded-md text-xs text-white">
                        View full image
                      </button>
                    </div>
                  </div>
              </article>
            ))}
          </div>

            {lightboxSrc && (
              <div
                ref={lightboxOverlayRef}
                role="dialog"
                aria-modal="true"
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={(e) => {
                  if (e.target === lightboxOverlayRef.current) setLightboxSrc(null)
                }}
              >
                <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="flex justify-end p-2">
                    <button
                      ref={lightboxCloseRef}
                      onClick={() => setLightboxSrc(null)}
                      aria-label="Close image"
                      className="px-3 py-1 text-sm rounded bg-red-400 text-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                  <div className="p-4 flex items-center justify-center">
                    <img src={lightboxSrc!} alt="Service image" className="w-full h-auto object-contain max-h-[80vh]" />
                  </div>
                </div>
              </div>
            )}
        </div>
      </main>
      <Footer />
    </>
  );
}
