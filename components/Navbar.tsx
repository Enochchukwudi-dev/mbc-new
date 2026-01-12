import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-22 z-40 bg-[hsl(20,22%,94%)] shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex  items-center justify-between h-16">
          {/* Logo (left) */}
          <div className="flex items-center  flex-col pt-8 ">
            <Link
              href="/"
              className="flex flex-col items-center text-gray-900"
            >
              <Image src="/gala.png" alt="MyLogo" width={79} height={79} className="h-9 w-28 object-contain filter brightness-102" />
              <div className="mt-1 text-center md:text-left">
                <span className="block font-bold" style={{ fontSize: '11px', lineHeight: 1 }}>
                  MAROCK BUILDING CONSTRUCTION
                </span>
                <span className="block font-bold" style={{ fontSize: '11px', lineHeight: 1 }}>
                  ENTERPRISE
                </span>
              </div>
            </Link>
          </div>

          {/* Links (hidden on small, shown on md+) */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-900 hover:text-gray-900">
              Home
            </Link>
            <Link href="/About" className="text-gray-900 hover:text-gray-900">
              About
            </Link>
            <Link href="/Gallery" className="text-gray-900 hover:text-gray-900">
              Gallery
            </Link>
            <Link href="/Booking" className="text-gray-900 hover:text-gray-900">
              Contact
            </Link>
          </div>

          {/* Menu (shown on small, hidden on md) */}
          <div className="md:hidden mt-7 mr-3">
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="p-1 rounded-full relative z-60  flex items-center justify-center"
            >
              {open ? (
                <X className="h-10 w-12 text-gray-900" strokeWidth={1.5} />
              ) : (
                <Menu className="h-10 w-12 text-gray-900" strokeWidth={1.5} />
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
          <div className="py-6 px-6 flex flex-col h-full">
            <div className="flex-1 space-y-2">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-5 text-lg font-semibold text-gray-900 hover:bg-gray-100 rounded"
              >
                <span>Home</span>
                <ChevronRight className="h-5 w-5 text-gray-900" />
              </Link>

              <Link
                href="/About"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-5 text-lg font-semibold text-gray-900 hover:bg-gray-100 rounded"
              >
                <span>About</span>
                <ChevronRight className="h-5 w-5 text-gray-900" />
              </Link>

              <Link
                href="/Gallery"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-5 text-lg font-semibold text-gray-900 hover:bg-gray-100 rounded"
              >
                <span>Projects</span>
                <ChevronRight className="h-5 w-5 text-gray-900" />
              </Link>

              <Link
                href="/#services"
                onClick={(e) => {
                  setOpen(false);
                  if (typeof window !== 'undefined' && window.location.pathname === '/') {
                    e.preventDefault();
                    const el = document.getElementById('services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center justify-between px-4 py-5 text-lg font-semibold text-gray-900 hover:bg-gray-100 rounded"
              >
                <span>Services</span>
                <ChevronRight className="h-5 w-5 text-gray-900" />
              </Link>
              <div className="mt-6">
              <Link
                href="/Booking"
                onClick={() => setOpen(false)}
                className="block w-full bg-gray-900 text-white py-3 rounded-md text-center font-semibold shadow-sm"
              >
                Book Us
              </Link>
            </div>
            </div>

            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
