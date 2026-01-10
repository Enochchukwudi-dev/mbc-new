import React from 'react'

function Services() {
  const services = [
    { title: 'Interior Design', desc: 'Personalized layouts, finishes, and styling to reflect your taste.', href: '/services/interior' },
    { title: 'Full Renovation', desc: 'Complete home remodels — kitchens, bathrooms, and living spaces.', href: '/services/renovation' },
    { title: 'Extensions & Additions', desc: 'Seamless new rooms, attic conversions, and garage builds.', href: '/services/extensions' },
    { title: 'Roofing & Exteriors', desc: 'Roof replacement, cladding, windows, and external upgrades.', href: '/services/exteriors' },
    { title: 'Commercial Fit-Outs', desc: 'Office and retail build-outs with end-to-end project management.', href: '/services/commercial' },
    { title: 'Plumbing & Electrical', desc: 'Safe rewiring, system upgrades, and plumbing installations.', href: '/services/mep' },
    { title: 'Smart Home & Energy', desc: 'Home automation, solar, insulation, and efficiency improvements.', href: '/services/energy' },
  ]

  return (
    <section className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">7. SERVICES</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">We offer a complete range of services to take your project from concept to completion.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <article key={s.title} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{s.desc}</p>
              <a href={s.href} className="text-green-600 hover:underline">Learn more →</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services