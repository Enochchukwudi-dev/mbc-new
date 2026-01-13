"use client";
import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";

function ThemeToggle({ isDark, toggleTheme, wrapperClass, buttonClass }: { isDark: boolean; toggleTheme: () => void; wrapperClass?: string; buttonClass?: string }) {
  return (
    <div className={wrapperClass}>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Dark mode" : "Light mode"}
        className={`flex items-center justify-between gap-2 px-4 py-3 rounded-md ${buttonClass}`}
      >
        <span className={`font-medium ${isDark ? 'text-yellow-200/80' : 'text-gray-900'}`}>{isDark ? 'Dark mode' : 'Light mode'}</span>

        <div className={`relative inline-flex items-center w-14 h-7 rounded-full p-1 transition-colors duration-300 ${isDark ? 'bg-gray-400/10 ' : 'bg-gray-300'}`}>
          <Sun className={`absolute left-2 w-4 h-4 text-yellow-400 transform transition-all duration-300 ${isDark ? 'opacity-0 -translate-x-2 scale-75' : 'opacity-100 translate-x-0 scale-100'}`} />
          <Moon className={`absolute right-2 w-4 h-4 text-white transform transition-all duration-300 ${isDark ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-2 scale-75'}`} />
          <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${isDark ? 'translate-x-7' : 'translate-x-0'}`} />
        </div>
      </button>
    </div>
  );
}

const menu = [
  { href: '/', label: 'Home' },
  { href: '/About', label: 'About' },
   { href: '/Gallery', label: 'Projects' },
  { href: '/#services', label: 'Services', isAnchor: true },
  { href: '/Contact', label: 'Contact' },


];

function Navbar() {
  const [open, setOpen] = useState(false);

  const [isDark, setIsDark] = useState<boolean>(false);

  // Determine theme preferences on the client only (avoid reading browser APIs during SSR)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored === 'dark' : !!prefersDark;
    setIsDark(initial);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // sync document class with state and listen for changes from other tabs
    document.documentElement.classList.toggle('dark', isDark);
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme') setIsDark(e.newValue === 'dark');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [isDark]);

  const toggleTheme = () =>
    setIsDark((prev) => {
      const next = !prev;
      try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
      document.documentElement.classList.toggle('dark', next);
      return next;
    });

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    if (typeof window === 'undefined') return;
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.split('#')[1];
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkClass = `inline-block px-3 py-2 rounded-md font-medium text-sm transition duration-150 ease-in-out ${isDark ? 'text-slate-200 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 active:scale-95' : 'text-gray-900 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 active:scale-95'}`;



  return (
    <nav className={`fixed top-0 left-0 right-0 h-22 z-40 ${isDark ? 'bg-slate-950 shadow-[0_2px_8px_rgba(255,255,255,0.06)]' : 'bg-[hsl(20,22%,94%)] shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex  items-center justify-between h-16">
          {/* Logo (left) */}
          <div className="flex items-center  flex-col pt-4 ">
              <Link
                href="/"
                className="flex flex-col items-start  md:mb-5"
              >
                <Image
                  src="/buju.png"
                  alt="MyLogo"
                  width={79}
                  height={79}
                  className="h-9 w-28 object-contain filter brightness-90 contrast-150"
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

      
          {/* Links (hidden on small, shown on md+) */}
          <div className="hidden md:flex items-center space-x-6">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} wrapperClass="mr-4" buttonClass="bg-gray-200/1 dark:bg-slate-200/2" />
            {menu.map(item => (
              <Link key={item.href} href={item.href} className={linkClass} onClick={(e) => handleAnchorClick(e, item.href)}>{item.label}</Link>
            ))}
          </div>

          {/* Menu (shown on small, hidden on md) */}
          <div className="md:hidden mt-7 mr-3">
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="p-1 rounded-full relative z-60  flex items-center justify-center"
            >
              {open ? (
                <X className={`h-10 w-8 ${isDark ? 'text-slate-200' : 'text-gray-900'}`} strokeWidth={1.5} />
              ) : (
                <Menu className={`h-10 w-8 ${isDark ? 'text-slate-200' : 'text-gray-900'}`} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu (md:hidden) - fixed off-canvas panel that slides in from the right */}
        <div
          className={`md:hidden fixed top-0  pt-15 right-0 z-50 w-full  bottom-0 ${isDark ? 'bg-slate-950' : 'bg-[hsl(20,22%,94%)]'} shadow-lg transform transition-transform  duration-700 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-hidden={!open}
        >
          <div className="py-6 px-6 flex flex-col h-full">
            <div className="flex-1 space-y-2">
              {menu.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className={`flex items-center justify-between px-4 py-5 text-lg font-semibold ${isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-gray-900 hover:bg-gray-100'} rounded`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`h-5 w-5 ${isDark ? 'text-slate-50' : 'text-gray-900'}`} />
                </Link>
              ))}




              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} wrapperClass="mt-4 px-4" buttonClass={isDark ? "w-full bg-slate-950/10" : "w-full bg-gray-200 dark:bg-slate-800"} />

              <div className="mt-6">
              <Link
                href="/Booking"
                onClick={() => setOpen(false)}
                className={`block w-full text-white ${isDark ? 'bg-slate-900' : 'bg-gray-900'} py-3 rounded-md text-center font-semibold shadow-sm`}
              >
                Book Us
              </Link>
            </div>
            </div>

            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
