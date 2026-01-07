"use client";
export const dynamic = "force-dynamic";

import Carousel from "./Carousel";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen py-8 bg-gray-200 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <header className="flex items-start justify-between gap-4 ">
          <div className="flex items-center gap-4 ">
            <div className="flex flex-col ">
              <span className="text-sm text-gray-500">Good morning</span>
              <span className="text-lg font-semibold">Shahzaib Ahmad</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800 shadow-sm"
            >
              <Image src="/bell.svg" width={22} height={22} className="h-6 w-6" alt="Notifications" />
            </button>
          </div>
        </header>

        {/* Search */}
        <div className="mt-6">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386-1.414 1.415-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              id="search"
              placeholder="Find something now"
              className="block w-full rounded-xl border border-transparent bg-white/90 dark:bg-gray-800 py-3 pl-10 pr-4 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:border-gray-900"
            />
          </div>
        </div>

        {/* Section header */}
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Popular For you</h2>
          <a className="text-sm text-gray-500 hover:underline cursor:hover" >View all</a>
        </div>

        {/* Cards grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Carousel of two featured cards */}
            <Carousel />
          </div>

          {/* Secondary card */}
          <article
            className="relative rounded-2xl overflow-hidden shadow-lg h-56 md:h-72 bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=60')` }}
            role="img"
            aria-label="Palmview Estate"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <div className="inline-flex items-center bg-white text-sm font-semibold px-3 py-1 rounded-full shadow">$1,500</div>
            </div>

            <button className="absolute top-4 right-4 p-2 rounded-lg bg-white/80">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 3a2 2 0 00-2 2v12l7-4 7 4V5a2 2 0 00-2-2H5z" />
              </svg>
            </button>

            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold">Palmview Estate</h3>
              <p className="mt-1 text-sm text-white/90">Cinematic showcase for tropical living.</p>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
