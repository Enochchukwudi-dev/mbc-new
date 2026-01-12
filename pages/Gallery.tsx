import React, { useEffect, useRef, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "./Footer";

type MediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
    };

function Gallery() {
  const media = useMemo<MediaItem[]>(
    () => [
      { type: "image", src: "/w6.jpeg", alt: "Construction 1" },
      { type: "image", src: "/w7.jpeg", alt: "Construction 2" },
      { type: "image", src: "/w8.jpeg", alt: "Construction 3" },
      { type: "image", src: "/w9.jpeg", alt: "Construction 4" },
      { type: "image", src: "/w10.jpeg", alt: "Construction 5" },
      { type: "image", src: "/w11.jpeg", alt: "Construction 6" },
      { type: "image", src: "/w12.jpeg", alt: "Construction 7" },
      { type: "image", src: "/w13.jpeg", alt: "Construction 8" },
      { type: "image", src: "/w13.jpeg", alt: "Construction 9" },
      { type: "image", src: "/w2copy.jpeg", alt: "Construction 10" },
      { type: "image", src: "/w4copy.jpeg", alt: "Construction 11" },
      { type: "image", src: "/w5copy.jpeg", alt: "Construction 12" },

      { type: "video", src: "/v1.mp4" },
      { type: "video", src: "/v2.mp4" },
      { type: "video", src: "/v3.mp4" },
      { type: "video", src: "/v4.mp4" },
      { type: "video", src: "/v5.mp4" },
      { type: "video", src: "/v6.mp4" },
      { type: "video", src: "/v7.mp4" },
    ],
    []
  );

  // Shuffle media once per page load
  const shuffle = <T,>(arr: T[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const [shuffledMedia, setShuffledMedia] = useState<MediaItem[]>(media);
  useEffect(() => {
    // Defer shuffling to avoid synchronous setState inside effect
    const t = setTimeout(() => setShuffledMedia(shuffle([...media])), 0);
    return () => clearTimeout(t);
  }, [media]);

  const [filter, setFilter] = useState<"images" | "videos">("images");
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const videosRef = useRef<HTMLDivElement | null>(null);
  const lightboxOverlayRef = useRef<HTMLDivElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const videoOverlayRef = useRef<HTMLDivElement | null>(null);
  const videoCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedVideo || lightboxSrc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo, lightboxSrc]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxSrc(null);
    }
    if (lightboxSrc) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxSrc]);

  useEffect(() => {
    if (lightboxSrc) lightboxCloseRef.current?.focus();
  }, [lightboxSrc]);

  // Video modal keyboard + focus handlers
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSelectedVideo(null)
    }
    if (selectedVideo) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selectedVideo])

  useEffect(() => {
    if (selectedVideo) videoCloseRef.current?.focus()
  }, [selectedVideo])

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#videos") {
      setTimeout(() => {
        setFilter("videos");

        const el = videosRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const nav = document.querySelector("nav") as HTMLElement | null;
        const offset = nav ? nav.getBoundingClientRect().height : 0;

        window.scrollTo({
          top: Math.max(0, top - offset - 8),
          behavior: "smooth",
        });
      }, 100);
    }
  }, []);

  // Slider state & handlers
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);
  const [isDraggingState, setIsDraggingState] = useState(false);
  const startXRef = useRef(0);

  const projects = shuffledMedia
    .filter((m) => m.type === "image")
    .map((m, i) => ({
      src: m.src,
      title: m.alt ?? `Project ${i + 1}`,
      desc: "Project highlight and showcase",
    }));

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    setIsDraggingState(true);
    startXRef.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startXRef.current;
    setDragOffset(dx);
  };

  const finishDrag = (e?: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsDraggingState(false);
    const dx = e ? e.clientX - startXRef.current : dragOffset;
    if (dx > 50 && index > 0) setIndex((i) => Math.max(0, i - 1));
    else if (dx < -50 && index < projects.length - 1)
      setIndex((i) => Math.min(projects.length - 1, i + 1));
    setDragOffset(0);
    try {
      if (e) (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerUp = finishDrag;
  const onPointerCancel = finishDrag;

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(projects.length - 1, i + 1));

  // Second carousel state & handlers (independent)
  const slider2Ref = useRef<HTMLDivElement | null>(null);
  const [index2, setIndex2] = useState(0);
  const [dragOffset2, setDragOffset2] = useState(0);
  const isDragging2 = useRef(false);
  const [isDraggingState2, setIsDraggingState2] = useState(false);
  const startXRef2 = useRef(0);

  const projects2 = shuffledMedia
    .filter((m) => m.type === "image")
    .slice()
    .reverse()
    .map((m, i) => ({
      src: m.src,
      title: m.alt ?? `Project ${i + 1}`,
      desc: "Project highlight and showcase",
    }));

  const onPointerDown2 = (e: React.PointerEvent) => {
    isDragging2.current = true;
    setIsDraggingState2(true);
    startXRef2.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onPointerMove2 = (e: React.PointerEvent) => {
    if (!isDragging2.current) return;
    const dx = e.clientX - startXRef2.current;
    setDragOffset2(dx);
  };

  const finishDrag2 = (e?: React.PointerEvent) => {
    if (!isDragging2.current) return;
    isDragging2.current = false;
    setIsDraggingState2(false);
    const dx = e ? e.clientX - startXRef2.current : dragOffset2;
    if (dx > 50 && index2 > 0) setIndex2((i) => Math.max(0, i - 1));
    else if (dx < -50 && index2 < projects2.length - 1)
      setIndex2((i) => Math.min(projects2.length - 1, i + 1));
    setDragOffset2(0);
    try {
      if (e) (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerUp2 = finishDrag2;
  const onPointerCancel2 = finishDrag2;

  const prev2 = () => setIndex2((i) => Math.max(0, i - 1));
  const next2 = () => setIndex2((i) => Math.min(projects2.length - 1, i + 1));

  return (
    <>
      <Navbar />

      <main
        className={`min-h-screen pt-20  ${
          selectedVideo ? "filter blur-sm" : ""
        } bg-gray-100 dark:bg-gray-900`}
      >
        <div className="max-w-7xl mx-auto px-4 py-8 bg-amber-600/4">
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="mt-2 text-3xl sm:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              My Projects
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm text-gray-500 dark:text-gray-300">
              Real projects that reflect our attention to detail, clear
              communication, and the measurable value we deliver from first
              sketch to final handover.
            </p>
          </div>

          {/* Toggle */}
          <div className="mt-6 flex">
            <div className="inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-800 p-1">
              <button
                onClick={() => setFilter("images")}
                className={`px-4 py-2 rounded-full ${
                  filter === "images"
                    ? "bg-gray-900 text-white shadow"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                My project
              </button>

              <button
                onClick={() => setFilter("videos")}
                className={`ml-1 px-4 py-2 rounded-full ${
                  filter === "videos"
                    ? "bg-gray-900 text-white shadow"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                Gallery
              </button>
            </div>
          </div>
          
{filter === 'images' && (
            <>
          <section className="py-12 bg-gray-50/40 dark:bg-gray-900 rounded-2xl ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md w-full max-w-xl mx-auto">
                          <div className="relative h-56 sm:h-64">
                            <Image
                              src={p.src}
                              alt={p.title}
                              fill
                              className="object-cover"
                              draggable={false}
                            />
                          </div>

                          <div className="p-4">
                            <div className="font-semibold text-lg text-gray-900 dark:text-white">
                              {p.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                              {p.desc}
                            </div>
                            <div className="mt-4">
                              <a
                                href={p.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-green-700"
                              >
                                View project
                              </a>
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/80 dark:bg-gray-800/80 shadow z-10 hover:bg-white dark:hover:bg-gray-700"
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Next"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/80 dark:bg-gray-800/80 shadow z-10 hover:bg-white dark:hover:bg-gray-700"
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
                      className={`w-2 h-2 rounded-full ${
                        i === index
                          ? "bg-green-600"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </section>
            {/* Second Crousel (independent) */}
           <section className="py-12 bg-gray-50/40 dark:bg-gray-900 rounded-2xl ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div ref={slider2Ref} className="relative">
                <div
                  className="overflow-hidden rounded-2xl touch-pan-y"
                  onPointerDown={onPointerDown2}
                  onPointerMove={onPointerMove2}
                  onPointerUp={onPointerUp2}
                  onPointerCancel={onPointerCancel2}
                >
                  <div
                    className="flex transition-transform duration-500"
                    style={{
                      transform: `translateX(calc(-${
                        index2 * 100
                      }% + ${dragOffset2}px))`,
                      transition: isDraggingState2 ? "none" : undefined,
                    }}
                  >
                    {projects2.map((p) => (
                      <figure
                        key={p.src}
                        className="min-w-full flex-shrink-0 p-4 flex justify-center"
                      >
                        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-md w-full max-w-xl mx-auto">
                          <div className="relative h-56 sm:h-64">
                            <Image
                              src={p.src}
                              alt={p.title}
                              fill
                              className="object-cover"
                              draggable={false}
                            />
                          </div>

                          <div className="p-4">
                            <div className="font-semibold text-lg text-gray-900 dark:text-white">
                              {p.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                              {p.desc}
                            </div>
                            <div className="mt-4">
                              <a
                                href={p.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-green-700"
                              >
                                View project
                              </a>
                            </div>
                          </div>
                        </div>
                      </figure>
                    ))}
                  </div>

                  {/* overlay controls */}
                  <button
                    aria-label="Previous"
                    onClick={prev2}
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/80 dark:bg-gray-800/80 shadow z-10 hover:bg-white dark:hover:bg-gray-700"
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Next"
                    onClick={next2}
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full p-3 bg-white/80 dark:bg-gray-800/80 shadow z-10 hover:bg-white dark:hover:bg-gray-700"
                  >
                    ›
                  </button>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  {projects2.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex2(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`w-2 h-2 rounded-full ${
                        i === index2
                          ? "bg-green-600"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </section>
            </>
          )}

          {filter === 'videos' && (
            <section id="videos" ref={videosRef} className="py-12 bg-gray-50/40 dark:bg-gray-900 rounded-2xl ">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Gallery</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Random Multimedia from projects</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {shuffledMedia
                    .filter((m) => m.type === 'image' || m.type === 'video')
                    .map((m, i) => (
                      <article key={i} className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm">
                        <div className="relative h-48 w-full bg-black">
                          {m.type === 'image' ? (
                            <Image src={m.src} alt={m.alt} fill className="object-cover" />
                          ) : (
                            <>
                              <video
                                src={m.src}
                                className="w-full h-full object-cover"
                                preload="metadata"
                                poster={m.poster}
                                muted
                                playsInline
                                aria-label={`video thumbnail ${i + 1}`}
                              />

                              {/* Play overlay */}
                              <button
                                onClick={() => setSelectedVideo(m.src)}
                                aria-label={`Play video ${i + 1}`}
                                className="absolute inset-0 flex items-center justify-center text-white"
                              >
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/50 backdrop-blur text-2xl">▶</span>
                              </button>
                            </>
                          )}
                        </div>

                        <div className="p-3">
                          <h3 className="text-xs font-semibold text-black dark:text-white">{m.type === 'image' ? m.alt : 'Video'}</h3>
                          <div className="mt-4">
                            {m.type === 'image' ? (
                              <button onClick={() => setLightboxSrc(m.src)} className="inline-flex items-center px-3 py-2 bg-gray-900 hover:bg-slate-600 rounded-md text-xs text-white">
                                View full image
                              </button>
                            ) : (
                              <button onClick={() => setSelectedVideo(m.src)} className="inline-flex items-center px-3 py-2 bg-gray-900 hover:bg-slate-600 rounded-md text-xs text-white">
                                Play video
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Image Lightbox */}
      {lightboxSrc && (
        <div
          ref={lightboxOverlayRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === lightboxOverlayRef.current) setLightboxSrc(null);
          }}
        >
          <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-end p-2">
              <button
                ref={lightboxCloseRef}
                onClick={() => setLightboxSrc(null)}
                aria-label="Close image"
                className="px-3 py-1 text-sm rounded bg-red-400 text-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
              >
                Close
              </button>
            </div>
            <div className="p-4 flex items-center justify-center">
              <Image src={lightboxSrc!} alt="Gallery image" width={1200} height={800} className="w-full h-auto object-contain max-h-[80vh]" />
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          ref={videoOverlayRef}
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === videoOverlayRef.current) setSelectedVideo(null);
          }}
        >
          <div className="max-w-4xl w-full bg-transparent rounded-lg shadow-lg overflow-hidden relative">
            <div className="relative">
              <button
                ref={videoCloseRef}
                onClick={() => setSelectedVideo(null)}
                aria-label="Close video"
                className="absolute z-20 right-3 top-3 px-3 py-1 text-sm rounded-full bg-red-500 text-white hover:bg-red-400 focus:outline-none"
              >
                ✕
              </button>
              <video
                src={selectedVideo}
                controls
                autoPlay
                playsInline
                className="w-full h-auto rounded"
                aria-label="open video"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Gallery;
