"use client";

import React, { useState } from "react";
import Menu from "../components/Menu";
import Footer from "./Footer";

export default function Booking() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState<number>(1);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [minDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your full name";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) e.email = "Please enter a valid email";
    if (!date) e.date = "Please select a date";
    if (!time) e.time = "Please select a time";
    if (!guests || Number(guests) < 1) e.guests = "Please enter number of guests";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    // Simulate submit
    setSubmitted(true);
    // In real app you'd post to an API here
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
    setGuests(1);
    setNotes("");
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 sticky top-0 z-20 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Booking</h1>
          <Menu />
        </div>
      </header>

      <main className="flex-1 bg-[#f6f4f1] py-12">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white shadow rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-2">Reserve a Table</h2>
            <p className="text-sm text-gray-600 mb-6">Fill out the form and we will confirm your booking via email.</p>

            {submitted ? (
              <div className="rounded-md border border-emerald-200 bg-emerald-50 p-6">
                <h3 className="text-lg font-semibold text-emerald-800">Thanks, {name || "Guest"} ✅</h3>
                <p className="mt-2 text-sm text-emerald-700">Your booking is requested for <strong>{date}</strong> at <strong>{time}</strong> for <strong>{guests}</strong> guest(s).</p>
                <p className="mt-2 text-sm text-gray-700">A confirmation will be sent to <strong>{email}</strong>.</p>

                <div className="mt-4 flex gap-2">
                  <button onClick={handleReset} className="rounded-md bg-gray-900 text-white px-4 py-2">Make another booking</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                      placeholder="Jane Doe"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone (optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                      placeholder="+1 555-555-5555"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Guests</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none ${errors.guests ? 'border-red-400' : 'border-gray-300'}`}
                      aria-invalid={!!errors.guests}
                    />
                    {errors.guests && <p className="text-xs text-red-500 mt-1">{errors.guests}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none ${errors.date ? 'border-red-400' : 'border-gray-300'}`}
                      aria-invalid={!!errors.date}
                    />
                    {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`w-full rounded-md border px-3 py-2 focus:outline-none ${errors.time ? 'border-red-400' : 'border-gray-300'}`}
                      aria-invalid={!!errors.time}
                    />
                    {errors.time && <p className="text-xs text-red-500 mt-1">{errors.time}</p>}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
                    rows={4}
                    placeholder="Any dietary requirements or requests"
                  />
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button type="submit" className="rounded-md bg-gray-900 text-white px-5 py-2">Request Booking</button>
                  <button type="button" onClick={handleReset} className="rounded-md border border-gray-300 px-4 py-2">Reset</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}