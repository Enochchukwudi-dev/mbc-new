"use client";

import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg bg-white/80 dark:bg-gray-800 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 translate-x-0">
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-4 px-4 space-y-2">
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Home</a>
              <a href="#about" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">About</a>
              <a href="#gallery" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Gallery</a>
              <a href="#contact" className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">Contact</a>
            </nav>
          </aside>
        </div>
      )}
     
    </>
  );
}
