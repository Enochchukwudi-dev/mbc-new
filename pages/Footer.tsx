"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
    <footer className="bg-[hsl(20,22%,95%)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + Description + Socials */}
          <div>
            <div className="flex items-start  flex-col pt-0 ">
              <Link
                href="/"
                className="flex flex-col items-start text-gray-900"
              >
                <Image
                  src="/gala.png"
                  alt="MyLogo"
                  width={79}
                  height={79}
                  className="h-9 w-28 object-contain filter brightness-102"
                />
                <div className="mt-1 text-left md:text-left">
                  <span
                    className="block font-bold"
                    style={{ fontSize: "11px", lineHeight: 1 }}
                  >
                    MAROCK BUILDING CONSTRUCTION
                  </span>
                  <span
                    className="block font-bold"
                    style={{ fontSize: "11px", lineHeight: 1 }}
                  >
                    ENTERPRISE
                  </span>
                </div>
              </Link>
            </div>

            <p className="mt-3 text-black text-sm max-w-[18rem]">
              Faith-inspired fashion for everyday wear, shop curated collections
              made with care.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>

            <h4 className="mt-6 text-sm font-semibold text-black uppercase">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase">
              Support
            </h4>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact list */}
          <div>
            <h4 className="text-sm font-semibold text-black uppercase">
              Address
            </h4>
            <ul className="mt-4 space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-red-400">📍</span>
                <span>64 NEPA ROAD AWADA OBOSI, ANAMBRA STATE</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white/80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 8V7l-3 2-2-1-4 4 2 2-1 2 2 2 5-3 3 1V8zM8 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
                <a
                  href="mailto:followgodng01@gmail.com"
                  className="hover:underline"
                >
                  followgodng01@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white/80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M21 16.5l-4-1.2a2 2 0 00-2 .5L13 18l-2-1.1a11 11 0 01-5.9-5.9L4 7l2.2-2.2a2 2 0 00.5-2L5.5 1H3A1 1 0 002 2c0 10 8 18 18 18a1 1 0 001-1v-2.5z" />
                </svg>
                <a href="tel:+2349031161058" className="hover:underline">
                  08064032113
                </a>
                <p>or</p>
                 <a href="tel:+2349031161058" className="hover:underline">
                  08155838597
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Returns
            </a>
          </div>

          <div className="text-sm text-gray-600">© MBC Const. — 2026</div>

          <div className="flex items-center gap-4 flex-col">
            <div className="text-xs text-gray-300">built with -</div>
            <div className="text-sm font-semibold">Byund Technologies</div>
            <a
              href="#"
              className="ml-3 rounded-md border border-white/20 px-3 py-1 text-sm hover:bg-white/5"
            >
              Reach Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
