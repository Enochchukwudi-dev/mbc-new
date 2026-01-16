import React, { useEffect, useRef, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Footer from "../components/Footer";

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
      alt?: string;
    }; 

// Component: extract first video frame to use as a thumbnail when a poster isn't provided
function VideoThumbnail({ src, poster, alt }: { src: string; poster?: string; alt?: string }) {
  const makePlaceholder = () => {
    const svg = `<?xml version='1.0' encoding='utf-8'?><svg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'><rect width='100%' height='100%' fill='%23f3f4f6'/><circle cx='320' cy='180' r='44' fill='%23ffffff' fill-opacity='0.6'/><polygon points='300,160 300,200 340,180' fill='%232b2b2b' /></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const [thumb, setThumb] = useState<string | null>(poster ?? makePlaceholder());

  useEffect(() => {
    if (poster) return; // already have a poster image
    if (typeof window === "undefined") return;

    let cancelled = false;
    let objectUrl: string | null = null;

    const makePlaceholder = () => {
      // simple SVG placeholder with play icon to avoid black boxes
      const svg = `<?xml version='1.0' encoding='utf-8'?><svg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'><rect width='100%' height='100%' fill='%23111827'/><circle cx='320' cy='180' r='44' fill='%23000000' fill-opacity='0.35'/><polygon points='300,160 300,200 340,180' fill='%23ffffff' /></svg>`;
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    };

    const v = document.createElement("video") as HTMLVideoElement;
    v.preload = "metadata";
    v.muted = true;
    v.playsInline = true;
    v.crossOrigin = "anonymous";

    const drawFrame = (): string | null => {
      try {
        const w = v.videoWidth || 480;
        const h = v.videoHeight || 270;
        if (!w || !h) return null;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
        // toDataURL may throw if canvas is tainted by cross-origin video
        return canvas.toDataURL("image/jpeg", 0.8);
      } catch {
        return null;
      }
    }; 

    const attemptCapture = async (url: string) => {
      return new Promise<string | null>((resolve) => {
        let settled = false;
        const timeout = window.setTimeout(() => {
          if (!settled) {
            settled = true;
            resolve(null);
          }
        }, 2500);

        const cleanup = () => {
          window.clearTimeout(timeout);
          v.removeEventListener("loadedmetadata", onMeta);
          v.removeEventListener("seeked", onSeeked);
          v.removeEventListener("error", onError);
        };

        const onError = () => {
          if (!settled) {
            settled = true;
            cleanup();
            resolve(null);
          }
        };

        const onMeta = () => {
          // try seeking slightly to ensure a frame is available
          try {
            v.currentTime = Math.min(0.1, (v.duration || 0) / 2 || 0.1);
          } catch {
            // ignore
          }
        };

        const onSeeked = () => {
          if (!settled) {
            const data = drawFrame();
            settled = true;
            cleanup();
            resolve(data);
          }
        };

        v.addEventListener("loadedmetadata", onMeta);
        v.addEventListener("seeked", onSeeked);
        v.addEventListener("error", onError);

        v.src = url;
        // try to trigger loading
        try {
          v.load();
        } catch {
          // ignore
        }
      });
    };

    (async () => {
      // first try direct capture
      let data = await attemptCapture(src);

      // if that failed, try fetching the file as a blob and use object URL (can help when server requires range requests)
      if (!data) {
        try {
          const res = await fetch(src, { method: "GET" });
          if (res.ok) {
            const blob = await res.blob();
            objectUrl = URL.createObjectURL(blob);
            data = await attemptCapture(objectUrl);
          }
        } catch {
          // fetch may fail due to CORS; fall through to placeholder
        }
      }

      if (!cancelled) {
        if (data) setThumb(data);
        else setThumb(makePlaceholder());
      }

      // cleanup video src to stop network activity
      try {
        v.src = "";
      } catch {}
    })();

    return () => {
      cancelled = true;
      try {
        v.src = "";
      } catch {}
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, poster]);

  return thumb ? (
    <div className="w-full h-full relative">
      <Image src={thumb} alt={alt ?? "video thumbnail"} fill className="object-cover" unoptimized />
    </div>
  ) : (
    <div className="w-full h-full bg-gray-800" />
  );
}

