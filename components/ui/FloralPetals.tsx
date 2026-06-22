'use client'
import { useEffect, useState } from 'react'

type Petal = { id: number; left: number; delay: number; duration: number; size: number; rotation: number; type: number }

const PETALS = [
  // Rose petal
  <svg key="r" viewBox="0 0 20 24" fill="currentColor"><path d="M10 0C5 0 2 5 2 10c0 6 4 12 8 14 4-2 8-8 8-14C18 5 15 0 10 0z"/></svg>,
  // Lotus
  <svg key="l" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s-8-6-8-13c0-4 3-7 8-7s8 3 8 7c0 7-8 13-8 13z"/><path d="M4 9C2 9 1 11 1 13c0 4 3 7 3 7s4-3 4-7c0-2-1-4-4-4z" opacity=".6"/><path d="M20 9c2 0 3 2 3 4 0 4-3 7-3 7s-4-3-4-7c0-2 1-4 4-4z" opacity=".6"/></svg>,
  // Star
  <svg key="s" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>,
]

function makePetals(n: number): Petal[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 14,
    duration: 9 + Math.random() * 9,
    size: 10 + Math.random() * 12,
    rotation: Math.random() * 360,
    type: Math.floor(Math.random() * 3),
  }))
}

export default function FloralPetals({ count = 22 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([])
  useEffect(() => setPetals(makePetals(count)), [count])
  if (!petals.length) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: -80,
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            color: 'var(--color-accent)',
            opacity: 0.45,
            animationName: 'petalFall, petalSway',
            animationDuration: `${p.duration}s, ${p.duration * 0.65}s`,
            animationDelay: `${p.delay}s, ${p.delay * 0.4}s`,
            animationTimingFunction: 'linear, ease-in-out',
            animationIterationCount: 'infinite',
            transform: `rotate(${p.rotation}deg)`,
            filter: 'drop-shadow(0 0 4px var(--color-glow))',
          }}
        >
          {PETALS[p.type]}
        </div>
      ))}
    </div>
  )
}
