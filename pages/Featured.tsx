

import React, { useEffect, useRef, useState } from 'react'

export default function Featured() {
  const projects = [
    { src: '/projects/p1.jpg', title: 'Modern Family Home', desc: 'Full renovation — kitchen, bath & floors' },
    { src: '/projects/p2.jpg', title: 'Cozy Bungalow', desc: 'Extension and roof replacement' },
    { src: '/projects/p3.jpg', title: 'Commercial Fit-out', desc: 'Office refit with premium finishes' },
    { src: '/projects/p4.jpg', title: 'Luxury Bathroom', desc: 'High-end tiles and fixtures' },
  ]

  const [index, setIndex] = useState(0)
  const slides = projects.length
  const sliderRef = useRef<HTMLDivElement | null>(null)

  // drag/swipe state
  const startX = useRef<number | null>(null)
  const isDown = useRef(false)
  const [dragOffset, setDragOffset] = useState(0)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % slides)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + slides) % slides)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [slides])

  function prev() {
    setIndex((i) => (i - 1 + slides) % slides)
  }
  function next() {
    setIndex((i) => (i + 1) % slides)
  }

  function onPointerDown(e: React.PointerEvent) {
    isDown.current = true
    startX.current = e.clientX
    setDragOffset(0);
    (e.target as Element).setPointerCapture?.(e.pointerId)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDown.current || startX.current == null) return
    const delta = e.clientX - startX.current
    setDragOffset(delta)
  }

  function endDrag(e?: React.PointerEvent) {
    if (!isDown.current) return
    isDown.current = false
    const delta = dragOffset
    setDragOffset(0);
    const threshold = 50 // px
    if (delta < -threshold) next()
    else if (delta > threshold) prev()
  }

  function onPointerUp(e: React.PointerEvent) {
    endDrag(e);
    (e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  function onPointerCancel() {
    endDrag()
  }

  return (
    <section className="py-12 bg-gray-50/40 dark:bg-gray-900 rounded-2xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className="mt-2 text-3xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-300">Real projects that reflect our attention to detail, clear communication, and the measurable value we deliver from first sketch to final handover.</p>
        </div>

        <div ref={sliderRef} className="relative">
          <div className="overflow-hidden rounded-2xl touch-pan-y" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerCancel}>
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(calc(-${index * 100}% + ${dragOffset}px))` }}>
              {projects.map((p) => (
                <figure key={p.src} className="min-w-full flex-shrink-0 p-4">
                  <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md">
                    <img src={p.src} alt={p.title} className="w-full h-72 object-cover" draggable={false} />
                    <div className="p-4">
                      <div className="font-semibold text-lg text-gray-900 dark:text-white">{p.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">{p.desc}</div>
                      <div className="mt-4">
                        <a href={p.src} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-green-700">View project</a>
                      </div>
                    </div>
                  </div>
                </figure>
              ))}
            </div>

            {/* overlay controls */}
            <button aria-label="Previous" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/80 dark:bg-gray-800/80 shadow z-10 hover:bg-white dark:hover:bg-gray-700">
              ‹
            </button>
            <button aria-label="Next" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/80 dark:bg-gray-800/80 shadow z-10 hover:bg-white dark:hover:bg-gray-700">
              ›
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} className={`w-2 h-2 rounded-full ${i === index ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'}`}></button>
            ))}
          </div>
        </div>

        
      </div>
    </section>
  )
}