function Gallery() {
  const media = useMemo<MediaItem[]>(
    () => [
      { type: "image", src: "/w6.jpeg", alt: "Image 1" },
      { type: "image", src: "/w7.jpeg", alt: "Image 2" },
      { type: "image", src: "/w8.jpeg", alt: "Image 3" },
      { type: "image", src: "/w9.jpeg", alt: "Image 4" },
      { type: "image", src: "/w10.jpeg", alt: "Image 5" },
      { type: "image", src: "/w11.jpeg", alt: "Image 6" },
      { type: "image", src: "/w12.jpeg", alt: "Image 7" },
      { type: "image", src: "/w13.jpeg", alt: "Image 8" },
      { type: "image", src: "/w13.jpeg", alt: "Image 9" },
      { type: "image", src: "/w2copy.jpeg", alt: "Image 10" },
      { type: "image", src: "/w4copy.jpeg", alt: "Image 11" },
      { type: "image", src: "/hello.jpeg", alt: "Image 12" },
      { type: "image", src: "/s1.jpeg", alt: "Image 13" },
      { type: "image", src: "/s2.jpeg", alt: "Image 14" },
      { type: "image", src: "/s3.jpeg", alt: "Image 15" },
      { type: "image", src: "/s4.jpeg", alt: "Image 16" },
      { type: "image", src: "/s5.jpeg", alt: "Image 17" },
      { type: "image", src: "/s6.jpeg", alt: "Image 18" },
      { type: "image", src: "/s7.jpeg", alt: "Image 19" },

      { type: "video", src: "/v1.mp4", alt: "Video 1" },
      { type: "video", src: "/v2.mp4", alt: "Video 2" },
      { type: "video", src: "/v3.mp4", alt: "Video 3" },
      { type: "video", src: "/v4.mp4", alt: "Video 4" },
      { type: "video", src: "/v5.mp4", alt: "Video 5" },
      { type: "video", src: "/v6.mp4", alt: "Video 6" },
      { type: "video", src: "/v7.mp4", alt: "Video 7" },
      { type: "video", src: "/v8.mp4", alt: "Video 8" },
      { type: "video", src: "/v9.mp4", alt: "Video 9" },
      { type: "video", src: "/v10.mp4", alt: "Video 10" },
      { type: "video", src: "/v11.mp4", alt: "Video 11" },
      { type: "video", src: "/v12.mp4", alt: "Video 12" },
      { type: "video", src: "/v13.mp4", alt: "Video 13" },
      { type: "video", src: "/v14.mp4", alt: "Video 14" },
      { type: "video", src: "/v15.mp4", alt: "Video 15" },
      { type: "video", src: "/v16.mp4", alt: "Video 16" },
      { type: "video", src: "/v17.mp4", alt: "Video 17" },
      { type: "video", src: "/v18.mp4", alt: "Video 18" },
      { type: "video", src: "/v19.mp4", alt: "Video 19" },
      { type: "video", src: "/v20.mp4", alt: "Video 20" },
      { type: "video", src: "/v21.mp4", alt: "Video 21" },
      { type: "video", src: "/v22.mp4", alt: "Video 22" },
      { type: "video", src: "/v23.mp4", alt: "Video 23" },
      { type: "video", src: "/v24.mp4", alt: "Video 24" },
      { type: "video", src: "/v25.mp4", alt: "Video 25" },
      { type: "video", src: "/v26.mp4", alt: "Video 26" },
      { type: "video", src: "/v27.mp4", alt: "Video 27" },
      { type: "video", src: "/b1.mp4", alt: "Video 28" },
      { type: "video", src: "/b2.mp4", alt: "Video 29" },
      { type: "video", src: "/b3.mp4", alt: "Video 30" },
      { type: "video", src: "/b4.mp4", alt: "Video 31" },
      { type: "video", src: "/b5.mp4", alt: "Video 32" },
      { type: "video", src: "/b6.mp4", alt: "Video 33" },
      { type: "video", src: "/b7.mp4", alt: "Video 34" },
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

  // track dark mode
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => setIsDark(document.documentElement.classList.contains('dark'));
    update();
    const observer = new MutationObserver(() => update());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    const onStorage = (e: StorageEvent) => { if (e.key === 'theme') update(); };
    window.addEventListener('storage', onStorage);
    return () => { observer.disconnect(); window.removeEventListener('storage', onStorage); };
  }, []);

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

  // Coming Soon modal state + accessibility
  const [showComingSoon, setShowComingSoon] = useState<boolean>(false);
  const comingSoonCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowComingSoon(false)
    }
    if (showComingSoon) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [showComingSoon])

  useEffect(() => {
    if (showComingSoon) {
      comingSoonCloseRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = "" }
  }, [showComingSoon])

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

  // Use original `media` (unshuffled) so carousels have a consistent ordering
  const projects = media
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

  // Second carousel also uses original `media` (unshuffled) so it remains consistent
  const projects2 = media
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
        className={`min-h-screen pt-20 ${selectedVideo ? "filter blur-sm" : ""} ${isDark ? 'bg-slate-950' : 'bg-[hsl(20,22%,92%)]'}`}
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${isDark ? 'bg-slate-950' : 'bg-[hsl(20,22%,92%)]'}`}>
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className={`mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight ${isDark ? 'text-gray-300' : 'text-gray-900'} `}>
              My Projects
            </h2>
            <p className={`mt-3 max-w-2xl mx-auto text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-700'} `}>
              Real projects that reflect our attention to detail, clear
              communication, and the measurable value we deliver from first
              sketch to final handover.
            </p>
          </div>

          {/* Toggle */}
          <div className="mt-6  mb-4 flex">
            <div className={`inline-flex items-center rounded-full ${isDark ? 'bg-slate-900' : 'bg-gray-300'} p-1`}>
              <button
                onClick={() => setFilter("images")}
                className={`px-4 py-2 rounded-full ${
                  filter === "images"
                ? (isDark ? "bg-yellow-200/80 text-slate-900 font-semibold shadow" : "bg-amber-700 text-white font-semibold shadow")
                    : (isDark ? "text-gray-500" : "text-gray-500")
                }`}
              >
                Images
              </button>

              <button
                onClick={() => setFilter("videos")}
                className={`ml-1 px-4 py-2 rounded-full ${
                  filter === "videos"
                    ? (isDark ? "bg-yellow-200/80 text-slate-900 font-semibold shadow" : "bg-amber-700 text-white font-semibold shadow")
                    : (isDark ? "text-gray-500" : "text-gray-500")
                }`}
              >
                Videos
              </button>
            </div>
          </div> 
          
