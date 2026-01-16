import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'

function About() {
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

      <main className={`min-h-screen pt-20 ${isDark ? 'bg-slate-950' : 'bg-[hsl(20,22%,85%)]'} flex items-start md:items-center lg:items-center justify-center py-8 md:py-12 lg:py-16`}>
        <div className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="md:flex md:items-stretch md:gap-0 lg:gap-0">
              <div className={`md:w-1/2 ${isDark ? 'bg-slate-900' : 'bg-[hsl(20,22%,80%)]'} p-6 md:p-8 lg:p-12 flex items-center justify-center`}>
                <div className="w-full max-w-sm overflow-hidden rounded-xl shadow-md">
                  <Image src="/s2.jpeg" alt="hero" width={640} height={480} className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover" />
                </div>
              </div>

              <div className={`md:w-1/2 px-6 md:px-8 lg:px-10 py-8 md:py-10 lg:py-12 ${isDark ? 'bg-slate-900' : 'bg-[hsl(20,22%,85%)]'} text-left`}>
               <h2 className={`text-lg md:text-xl font-medium ${isDark ? 'text-yellow-100' : 'text-gray-700'}`}>MBC group, Anambra State, 2024</h2>
                <h1 className={`mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>About Us</h1>
                <p className={`mt-3 text-sm sm:text-base md:text-base lg:text-lg ${isDark ? 'text-gray-400' : 'text-gray-800'}`}>
                  Marock Building Construction Enterprise (MBC) is a full-service construction firm with over a decade of experience delivering high-quality residential and commercial projects across Anambra State and the surrounding regions.<br /><br />
                  We manage every phase of the build process, from initial planning and permitting through structural works, roofing, waterproofing, interior/exterior finishing, and final inspections, ensuring projects are completed on time and within budget.<br /><br />
                  Our team of experienced project managers, engineers, and skilled tradespeople prioritize safety, durability, and long-term value by using proven methods and premium materials. We pride ourselves on transparent pricing, responsive communication, and collaborative partnerships with clients, architects, and subcontractors.<br /><br />
                  Whether you need a new build, renovation, or specialist structural and waterproofing work, MBC brings local expertise, professional oversight, and a commitment to excellence to every project. Contact us to schedule a consultation and let us help bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default About

