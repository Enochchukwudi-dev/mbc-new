"use client";
export const dynamic = "force-dynamic";


import Carousel1 from "./Carousel1";
import Image from "next/image";
import Link from "next/link";

import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import Trust from "@/pages/Trust";
import Featured from "@/pages/Featured";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8 pt-28 bg-stone-200 dark:bg-gray-900 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="mt-5 mb-4 md:mt-7 grid md:grid-cols-2 md:gap-2 gap-6 items-start">
            <section className="grid md:grid-cols-1 gap-6 items-center">
              <div className="max-w-xl">
                <h1
                  className="text-3xl sm:text-4xl md:text-4xl  lg:text-5xl font-semibold text-gray-900 dark:text-white"
                  style={{ lineHeight: "1.05" }}
                >
                  Quality
                  <span className="text-black font-bold">
                    {" "}
                    Construction
                  </span>{" "}
                  Delivered On Time & On Budget
                </h1>
                <p className="mt-3 text-sm md:text-xl md:mt-16 text-gray-700 dark:text-gray-300">
                  With 10+ years of experience, we deliver residential and
                  commercial projects that meet all safety standards, completed
                  on time and within budget.
                </p>

                <div className="mt-4 mb-3 flex gap-3">
                  <Link
                    href="/Booking"
                    className="inline-flex border border-gray-400 items-center px-4 py-2 bg-green-600 hover:text-green-900  hover:border-green-900 text-gray-50 rounded-md font-semibold shadow"
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
          <div className="mt-8 flex items-center justify-between mt-15 ">
            <div>
              <h2 className="text-xl font-semibold">Our Services</h2>
              <p className="text-xs text-gray-500">What we offer</p>
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
