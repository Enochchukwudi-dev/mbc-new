"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image' 

const PHONE = '2348064032113'
const MESSAGE = 'Greetings, Mr. Mbc Reaching out from the MBC website'

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b)

export default function WhatsAppFloating() {
  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    // always start bottom-right on load (avoids calling setState in an effect)
    const w = typeof window !== 'undefined' ? window.innerWidth : 0
    const h = typeof window !== 'undefined' ? window.innerHeight : 0
    const x = Math.max(8, w - 84) // 64px button + 20px margin
    const y = Math.max(8, h - 84)
    return { x, y }
  })

  const ref = useRef<HTMLButtonElement | null>(null)
  const dragging = useRef(false)
  const start = useRef<{ x: number; y: number; xPos: number; yPos: number } | null>(null)
  const moved = useRef(false)
  const moveHandlerRef = useRef<((e: PointerEvent) => void) | null>(null)
  const upHandlerRef = useRef<(() => void) | null>(null)
  const thresholdRef = useRef<number>(3)
  // anchor to bottom-right on initial load; switch to left/top after first drag
  const [anchored, setAnchored] = useState(true)

  useEffect(() => {
    localStorage.setItem('whatsappPos', JSON.stringify(pos))
  }, [pos])



  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (moveHandlerRef.current) document.removeEventListener('pointermove', moveHandlerRef.current)
      if (upHandlerRef.current) {
        document.removeEventListener('pointerup', upHandlerRef.current)
        document.removeEventListener('pointercancel', upHandlerRef.current)
      }
    }
  }, [])



  // keep within bounds on window resize
  useEffect(() => {
    function onResize() {
      setPos((p) => {
        const newX = clamp(p.x, 8, window.innerWidth - 72)
        const newY = clamp(p.y, 8, window.innerHeight - 72)
        if (newX === p.x && newY === p.y) return p
        const next = { x: newX, y: newY }
        localStorage.setItem('whatsappPos', JSON.stringify(next))
        return next
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault()
    dragging.current = true
    moved.current = false
    thresholdRef.current = e.pointerType === 'touch' ? 8 : 3

    // If still anchored to bottom-right, initialize pos to bottom-right now
    if (anchored) {
      const x = Math.max(8, window.innerWidth - 84)
      const y = Math.max(8, window.innerHeight - 84)
      // set state so subsequent drags use left/top positioning
      setPos({ x, y })
      setAnchored(false)
      start.current = { x: e.clientX, y: e.clientY, xPos: x, yPos: y }
    } else {
      start.current = { x: e.clientX, y: e.clientY, xPos: pos.x, yPos: pos.y }
    }

    try {
      ref.current?.setPointerCapture?.(e.pointerId)
    } catch {}
    ref.current?.classList.add('cursor-grabbing')

    moveHandlerRef.current = (ev: PointerEvent) => {
      if (!dragging.current || !start.current) return
      const dx = ev.clientX - start.current.x
      const dy = ev.clientY - start.current.y
      if (Math.abs(dx) > thresholdRef.current || Math.abs(dy) > thresholdRef.current) moved.current = true
      const newX = clamp(start.current.xPos + dx, 8, window.innerWidth - 72)
      const newY = clamp(start.current.yPos + dy, 8, window.innerHeight - 72)
      setPos({ x: newX, y: newY })
    }

    upHandlerRef.current = () => {
      dragging.current = false
      start.current = null
      ref.current?.classList.remove('cursor-grabbing')
      if (moveHandlerRef.current) document.removeEventListener('pointermove', moveHandlerRef.current)
      if (upHandlerRef.current) {
        document.removeEventListener('pointerup', upHandlerRef.current)
        document.removeEventListener('pointercancel', upHandlerRef.current)
      }
      moveHandlerRef.current = null
      upHandlerRef.current = null
    }

    document.addEventListener('pointermove', moveHandlerRef.current!)
    document.addEventListener('pointerup', upHandlerRef.current!)
    document.addEventListener('pointercancel', upHandlerRef.current!)
  }

  function handleClick() {
    if (moved.current) {
      moved.current = false
      return
    }
    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`
    window.open(url, '_blank')
  }

  // choose style: anchored bottom-right initially, switch to left/top after user interaction
  const style: React.CSSProperties = anchored
    ? { right: 20, bottom: 20, touchAction: 'none', userSelect: 'none' }
    : { left: pos.x, top: pos.y, touchAction: 'none', userSelect: 'none' }

  return (
    <button
      ref={ref}
      onPointerDown={onPointerDown}
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed z-50 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg bg-green-600 hover:scale-105 transition-transform focus:outline-none touch-none cursor-grab select-none"
      style={style}
    >
      <Image src="/whatsapp.svg" alt="WhatsApp" width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
    </button>
  )
}
