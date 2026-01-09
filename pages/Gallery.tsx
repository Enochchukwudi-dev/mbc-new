import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import Footer from './Footer'

type MediaItem =
  | {
      type: 'image'
      src: string
      alt: string
    }
  | {
      type: 'video'
      src: string
      poster?: string
    }

function Gallery() {
  const media: MediaItem[] = [
    { type: 'image', src: '/w6.jpeg', alt: 'Construction 1' },
    { type: 'image', src: '/w7.jpeg', alt: 'Construction 2' },
    { type: 'image', src: '/w8.jpeg', alt: 'Construction 3' },
    { type: 'image', src: '/w9.jpeg', alt: 'Construction 4' },
    { type: 'image', src: '/w10.jpeg', alt: 'Construction 5' },
    { type: 'image', src: '/w11.jpeg', alt: 'Construction 6' },
    { type: 'image', src: '/w12.jpeg', alt: 'Construction 7' },
    { type: 'image', src: '/w13.jpeg', alt: 'Construction 8' },
    { type: 'image', src: '/w13.jpeg', alt: 'Construction 9' },
    { type: 'image', src: '/w2copy.jpeg', alt: 'Construction 10' },
    { type: 'image', src: '/w4copy.jpeg', alt: 'Construction 11' },
    { type: 'image', src: '/w5copy.jpeg', alt: 'Construction 12' },

    { type: 'video', src: '/v1.mp4' },
    { type: 'video', src: '/v2.mp4' },
    { type: 'video', src: '/v3.mp4' },
    { type: 'video', src: '/v4.mp4' },
    { type: 'video', src: '/v5.mp4' },
    { type: 'video', src: '/v6.mp4' },
    { type: 'video', src: '/v7.mp4' }
  ]

  const [filter, setFilter] = useState<'images' | 'videos'>('images')
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const videosRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedVideo])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#videos') {
      setFilter('videos')

      setTimeout(() => {
        const el = videosRef.current
        if (!el) return

        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const nav = document.querySelector('nav') as HTMLElement | null
        const offset = nav ? nav.getBoundingClientRect().height : 0

        window.scrollTo({
          top: Math.max(0, top - offset - 8),
          behavior: 'smooth'
        })
      }, 100)
    }
  }, [])

  return (
    <>
      <Navbar />

      <main
        className={`min-h-screen pt-20 ${
          selectedVideo ? 'filter blur-sm' : ''
        } bg-gray-100 dark:bg-gray-900`}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Gallery</h1>
          <p className="mt-4 text-gray-600">
            A mix of images and short reels from completed projects.
          </p>

          {/* Toggle */}
          <div className="mt-6 flex">
            <div className="inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-800 p-1">
              <button
                onClick={() => setFilter('images')}
                className={`px-4 py-2 rounded-full ${
                  filter === 'images'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Images
              </button>

              <button
                onClick={() => setFilter('videos')}
                className={`ml-1 px-4 py-2 rounded-full ${
                  filter === 'videos'
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                Videos
              </button>
            </div>
          </div>

          <section className="mt-8">
            {/* Images */}
            {filter === 'images' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Images</h2>
                  <p className="text-sm text-gray-500">
                    Photos from completed projects
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {media
                    .filter((m) => m.type === 'image')
                    .map((m, i) => (
                      <div
                        key={i}
                        className="rounded-lg overflow-hidden bg-gray-100 shadow-sm"
                      >
                        <div className="relative h-48 w-full">
                          <Image
                            src={m.src}
                            alt={m.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {filter === 'videos' && (
              <div id="videos" ref={videosRef}>
                <div className="mt-8 mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Videos</h2>
                  <p className="text-sm text-gray-500">
                    Short reels and walkthroughs
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {media
                    .filter((m) => m.type === 'video')
                    .map((m, i) => (
                      <div
                        key={i}
                        className="rounded-lg overflow-hidden bg-black shadow-sm cursor-pointer"
                        onClick={() => setSelectedVideo(m.src)}
                      >
                        <div className="relative h-48 w-full">
                          <video
                            src={m.src}
                            className="w-full h-full object-cover"
                            preload="metadata"
                            poster={'poster' in m ? m.poster : undefined}
                            muted
                            playsInline
                            aria-label={`video thumbnail ${i + 1}`}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          />

          <div
            className="relative z-10 w-full max-w-3xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo}
              controls
              playsInline
              className="w-full h-auto rounded"
              aria-label="open video"
            />

            <div className="flex justify-center">
              <button
                onClick={() => setSelectedVideo(null)}
                className="mt-3 px-4 py-2 bg-white text-gray-900 rounded shadow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default Gallery
