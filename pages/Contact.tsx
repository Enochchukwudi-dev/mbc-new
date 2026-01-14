

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  const email = "info@example.com";
  const phone = "+1234567890";
  const whatsapp = "1234567890"; // international number without plus
  const facebook = "https://facebook.com/yourpage";

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

  return (
    <>
      <Navbar />

      <main className={`min-h-screen pt-14 ${isDark ? 'bg-slate-950' : 'bg-[hsl(20,22%,98%)]'}`}>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Connect</p>
          <h1 className={`mt-4 text-4xl sm:text-5xl font-bold ${isDark ? 'text-amber-50' : 'text-gray-700'}`}>
            Ways to reach us
          </h1>

          <p className={`mt-4 max-w-2xl mx-auto text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Pick the method that works best for you. We&apos;re here either way, ready to listen and help.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Email */}
            <div className={`flex flex-col items-center ${isDark ? 'bg-slate-900/80' : 'bg-[hsl(20,22%,95%)]'}  pt-7 rounded-lg`}>
              <div className={`p-6 rounded-full border  ${isDark ? 'border-yellow-200/20' : 'border-gray-200'}  ${isDark ? 'bg-slate-900/80' : 'bg-white/60'}`}>
                <Mail className={`w-8 h-8 ${isDark ? 'text-yellow-200/80' : 'text-gray-900'}`} />
              </div>

              <h3 className={`mt-6 text-xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Send us an email</h3>
              <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Write what you need and we&apos;ll get back to you promptly.</p>

              <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=marshaluzor4@gmail.com`} target="_blank" rel="noopener noreferrer" className={`mt-6 mb-8 inline-flex items-center px-4 py-2 ${isDark ? 'bg-white/1' : 'bg-white/60'}  ${isDark ? 'text-yellow-200/80' : 'text-black'} ${isDark ? 'border-yellow-200/60' : 'border-gray-400'} border  rounded-md hover:bg-slate-700`}>
                Send an email
              </a>
            </div>

            {/* WhatsApp */}
            <div className={`flex flex-col items-center ${isDark ? 'bg-slate-900/80' : 'bg-[hsl(20,22%,95%)]'}  pt-7 rounded-lg`}>
             <div className={`p-6 rounded-full border  ${isDark ? 'border-yellow-200/20' : 'border-gray-200'}  ${isDark ? 'bg-slate-900/80' : 'bg-white/60'}`}>
                <img src="/whatsapp.svg" alt="WhatsApp" className="w-8 h-8" />
              </div>

              <h3 className={`mt-6 text-xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Message on WhatsApp</h3>
              <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Quick conversations happen best where you already are.</p>

              <a href="https://wa.me/2348064032113?text=Good%20day%20sir%2C%20reaching%20out%20from%20MBC%20website" target="_blank" rel="noopener noreferrer" className="mt-6 mb-8 inline-flex items-center px-4 py-2  bg-green-700 text-white rounded-md hover:bg-slate-700">
                Message on WhatsApp
              </a>
            </div>

            {/* Phone */}
            <div className={`flex flex-col items-center ${isDark ? 'bg-slate-900/80' : 'bg-[hsl(20,22%,95%)]'} pt-7 rounded-lg`}>
              <div className={`p-6 rounded-full border  ${isDark ? 'border-yellow-200/20' : 'border-gray-200'}  ${isDark ? 'bg-slate-900/80' : 'bg-white/60'}`}>
                <Phone className={`w-8 h-8 ${isDark ? 'text-yellow-200/80' : 'text-gray-900'}`} />
              </div>

              <h3 className={`mt-6 text-xl font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Call us directly</h3>
              <p className={`mt-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Speak to someone who knows how to help.</p>

              <a href="tel:+2348064032113" className={`mt-6 mb-8 inline-flex items-center px-4 py-2  ${isDark ? 'bg-white/1' : 'bg-white/60'}  ${isDark ? 'text-yellow-200/80' : 'text-black'} ${isDark ? 'border-yellow-200/60' : 'border-gray-400'} border rounded-md hover:bg-slate-700`}>
                Call us
              </a>
            </div>
          </div>

          <div className="mt-12">
            <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-400' : 'text-gray-900'}`}>Connect via Socials</h2>
            <div className="mt-4 flex justify-center items-center gap-4">
              <a href="https://www.facebook.com/share/1E8UfkCKA9/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 hover:text-blue-600">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.9.17 1.9.17v2.1h-1.08c-1.07 0-1.4.66-1.4 1.3V12h2.38l-.38 2.9h-2v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>

             
          
            </div>
          </div>

        
        </div>
      </main>

      <Footer />
    </>
  );
}