{filter === 'images' && (
          <section className={`py-12 ${isDark ? 'bg-slate-900/70' : 'bg-[hsl(20,22%,85%)]'} rounded-2xl `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Images</h2>
                <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Project images</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {shuffledMedia
                  .filter((m) => m.type === 'image')
                  .map((m, i) => (
                    <article key={i} className="rounded-lg overflow-hidden bg-gray-100  shadow-sm">
                      <div className="relative h-48 md:h-56 lg:h-64 w-full bg-transparent">
                        <Image src={m.src} alt={m.alt} fill className="object-cover" />
                      </div>

                      <div className={`p-3 ${isDark ? 'bg-slate-400' : 'bg-white'}`}>
                        <h3 className="text-xs font-semibold text-black ">{m.alt ?? `Image ${i + 1}`}</h3>
                        <div className="mt-4">
                          <button onClick={() => setLightboxSrc(m.src)} className={`inline-flex items-center px-3 py-2 ${isDark ? 'bg-yellow-200/70' : 'bg-amber-700'} ${isDark ? 'text-slate-900' : 'text-white'} hover:bg-slate-600 rounded-md text-xs md:text-sm font-semibold`}>
                            View full image
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </section>
        )} 

          {filter === 'videos' && (
            <section id="videos" ref={videosRef} className={`py-12 ${isDark ? 'bg-slate-900/70' : 'bg-[hsl(20,22%,85%)]'} rounded-2xl `}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className={`text-xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Videos</h2>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Random Multimedia from projects</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {shuffledMedia
                    .filter((m) => m.type === 'video')
                    .map((m, i) => (
                      <article key={i} className="rounded-lg overflow-hidden bg-gray-100  shadow-sm">
                        <div className="relative h-48 md:h-56 lg:h-64 w-full bg-transparent">
                          <div className="w-full h-full">
                            <VideoThumbnail src={m.src} poster={m.poster} alt={m.alt ?? `video thumbnail ${i + 1}`} />
                          </div>

                          {/* Play overlay */}
                          <button
                            onClick={() => setSelectedVideo(m.src)}
                            aria-label={m.alt ?? `Play video ${i + 1}`}
                            className="absolute inset-0 flex items-center justify-center text-white"
                          >
                            <span className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-black/50 backdrop-blur text-2xl md:text-3xl lg:text-3xl">▶</span>
                          </button>
                        </div>

                        <div className={`p-3 ${isDark ? 'bg-slate-400' : 'bg-white'}`}>
                          <h3 className="text-xs font-semibold text-black ">{m.alt ?? `Video ${i + 1}`}</h3>
                          <div className="mt-4">
                            <button onClick={() => setSelectedVideo(m.src)} className={`inline-flex items-center px-3 py-2 ${isDark ? 'bg-yellow-200/70' : 'bg-amber-700'} ${isDark ? 'text-slate-900' : 'text-white'} hover:bg-slate-600 rounded-md text-xs font-semibold`}>
                              Play video
                            </button>
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
          <div className="max-w-4xl w-full bg-white  rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-end p-2">
              <button
                ref={lightboxCloseRef}
                onClick={() => setLightboxSrc(null)}
                aria-label="Close image"
                className="px-3 py-1 text-sm rounded bg-red-400 text-white hover:bg-gray-200 focus:outline-none"
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

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowComingSoon(false); }}
        >
          <div className={`rounded-lg shadow-lg max-w-sm md:max-w-md lg:max-w-lg w-full p-6 ${isDark ? 'bg-slate-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <div className="flex justify-end">
              <button
                ref={comingSoonCloseRef}
                onClick={() => setShowComingSoon(false)}
                aria-label="Close"
                className="px-3 py-1 text-sm rounded bg-red-400 text-white hover:bg-red-300 focus:outline-none"
              >
                Close
              </button>
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-lg font-semibold">Projects coming soon</h3>
              <p className="mt-2 text-sm text-gray-500">We are working to add detailed project pages. Stay tuned!</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Gallery;
