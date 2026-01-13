"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPinHouse, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Track whether the page is in dark mode (derived from <html>.classList)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    // In a real app you'd POST to an API here
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#services');
      }
    }
  };

  return (
    <footer className={`${isDark ? 'bg-slate-950/96' : 'bg-[hsl(20,22%,85%)]'}`}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + Description + Socials */}
          <div>
            <div className="flex items-start  flex-col pt-0 ">
              <Link
                href="/"
                className="flex flex-col items-start  md:mb-5"
              >
                <Image
                  src={isDark ? "/buju.png" : "/orangelog.png"}
                  alt="MBC Logo"
                  width={79}
                  height={79}
                  className={`h-9 w-28 object-contain filter ${isDark ? 'brightness-100 contrast-150' : 'brightness-120 contrast-70'}`}
                />
                <div className="mt-1 text-left md:text-left">
                  <span
                    className={`block font-extrabold ${isDark ? 'text-blue-200' : 'text-gray-900'}`}
                    style={{ fontSize: "11px", lineHeight: 1 }}
                  >
                    MAROCK BUILDING CONST.
                  </span>
                  <span
                    className={`block font-bold ${isDark ? 'text-blue-300/60' : 'text-gray-700'}`}
                    style={{ fontSize: "11px", lineHeight: 1 }}
                  >
                    ENTERPRISE
                  </span>
                </div>
              </Link>
            </div>

            <p className={`mt-3 lg:mr-3 ${isDark ? 'text-gray-300' : 'text-gray-800'} text-sm max-w-[18rem]`}>
              We Produce and Apply Chemical on Any Leaking Roof, Building Construction, Interior and Exterior Designs
            </p>
          </div>

          {/* Shop */}
          <div className="md:ml-5">
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'} uppercase`}>
              Quick Links
            </h4>
            <ul className={`mt-4 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
              <li>
                <Link
                  href="/"
                  onClick={() => { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link href="/Gallery" className={`${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}>
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  onClick={handleServicesClick}
                  className={`${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}
                >
                  Services
                </Link>
              </li>
           
            </ul>

            <h4 className={`mt-6 text-sm font-bold ${isDark ? 'text-white' : 'text-black'} uppercase`}>
              Company
            </h4>
            <ul className={`mt-4 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
              <li>
                <Link href="/About" className={`${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'} uppercase`}>
              Support
            </h4>
            <ul className={`mt-4 space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
              <li>
                <Link
                  href="/Contact"
                  className={`${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact list */}
          <div>
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'} uppercase`}>
              Address
            </h4>
            <ul className={`mt-4 space-y-3 ${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
              <li className="flex items-center gap-2">
                <MapPinHouse className={`${isDark ? 'text-yellow-200/80' : 'text-amber-700'} h-4 w-4 md:h-5 md:w-5`} />
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-800'} `}>64 Nepa road awada obosi, Anambra State</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className={`${isDark ? 'text-yellow-200/80' : 'text-amber-700'} h-4 w-4 md:h-5 md:w-5`} />
                <a
                  href="mailto:followgodng01@gmail.com"
                  className={`${isDark ? 'text-gray-400' : 'text-gray-800'} ${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}
                >
                  mbcconstruction@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className={`${isDark ? 'text-yellow-200/80' : 'text-amber-700'} h-4 w-4 md:h-5 md:w-5`} />
                <a href="tel:+2349031161058" className={`${isDark ? 'text-gray-400' : 'text-gray-800'} ${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}>
                  08064032113
                </a>
                <p>or</p>
                 <a href="tel:+2349031161058" className={`${isDark ? 'text-gray-400' : 'text-gray-800'} ${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}>
                  08155838597
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a href="#" className={`${isDark ? 'text-gray-400' : 'text-gray-800'} ${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}>
              Terms
            </a>
            <a href="#" className={`${isDark ? 'text-gray-400' : 'text-gray-800'} ${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}>
              Privacy
            </a>
            <a href="#" className={`${isDark ? 'text-gray-400' : 'text-gray-800'} ${isDark ? 'hover:text-yellow-200/80' : 'hover:text-amber-700'} hover:underline hover:font-bold`}>
              Returns
            </a>
          </div>

          <div className={`${isDark ? 'text-gray-400' : 'text-gray-800'} hover:underline text-sm`}>© MBC Const. — 2026</div>

          <div className="flex items-center gap-4 flex-col">
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-800'} text-xs`}>built with -</div>
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-800'} text-sm`}>Byund Technologies</div>
            <a
              href="https://wa.me/2349162919586?text=Good%20day%2C%20reaching%20out%20from%20mbc-website"
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-3 ${isDark ? 'bg-yellow-200/80' : 'bg-amber-700'} ${isDark ? 'hover:bg-yellow-200' : 'hover:bg-amber-600' } ${isDark ? 'text-slate-900' : 'text-white'} rounded-md border border-black/10 px-3 py-1 text-sm font-semibold`}
            >
              Reach Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
