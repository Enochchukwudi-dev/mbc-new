import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-22 z-40 bg-stone-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex  items-center justify-between h-16">
          {/* Logo (left) */}
          <div className="flex items-center flex-col pt-8 ">
            <Link
              href="/"
              className="flex flex-col items-center text-gray-900"
            >
              <Image src="/gala.png" alt="MyLogo" width={79} height={79} className="h-8 w-28 object-contain" />
              <div className="mt-1 items-start">
                <span className="block" style={{ fontSize: '10px', lineHeight: 1 }}>
                  MAROCK BUILDING CONST.
                </span>
                <span className="block" style={{ fontSize: '10px', lineHeight: 1 }}>
                  ENTERPRISES
                </span>
              </div>
            </Link>
          </div>

          {/* Links (hidden on small, shown on md+) */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/About" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/Gallery" className="text-gray-700 hover:text-gray-900">
              Gallery
            </Link>
            <Link href="/Booking" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </div>

          {/* Hamburger (shown on small, hidden on md) */}
          <div className="md:hidden mt-6">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 relative z-60"
            >
              {open ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu (md:hidden) - fixed off-canvas panel that slides in from the right */}
        <div
          className={`md:hidden fixed top-0  pt-15 right-0 z-50 w-full  bottom-0 bg-white shadow-lg transform transition-transform  duration-700 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!open}
        >
          <div className="py-4 px-7 space-y-5">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Home
            </Link>
            <Link
              href="/About"
              onClick={() => setOpen(false)}
              className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              About
            </Link>
            <Link
              href="/Gallery"
              onClick={() => setOpen(false)}
              className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Gallery
            </Link>
            <Link
              href="/Booking"
              onClick={() => setOpen(false)}
              className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
             Book Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
