import React, { useState } from 'react'
import Navbar from '../components/Navbar'

function Booking() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const wordCount = description.trim() === '' ? 0 : description.trim().split(/\s+/).length

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Full name is required.'
    if (!phone.trim()) e.phone = 'Phone number is required.'
    if (email.trim()) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(email)) e.email = 'Email address looks invalid.'
    }
    if (wordCount > 250) e.description = 'Description exceeds 250 words.'
    setErrors(e)
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
    setTimeout(() => setSuccess(false), 5000)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Book Us</h1>
          <p className="mt-4 text-gray-600">Fill out the form and we'll get back to you.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
              />
              {errors.name && <p id="name-error" className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
              />
              {errors.phone && <p id="phone-error" className="text-sm text-red-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email <span className="text-gray-500">(optional)</span></label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
              />
              {errors.email && <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description <span className="text-gray-500">(250 words max)</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? 'desc-error' : undefined}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2"
              />
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-500">Words: {wordCount}/250</p>
                {errors.description && <p id="desc-error" className="text-sm text-red-600">{errors.description}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded shadow"
              >
                Submit
              </button>
              {success && <p className="text-sm text-green-600">Request submitted — we'll contact you soon.</p>}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export default Booking