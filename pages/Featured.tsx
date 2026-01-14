

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

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

  // derived boolean for whether a drag is active (fixes missing reference)
  const isDraggingState = isDown.current

  // small local state for "coming soon" dialog (prevents ReferenceError when button is clicked)
  const [showComingSoon, setShowComingSoon] = useState(false)

  // track whether page is in dark mode (from document class or prefers-color-scheme)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const m = window.matchMedia('(prefers-color-scheme: dark)')
    const check = () => setIsDark(document.documentElement.classList.contains('dark') || m.matches)
    check()
    const handler = () => check()
    if (m.addEventListener) m.addEventListener('change', handler)
    else m.addListener(handler)
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      if (m.removeEventListener) m.removeEventListener('change', handler)
      else m.removeListener(handler)
      observer.disconnect()
    }
  }, [])

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
    <section className={`py-12 bg-gray-50/40 ${isDark ? 'bg-slate-900/2' : 'bg-gray-50/40'} rounded-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-6">
          <h2 className={`mt-2 text-3xl sm:text-2xl font-semibold tracking-tight ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Featured Projects</h2>
          <p className={`mt-3 max-w-2xl mx-auto text-sm ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>Real projects that reflect our attention to detail, clear communication, and the measurable value we deliver from first sketch to final handover.</p>
        </div>
         <section className={`py-12 ${isDark ? 'bg-slate-900/70' : 'bg-[hsl(20,22%,85%)]'} rounded-2xl `}>
                     <div className="w-full">
                       <div ref={sliderRef} className="relative">
                         <div
                           className="overflow-hidden rounded-2xl touch-pan-y"
                           onPointerDown={onPointerDown}
                           onPointerMove={onPointerMove}
                           onPointerUp={onPointerUp}
                           onPointerCancel={onPointerCancel}
                         >
                           <div
                             className="flex transition-transform duration-500"
                             style={{
                               transform: `translateX(calc(-${
                                 index * 100
                               }% + ${dragOffset}px))`,
                               transition: isDraggingState ? "none" : undefined,
                             }}
                           >
                             {projects.map((p) => (
                               <figure
                                 key={p.src}
                                 className="min-w-full flex-shrink-0 p-4 flex justify-center"
                               >
                                 <div className="relative overflow-hidden rounded-2xl bg-white  shadow-md w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
                                   <div className="relative h-48 sm:h-56 md:h-72 lg:h-96">
                                     <Image
                                       src={p.src}
                                       alt={p.title}
                                       fill
                                       className="object-cover"
                                       draggable={false}
                                     />
                                   </div>
         
                                   <div className={`p-4 ${isDark ? 'bg-slate-300' : 'bg-white'}`}>
                                     <div className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900">
                                       {p.title}
                                     </div>
                                     <div className={`text-sm text-gray-500 ${isDark ? 'text-gray-700' : 'text-gray-500'} mt-1`}>
                                       {p.desc}
                                     </div>
                                     <div className="mt-4">
                                       <button
                                         onClick={() => setShowComingSoon(true)}
                                         className={`inline-block px-4 py-2 md:px-6 md:py-3 ${isDark ? 'bg-yellow-200/70' : 'bg-amber-700'}  ${isDark ? 'bg-slate-900' : 'text-white'} font-semibold rounded-md hover:bg-green-700`}
                                         aria-haspopup="dialog"
                                       >
                                         View project
                                       </button>
                                     </div>
                                   </div>
                                 </div>
                               </figure>
                             ))}
                           </div>
         
                           {/* overlay controls */}
                           <button
                             aria-label="Previous"
                             onClick={prev}
                             className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 md:p-4 lg:p-5 bg-white/80  shadow z-10 hover:bg-white "
                           >
                             ‹
                           </button>
                           <button
                             aria-label="Next"
                             onClick={next}
                             className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 md:p-4 lg:p-5 bg-white/80  shadow z-10 hover:bg-white "
                           >
                             ›
                           </button>
                         </div>
         
                         <div className="flex justify-center gap-2 mt-4">
                           {projects.map((_, i) => (
                             <button
                               key={i}
                               onClick={() => setIndex(i)}
                               aria-label={`Go to slide ${i + 1}`}
                               className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                                 i === index
                                   ? (isDark ? "bg-yellow-200/80 " : "bg-amber-700 ")
                             : (isDark ? "bg-gray-600" : "bg-gray-400")
                               }`}
                             ></button>
                           ))}
                         </div>
                       </div>
                     </div>
                   </section>

        
      </div>
    </section>
  )
}
