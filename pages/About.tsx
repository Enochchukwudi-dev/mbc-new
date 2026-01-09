import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'

function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-20 bg-gray-50 flex items-start justify-center">
        <div className="w-full max-w-md px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-b from-blue-400 to-white pt-6 pb-10 flex flex-col items-center">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image src="/conc1.jpeg" alt="hero" width={320} height={320} className="object-cover" />
              </div>
              <h2 className="mt-4 text-lg text-white/90">About Us</h2>
            </div>

            <div className="px-6 py-8 text-center">
              <h1 className="text-xl font-semibold text-gray-900">About Us</h1>
              <p className="mt-3 text-sm text-gray-500">Enjoy a seamless and transparent auction experience where users can explore exclusive assets.</p>

              <div className="mt-6">
                <button className="w-48 mx-auto block px-4 py-2 bg-blue-600 text-white rounded-full shadow">Get Started</button>
              </div>

              <p className="mt-6 text-xs text-gray-400">Swipe up for filters</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default About

