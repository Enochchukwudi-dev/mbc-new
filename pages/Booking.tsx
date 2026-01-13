import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'

function Booking() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [isDark, setIsDark] = useState<boolean>(false)
  const phoneErrorTimeoutRef = useRef<number | null>(null)
  const nameErrorTimeoutRef = useRef<number | null>(null)
  const descriptionErrorTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const m = window.matchMedia('(prefers-color-scheme: dark)')
    const check = () => setIsDark(document.documentElement.classList.contains('dark') || m.matches)
    check()
    const handler = () => check()
    if (m.addEventListener) m.addEventListener('change', handler)
    else m.addListener(handler)
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => {
      if (m.removeEventListener) m.removeEventListener('change', handler)
      else m.removeListener(handler)
      observer.disconnect()
      if (phoneErrorTimeoutRef.current) {
        clearTimeout(phoneErrorTimeoutRef.current)
        phoneErrorTimeoutRef.current = null
      }
      if (nameErrorTimeoutRef.current) {
        clearTimeout(nameErrorTimeoutRef.current)
        nameErrorTimeoutRef.current = null
      }
      if (descriptionErrorTimeoutRef.current) {
        clearTimeout(descriptionErrorTimeoutRef.current)
        descriptionErrorTimeoutRef.current = null
      }
    }
  }, [])

  const wordCount = description.trim() === '' ? 0 : description.trim().split(/\s+/).length

  // Phone helpers: count digits, check allowed characters, and whether to show the tick
  const phoneDigits = phone.replace(/\D/g, '').length
  const phoneAllowed = phone === '' ? false : /^[0-9()+\-\s]+$/.test(phone)
  const showPhoneTick = phoneAllowed && phoneDigits >= 11 && phoneDigits <= 15 && !errors.phone

  // Name and Description ticks: show when minimums are met and no error
  const showNameTick = name.trim().length >= 3 && /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name.trim()) && !errors.name
  const showDescTick = description.trim().length >= 5 && !errors.description

  // Ensure input only contains digits and allowed special characters (filter on input)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    // remove anything that's not a digit, space, plus, minus, or parentheses
    const filtered = raw.replace(/[^0-9()+\-\s]/g, '')
    // enforce max 15 characters
    const trimmed = filtered.slice(0, 15)
    setPhone(trimmed)

    // If this makes the phone valid, clear existing phone error immediately
    const digits = trimmed.replace(/\D/g, '').length
    if (errors.phone && /^[0-9()+\-\s]+$/.test(trimmed) && digits >= 11 && digits <= 15) {
      if (phoneErrorTimeoutRef.current) {
        clearTimeout(phoneErrorTimeoutRef.current)
        phoneErrorTimeoutRef.current = null
      }
      setErrors(prev => {
        const { phone, ...rest } = prev
        return rest
      })
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    // allow letters (including latin-1), spaces, hyphens and apostrophes only
    const filtered = raw.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ' -]/g, '')
    setName(filtered)

    // auto-clear name error if it becomes valid
    const trimmed = filtered.trim()
    if (errors.name && /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(trimmed) && trimmed.length >= 3) {
      if (nameErrorTimeoutRef.current) {
        clearTimeout(nameErrorTimeoutRef.current)
        nameErrorTimeoutRef.current = null
      }
      setErrors(prev => {
        const { name, ...rest } = prev
        return rest
      })
    }
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setDescription(val)

    // auto-clear description error when length >= 5 (user requested)
    const trimmed = val.trim()
    if (errors.description && trimmed.length >= 5) {
      if (descriptionErrorTimeoutRef.current) {
        clearTimeout(descriptionErrorTimeoutRef.current)
        descriptionErrorTimeoutRef.current = null
      }
      setErrors(prev => {
        const { description, ...rest } = prev
        return rest
      })
    }
  }

  const validate = () => {
    const e: Record<string, string> = {}
    const nameTrim = name.trim()
    if (!nameTrim) e.name = 'Full name is required.'
    else {
      const allowedName = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/
      if (!allowedName.test(nameTrim)) e.name = "Name may only contain letters, spaces, hyphens and apostrophes."
      else if (nameTrim.length < 3) e.name = 'Full name must be at least 3 characters.'
    }
    if (!phone.trim()) {
      e.phone = 'Phone number is required.'
    } else {
      const allowed = /^[0-9()+\-\s]+$/
      const digitsCount = phone.replace(/\D/g, '').length
      if (phone.length > 15) e.phone = 'Phone cannot exceed 15 characters.'
      else if (!allowed.test(phone)) e.phone = 'Phone may only contain digits and + - ( ) and spaces.'
      else if (digitsCount < 11 || digitsCount > 15) e.phone = 'Phone number must contain 11–15 digits.'
    }
    if (email.trim()) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(email)) e.email = 'Email address looks invalid.'
    }
    if (!description.trim()) e.description = 'Description is required.'
    else if (wordCount > 250) e.description = 'Description exceeds 250 words.'
    setErrors(e)

    // Auto-clear phone error after 3 seconds
    if (e.phone) {
      if (phoneErrorTimeoutRef.current) {
        clearTimeout(phoneErrorTimeoutRef.current)
      }
      phoneErrorTimeoutRef.current = window.setTimeout(() => {
        setErrors(prev => {
          const { phone, ...rest } = prev
          return rest
        })
        phoneErrorTimeoutRef.current = null
      }, 3000)
    }

    // Auto-clear name error after 3 seconds
    if (e.name) {
      if (nameErrorTimeoutRef.current) {
        clearTimeout(nameErrorTimeoutRef.current)
      }
      nameErrorTimeoutRef.current = window.setTimeout(() => {
        setErrors(prev => {
          const { name, ...rest } = prev
          return rest
        })
        nameErrorTimeoutRef.current = null
      }, 3000)
    }

    // Auto-clear description error after 3 seconds
    if (e.description) {
      if (descriptionErrorTimeoutRef.current) {
        clearTimeout(descriptionErrorTimeoutRef.current)
      }
      descriptionErrorTimeoutRef.current = window.setTimeout(() => {
        setErrors(prev => {
          const { description, ...rest } = prev
          return rest
        })
        descriptionErrorTimeoutRef.current = null
      }, 3000)
    }

    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    // Replace with real submit logic as needed
    console.log({ name, phone, email, description })
    setSuccess(true)
    setName('')
    setPhone('')
    setEmail('')
    setDescription('')
    setErrors({})
    if (phoneErrorTimeoutRef.current) {
      clearTimeout(phoneErrorTimeoutRef.current)
      phoneErrorTimeoutRef.current = null
    }
    if (nameErrorTimeoutRef.current) {
      clearTimeout(nameErrorTimeoutRef.current)
      nameErrorTimeoutRef.current = null
    }
    if (descriptionErrorTimeoutRef.current) {
      clearTimeout(descriptionErrorTimeoutRef.current)
      descriptionErrorTimeoutRef.current = null
    }
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <>
      <Navbar />
      <main className={`min-h-screen pt-20 flex items-start ${isDark ? 'bg-slate-950' : 'bg-[hsl(20,22%,91%)]'}`}>
        <div className="max-w-3xl mx-auto px-6 py-12 w-full">
          <div className={`rounded-2xl shadow-lg ring-1 p-8 ${isDark ? 'bg-slate-900/40 ring-gray-800' : 'bg-[hsl(20,22%,93%)] ring-gray-200'}`}>
            <div className="flex items-center justify-between gap-4 ">
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Book Our Services</h1>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tell us a bit about your request and we will respond within 24 hours.</p>
              </div>
              <div className="hidden  items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-sm text-blue-700">
                ✨ Professional Service
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4" noValidate>
              <div className="md:col-span-1">
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Full name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`mt-2 block w-full rounded-lg px-4 py-2 pr-10 border ${errors.name ? 'border-red-400 ring-1 ring-red-500' : 'border-gray-200'} ${isDark ? 'bg-slate-800/40' : 'bg-white/60'} ${isDark ? 'border-slate-800' : 'bg-white/80'} ${isDark ? 'text-gray-100' : 'text-gray-700'} placeholder-gray-400 focus:outline-none focus:ring-1 ${isDark ? 'focus:ring-slate-700' : 'focus:ring-gray-300'} transition`}
                  />
                  {showNameTick && (
                    <img src="/teek.svg" alt="valid" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                  )}
                </div>
                {errors.name && <p id="name-error" className="text-sm text-red-600 mt-2">{errors.name}</p>}
              </div> 

              <div className="md:col-span-1">
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Phone <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="tel"
                    maxLength={15}
                    placeholder="e.g 0916291XXXXX"
                    value={phone}
                    onChange={handlePhoneChange}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    className={`mt-2 block w-full rounded-lg px-4 py-2 pr-10 border ${errors.phone ? 'border-red-400 ring-1 ring-red-500' : 'border-gray-200'} ${isDark ? 'bg-slate-800/40' : 'bg-white/60'} ${isDark ? 'border-slate-800' : 'bg-white/80'} ${isDark ? 'text-gray-100' : 'text-gray-700'} placeholder-gray-400 focus:outline-none focus:ring-1  ${isDark ? 'focus:ring-slate-700' : 'focus:ring-gray-300'} transition`}
                  />
                  {showPhoneTick && (
                    <img src="/teek.svg" alt="valid" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                  )}
                </div>
                {errors.phone && <p id="phone-error" className="text-sm text-red-600 mt-2">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Email <span className="text-gray-500">(optional)</span></label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`mt-2 block w-full rounded-lg px-4 py-2 border ${errors.email ? 'border-red-400 ring-1 ring-red-200' : 'border-gray-200'} ${isDark ? 'bg-slate-800/40' : 'bg-white/60'} ${isDark ? 'border-slate-800' : 'bg-white/80'}  ${isDark ? 'text-gray-100' : 'text-gray-700'} placeholder-gray-400 focus:outline-none focus:ring-1 ${isDark ? 'focus:ring-slate-700' : 'focus:ring-gray-300'} transition`}
                />
                {errors.email && <p id="email-error" className="text-sm text-red-600 mt-2">{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                <label className={`block text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>Description <span className="text-gray-500">(250 words max)</span></label>
                <div className="relative">
                  <textarea
                    placeholder="Briefly describe your request (max 250 words)"
                    value={description}
                    onChange={handleDescriptionChange}
                    rows={6}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? 'desc-error' : undefined}
                    className={`mt-2 block w-full rounded-lg px-4 py-3 pr-10 border ${errors.description ? 'border-red-400 ring-1 ring-red-500' : 'border-gray-200'} ${isDark ? 'bg-slate-800/40' : 'bg-white/60'} ${isDark ? 'border-slate-800' : 'bg-white/80'} ${isDark ? 'text-gray-100' : 'text-gray-700'} placeholder-gray-400 focus:outline-none focus:ring-1  ${isDark ? 'focus:ring-slate-700' : 'focus:ring-gray-300'} transition resize-none`}
                  />
                  {showDescTick && (
                    <img src="/teek.svg" alt="valid" className="absolute right-3 top-3 w-4 h-4" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-500">Words: {wordCount}/250</p>
                  {errors.description && <p id="desc-error" className="text-sm text-red-600">{errors.description}</p>}
                </div>
              </div>

              <div className="md:col-span-2 flex items-center gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition"
                >
                  Submit Request
                </button>

                {success && (
                  <div role="status" className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-green-50 text-green-700 border border-green-100">
                    <span className="text-lg">✅</span>
                    <span className="text-sm">Request submitted — we will contact you soon.</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Booking