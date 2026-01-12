"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image' 

const PHONE = '2349162919586'
const MESSAGE = 'Greetings, Mr. Mbc Reaching out from the MBC website'

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)

export default function WhatsAppFloating() {
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    try {
      const r = localStorage.getItem('whatsappPos')
      if (r) return JSON.parse(r)
      const w = typeof window !== 'undefined' ? window.innerWidth : 0
      const h = typeof window !== 'undefined' ? window.innerHeight : 0
      const x = Math.max(8, w - 84) // 64px button + 20px margin
      const y = Math.max(8, h - 84)
      return { x, y }
    } catch {
      return { x: 20, y: 120 }
    }
  })

  const ref = useRef<HTMLButtonElement | null>(null)
  const dragging = useRef(false)
  const start = useRef<{ x: number; y: number; xPos: number; yPos: number } | null>(null)
  const moved = useRef(false)
  const moveHandlerRef = useRef<((e: PointerEvent) => void) | null>(null)
  const upHandlerRef = useRef<((e: PointerEvent) => void) | null>(null)

  useEffect(() => {
    localStorage.setItem('whatsappPos', JSON.stringify(pos))
  }, [pos])



  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (moveHandlerRef.current) document.removeEventListener('pointermove', moveHandlerRef.current)
      if (upHandlerRef.current) document.removeEventListener('pointerup', upHandlerRef.current)
    }
  }, [])

  // ensure it starts bottom-right on full page refresh
  useLayoutEffect(() => {
    try {
      const x = Math.max(8, window.innerWidth - 84) // 64px button + 20px margin
      const y = Math.max(8, window.innerHeight - 84)
      setPos({ x, y })
      localStorage.setItem('whatsappPos', JSON.stringify({ x, y }))
    } catch {}
  }, [])

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault()
    dragging.current = true
    moved.current = false
    start.current = { x: e.clientX, y: e.clientY, xPos: pos.x, yPos: pos.y }
    ref.current?.setPointerCapture?.(e.pointerId)

    moveHandlerRef.current = (ev: PointerEvent) => {
      if (!dragging.current || !start.current) return
      const dx = ev.clientX - start.current.x
      const dy = ev.clientY - start.current.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved.current = true
      const newX = clamp(start.current.xPos + dx, 8, window.innerWidth - 72)
      const newY = clamp(start.current.yPos + dy, 8, window.innerHeight - 72)
      setPos({ x: newX, y: newY })
    }

    upHandlerRef.current = () => {
      dragging.current = false
      start.current = null
      if (moveHandlerRef.current) document.removeEventListener('pointermove', moveHandlerRef.current)
      if (upHandlerRef.current) document.removeEventListener('pointerup', upHandlerRef.current)
      moveHandlerRef.current = null
      upHandlerRef.current = null
    }

    document.addEventListener('pointermove', moveHandlerRef.current!)
    document.addEventListener('pointerup', upHandlerRef.current!)
  }

  function handleClick() {
    if (moved.current) {
      moved.current = false
      return
    }
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`
    window.open(url, '_blank')
  }

  return (
    <button
      ref={ref}
      onPointerDown={onPointerDown}
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-green-600 hover:scale-105 transition-transform focus:outline-none touch-none"
      style={{ left: pos.x, top: pos.y, touchAction: 'none' }}
    >
      <Image src="/whatsapp.svg" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
    </button>
  )
}
