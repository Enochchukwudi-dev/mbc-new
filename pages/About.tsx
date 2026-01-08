import React from 'react'
import Navbar from '../components/Navbar'

function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">About</h1>
          <p className="mt-4 text-gray-600">This is the About page.</p>
        </div>
      </main>
    </>
  )
}

export default About

