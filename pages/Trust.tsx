
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
    <section aria-labelledby="trust-heading" className="py-12 bg-white/10 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {showCerts && (
          <div ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) setShowCerts(false) }} role="dialog" aria-modal="true" aria-label="Certificates" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white m-0">Scanned Certificates</h3>
                <button ref={closeBtnRef} onClick={() => setShowCerts(false)} aria-label="Close certificates" className="ml-4 inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">✕</button>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-300">Tap an image to open full-size. Replace the sample files in <span className="font-mono">/public/certs/</span> with your real scans.</p>

              <div className="grid gap-4 sm:grid-cols-3 mt-4">
                {[
                  { src: '/certs/coren.jpg', alt: 'COREN certificate' },
                  { src: '/certs/rc.jpg', alt: 'RC certificate' },
                  { src: '/certs/insurance.jpg', alt: 'Insurance certificate' },
                ].map((img) => (
                  <a key={img.src} href={img.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 transform hover:scale-105 transition-transform">
                    <img src={img.src} alt={img.alt} className="w-full h-44 object-cover" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
