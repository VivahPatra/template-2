'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const weddingData = useWeddingData()
  const [pct, setPct] = useState(0)
  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 2500
    const tick = (now: number) => {
      const elapsed = now - start
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setPct(next)
      if (next < 100) { frame = requestAnimationFrame(tick) }
      else { onComplete() }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'var(--color-bg)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      {/* Rose glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(192,66,92,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Mandala */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.4, rotate: -60 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer slowly rotating ring */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
            <circle cx="80" cy="80" r="74" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.3"/>
            {/* Diamond ticks around outer ring */}
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <rect
                key={i}
                x="77" y="4"
                width="6" height="6"
                fill={i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent2)'}
                opacity="0.55"
                transform={`rotate(${deg} 80 80) rotate(45 80 7)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Inner counter-rotating ring */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
            <circle cx="80" cy="80" r="54" fill="none" stroke="var(--color-accent2)" strokeWidth="0.6" opacity="0.25" strokeDasharray="4 6"/>
            {/* 8 petals alternating */}
            {[0,45,90,135,180,225,270,315].map((deg, i) => (
              <ellipse
                key={i}
                cx="80" cy="28"
                rx="4" ry="10"
                fill={i % 2 === 0 ? 'var(--color-accent)' : 'var(--color-accent2)'}
                opacity="0.35"
                transform={`rotate(${deg} 80 80)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Innermost static ring */}
        <svg viewBox="0 0 160 160" width="160" height="160" aria-hidden="true" className="relative z-10">
          <circle cx="80" cy="80" r="30" fill="none" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.2"/>
          <rect x="76" y="76" width="8" height="8" fill="var(--color-accent)" opacity="0.4" transform="rotate(45 80 80)"/>
        </svg>

        {/* Center rose */}
        <div
          className="absolute inset-0 flex items-center justify-center text-3xl z-20 glow-pulse"
          style={{ filter: 'drop-shadow(0 0 16px var(--color-glow-strong))' }}
        >
          <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="ganesha-backdrop" style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,180,50,0.7) 0%, rgba(245,158,11,0.3) 50%, transparent 75%)', filter: 'blur(10px)' }} />
            <img src="/assets/diya.webp" alt="" className="lantern-glow" style={{ width: 48, height: 'auto', position: 'relative', zIndex: 1 }} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <p
          className="font-display text-5xl md:text-6xl shimmer-text tracking-widest"
          style={{ letterSpacing: '0.06em' }}
        >
          {weddingData.groomName}
          <span style={{ color: 'var(--color-accent)' }} className="mx-3 glow-text">
            &amp;
          </span>
          {weddingData.brideName}
        </p>
        <p className="font-sans text-xs tracking-[0.35em] uppercase mt-3 opacity-50" style={{ color: 'var(--color-accent)' }}>
          {weddingData.tagline}
        </p>
      </motion.div>

      {/* Gold line draw — triggers onComplete */}
      <motion.div
        className="mt-10 h-px"
        style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)' }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 160, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: 'easeInOut' }}
      />
  
      {/* Percentage */}
      <motion.p
        className="font-sans text-xs tracking-[0.3em] mt-4"
        style={{ color: 'var(--color-accent)', opacity: 0.6 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.3 }}
      >
        {pct}%
      </motion.p>
  </motion.div>
  )
}
