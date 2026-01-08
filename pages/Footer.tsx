"use client";

import React, { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    // In a real app you'd POST to an API here
  };

  return (
    <footer className="bg-[#392828] text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + Description + Socials */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white">Follow
              <span className="block text-indigo-900 font-extrabold">God</span>
            </h3>
            <p className="mt-3 text-gray-200 text-sm max-w-[18rem]">
              Faith-inspired fashion for everyday wear, shop curated collections made
              with care.
            </p>

            <div className="flex gap-3 mt-4">
              <a href="#" aria-label="Instagram" className="p-2 rounded-md bg-white/10 hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5a4 4 0 100 8 4 4 0 000-8zM17.8 6.2a1 1 0 11-1.4-1.4 1 1 0 011.4 1.4z"/></svg>
              </a>
              <a href="#" aria-label="TikTok" className="p-2 rounded-md bg-white/10 hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v10.5A4.5 4.5 0 1016.5 16V6h3V2h-7z"/></svg>
              </a>
              <a href="#" aria-label="Snapchat" className="p-2 rounded-md bg-white/10 hover:bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C9.2 2 7.1 3.9 6.2 6.3C5.5 7 4 7.2 3 8c1 1.4 1.1 3.1.5 4.8-.4 1.1.2 1.8 1.3 1.6 1.9-.6 3.1-1 4.6-1 1.1 0 1.8.6 2.1 1.5.8 2.5 3 4.2 5.4 4.2s4.7-1.8 5.4-4.2c.3-.9 1-1.5 2.1-1.5 1.5 0 2.7.4 4.6 1 .9.3 1.7-.6 1.3-1.6-.6-1.7-.5-3.4.5-4.8-1-1-2.5-1-3.2-1.7C20.9 3.9 18.8 2 16 2H12z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase">Shop</h4>
            <ul className="mt-4 space-y-2 text-gray-200">
              <li><a href="#" className="hover:underline">All Products</a></li>
              <li><a href="#" className="hover:underline">Best Sellers</a></li>
            </ul>

            <h4 className="mt-6 text-sm font-semibold text-gray-100 uppercase">Company</h4>
            <ul className="mt-4 space-y-2 text-gray-200">
              <li><a href="#" className="hover:underline">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase">Support</h4>
            <ul className="mt-4 space-y-2 text-gray-200">
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-100 uppercase">Stay in touch</h4>
              <p className="mt-2 text-sm text-gray-200">Sign Up For Exclusive Offers And New Drops.</p>

              <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm placeholder:text-gray-300 focus:outline-none"
                />
                <button type="submit" className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium hover:bg-gray-800">Subscribe</button>
              </form>

              {subscribed && <p className="mt-2 text-sm text-emerald-200">Thanks! You've been subscribed.</p>}
            </div>
          </div>

          {/* Contact list */}
          <div>
            <h4 className="text-sm font-semibold text-gray-100 uppercase">Contact</h4>
            <ul className="mt-4 space-y-3 text-gray-200 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-red-400">📍</span>
                <span>Online Store</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M21 8V7l-3 2-2-1-4 4 2 2-1 2 2 2 5-3 3 1V8zM8 7a5 5 0 100 10 5 5 0 000-10z"/></svg>
                <a href="mailto:followgodng01@gmail.com" className="hover:underline">followgodng01@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16.5l-4-1.2a2 2 0 00-2 .5L13 18l-2-1.1a11 11 0 01-5.9-5.9L4 7l2.2-2.2a2 2 0 00.5-2L5.5 1H3A1 1 0 002 2c0 10 8 18 18 18a1 1 0 001-1v-2.5z"/></svg>
                <a href="tel:+2349031161058" className="hover:underline">+2349031161058</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-200">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Returns</a>
          </div>

          <div className="text-sm text-gray-200">© MBC Const. — 2026</div>

          <div className="flex items-center gap-4 flex-col">
            <div className="text-xs text-gray-300">built with -</div>
            <div className="text-sm font-semibold">Byund Technologies</div>
            <a href="#" className="ml-3 rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/5">Reach Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
