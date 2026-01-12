

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

export default function Contact() {
  const email = "info@example.com";
  const phone = "+1234567890";
  const whatsapp = "1234567890"; // international number without plus
  const facebook = "https://facebook.com/yourpage";

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-sm text-gray-500">Connect</p>

          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Ways to reach us
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-sm text-gray-600 dark:text-gray-300">
            Pick the method that works best for you. We&apos;re here either way, ready to listen and help.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Email */}
            <div className="flex flex-col items-center">
              <div className="p-6 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7.5v9A1.5 1.5 0 0 0 4.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 7.5L12 13 3 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Send us an email</h3>
              <p className="mt-3 text-sm text-gray-500">Write what you need and we&apos;ll get back to you promptly.</p>

              <a href={`mailto:${email}`} className="mt-6 inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-slate-700">
                Send an email
              </a>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center">
              <div className="p-6 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 12c0 4.970-4.03 9-9 9a8.96 8.96 0 0 1-4.47-1.14L3 21l1.27-4.5A8.96 8.96 0 0 1 3 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17.5 14.5c-.5 1.3-2.86 2.6-4.2 2.7-1.34.1-2.76-.56-4.6-1.9C6.2 13.9 5.6 12.5 5.7 11.2 5.8 9.9 6.95 8.2 8.1 7.5c.9-.5 1.6-.6 2.2-.2.5.3.9.9 1.2 1.2.3.3.5.8.3 1.2-.1.4-.6.8-1.1 1.3-.4.4-.4.6-.3 1 .1.4.7 1 1.4 1.2.7.3 1.2.2 1.8 0 .6-.2 1.6-.8 1.9-1.2.3-.4.4-.7.2-1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Message on WhatsApp</h3>
              <p className="mt-3 text-sm text-gray-500">Quick conversations happen best where you already are.</p>

              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-slate-700">
                Message on WhatsApp
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center">
              <div className="p-6 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <svg className="w-8 h-8 text-gray-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.99.38 1.95.75 2.84a2 2 0 0 1-.45 2.11L8.09 9.91a16.07 16.07 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45c.9.37 1.86.63 2.84.75A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Call us directly</h3>
              <p className="mt-3 text-sm text-gray-500">Speak to someone who knows how to help.</p>

              <a href={`tel:${phone}`} className="mt-6 inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-slate-700">
                Call us
              </a>
            </div>
          </div>

          <div className="mt-12 flex justify-center items-center gap-6">
            <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.9.17 1.9.17v2.1h-1.08c-1.07 0-1.4.66-1.4 1.3V12h2.38l-.38 2.9h-2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>

            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-600 hover:text-green-500">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.5 3.5A10 10 0 0 0 3.7 19.8L2 22l2.3-.6A10 10 0 1 0 20.5 3.5zM12 19.2a7.3 7.3 0 0 1-3.9-1.1l-.3-.2-2.3.6.6-2.2-.2-.3A7.3 7.3 0 1 1 12 19.2z" />
                <path d="M16.2 13.5c-.2-.1-1.2-.6-1.4-.6-.2 0-.3-.1-.4.1s-.5.6-.6.7c-.1.1-.3.2-.6.1-.2-.1-.8-.3-1.5-.9-.6-.6-1-1.4-1.1-1.6-.1-.2 0-.3.1-.4.1-.1.4-.3.6-.5.2-.1.3-.2.4-.4.1-.2 0-.4 0-.6 0-.2-.6-1-0.9-1.4C9.2 7.6 8.6 7.5 8.2 7.5c-.4 0-.9.1-1.4.6-.5.5-.9 1.5-.9 2.9 0 1.4.9 2.8 1 3 .1.2 1.6 2.5 3.9 3.6 2.3 1.1 2.3.8 2.7.7.4-.1 1.5-0.6 1.7-1.1.2-.5.2-1 .1-1.1-.1-.1-1-.3-1.2-.4z" />
              </svg>
            </a>

            <a href={`mailto:${email}`} aria-label="Email" className="text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7.5v9A1.5 1.5 0 0 0 4.5 18h15a1.5 1.5 0 0 0 1.5-1.5v-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 7.5L12 13 3 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

