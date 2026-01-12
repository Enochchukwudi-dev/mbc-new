import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'

function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-20 bg-gray-50 flex items-start justify-center">
        <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="md:flex md:items-stretch">
              <div className="md:w-1/2 bg-[hsl(20,22%,98%)] p-6 flex items-center justify-center">
                <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-md">
                  <Image src="/team.jpeg" alt="hero" width={640} height={480} className="w-full h-64 sm:h-72 md:h-80 object-cover" />
                </div>
              </div>

              <div className="md:w-1/2 px-6 py-8 bg-[hsl(20,22%,98%)] text-left">
                <h2 className="text-lg font-medium text-gray-700">MBC group, Anambra State, 2024</h2>
                <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-gray-900">About Us</h1>
                <p className="mt-3 text-sm sm:text-base text-gray-700">
                  Marock Building Construction Enterprise (MBC) is a full-service construction firm with over a decade of experience delivering high-quality residential and commercial projects across Anambra State and the surrounding regions.<br /><br />
                  We manage every phase of the build process, from initial planning and permitting through structural works, roofing, waterproofing, interior/exterior finishing, and final inspections, ensuring projects are completed on time and within budget.<br /><br />
                  Our team of experienced project managers, engineers, and skilled tradespeople prioritize safety, durability, and long-term value by using proven methods and premium materials. We pride ourselves on transparent pricing, responsive communication, and collaborative partnerships with clients, architects, and subcontractors.<br /><br />
                  Whether you need a new build, renovation, or specialist structural and waterproofing work, MBC brings local expertise, professional oversight, and a commitment to excellence to every project. Contact us to schedule a consultation and let us help bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default About

