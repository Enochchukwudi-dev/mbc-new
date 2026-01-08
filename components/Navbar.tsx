import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react' 

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0  z-40 bg-gray-200 shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo (left) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-xl font-bold text-gray-900">
              <svg className="h-8 w-8 mr-2 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>MyLogo</span>
            </Link>
          </div>

          {/* Links (hidden on small, shown on md+) */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link href="/About" className="text-gray-700 hover:text-gray-900">About</Link>
            <Link href="/Gallery" className="text-gray-700 hover:text-gray-900">Gallery</Link>
            <Link href="/Booking" className="text-gray-700 hover:text-gray-900">Contact</Link>
          </div>

          {/* Hamburger (shown on small, hidden on md) */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {open ? (
                <X className="h-6 w-6 text-gray-800" />
              ) : (
                <Menu className="h-6 w-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu (md:hidden) - fixed off-canvas panel that slides in from the right */}
        <div className={`md:hidden fixed top-16 right-0 z-50 w-full  bottom-0 bg-white shadow-lg transform transition-transform duration-400 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`} aria-hidden={!open}>
          <div className="py-4 px-4 space-y-1">
            <Link href="/" onClick={() => setOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</Link>
            <Link href="/About" onClick={() => setOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">About</Link>
            <Link href="/Gallery" onClick={() => setOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">Gallery</Link>
            <Link href="/Booking" onClick={() => setOpen(false)} className="block px-2 py-2 text-gray-700 hover:bg-gray-100 rounded">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar