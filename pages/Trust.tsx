
import React, { useEffect, useRef, useState } from 'react'

export default function Trust() {
  const [showCerts, setShowCerts] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  type Feature = { id: string; icon: string; title: string; why: string; clickable?: boolean; link?: string }
  const features: Feature[] = [
    { id: 'experience', icon: '🏗️', title: '10+ Years Experience', why: "Longevity = stability = won't disappear with deposit" },
    { id: 'licensing', icon: '📋', title: 'Licensed & Insured', why: 'Legal proof separates professionals from roadside builders', clickable: true },
    { id: 'projects', icon: '🏠', title: '50+ Projects Completed', why: 'Volume proves you deliver consistently' },
    { id: 'warranty', icon: '🛡️', title: '2-Year Work Warranty', why: 'Shows you stand behind your work' },
    { id: 'ontime', icon: '⏱️', title: '95% On-Time Completion', why: "Addresses biggest client fear (delays)" },
  ]

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowCerts(false)
    }
    if (showCerts) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showCerts])

  useEffect(() => {
    if (showCerts) closeBtnRef.current?.focus()
  }, [showCerts])

  return (
    <section aria-labelledby="trust-heading" className="py-8 bg-white/2 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-9 w-45 h-68 overflow-hidden border border-gray-200 dark:border-gray-700 bg-white/6 p-3 shadow-md flex flex-col items-center justify-center">
          <div className="w-full flex-1 flex items-center justify-center">
            <button onClick={() => setShowCerts(true)} aria-label="Open certificates" className="w-full h-full flex items-center justify-center">
              <img src="/cac.jpg" alt="CAC Certificate" className="w-full h-full object-contain cursor-pointer" />
            </button>
          </div>
          <button
            onClick={() => setShowCerts(true)}
            aria-label="View full certificate"
            className="mt-3 px-4 py-2 bg-green-700 text-white rounded-md text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 whitespace-nowrap"
          >
            View full certificate
          </button>
        </div>
        
        {showCerts && (
          <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === overlayRef.current) setShowCerts(false)
            }}
          >
            <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-end p-2">
                <button
                  ref={closeBtnRef}
                  onClick={() => setShowCerts(false)}
                  aria-label="Close certificate"
                  className="px-3 py-1 text-sm rounded bg-red-400 text-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Close
                </button>
              </div>
              <div className="p-4 flex items-center justify-center">
                <img src="/cac.jpg" alt="CAC Certificate" className="w-full h-auto object-contain max-h-[80vh]" />
              </div>
            </div>
          </div>
        )}
        <div className="text-center">
          <p className="text-sm text-green-600 font-semibold">Trusted & Verified</p>
          <h2 id="trust-heading" className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Built on Reputation
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-300">We combine industry experience, licensing, and consistent delivery to earn your trust before the first brick is laid.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.id} className="relative bg-gradient-to-br from-white/60 to-green-50 dark:from-gray-800 dark:to-gray-800/60 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50 text-xl shadow-inner">{f.icon}</div>
                </div>
                <div className="flex-1">
                  {f.clickable ? (
                    <button onClick={() => setShowCerts(true)} className="text-gray-900 dark:text-white font-semibold text-sm hover:text-green-600 transition-colors" aria-haspopup="dialog">
                      {f.title}
                    </button>
                  ) : 'link' in f && f.link ? (
                    <a href={f.link} className="text-gray-900 dark:text-white font-semibold text-sm hover:text-green-600 transition-colors" target="_blank" rel="noopener noreferrer">{f.title}</a>
                  ) : (
                    <div className="font-semibold text-sm text-gray-900 dark:text-white">{f.title}</div>
                  )}
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-300">{f.why}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

    
      </div>
    </section>
  )
}
