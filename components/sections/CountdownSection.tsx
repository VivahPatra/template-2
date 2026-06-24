'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import SwingDecor from '@/components/ui/SwingDecor'
import EleWalk from '@/components/ui/EleWalk'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function CountdownSection() {
  const weddingData = useWeddingData()
  const [time, setTime] = useState(getTimeLeft(weddingData.weddingDate))

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(weddingData.weddingDate)), 1000)
    return () => clearInterval(id)
  }, [weddingData.weddingDate])

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ]

  return (
    <ParallaxSection
      id="countdown"
      bgImage="/assets/countdown-bg.jpg"
      bgOpacity={0.12}
      style={{ background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface2) 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 py-28 text-center relative">
        <SwingDecor side="left" />
        <SwingDecor side="right" />
<EleWalk />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
            ✦ &nbsp; Counting Down &nbsp; ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            The Big Day
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-sm tracking-widest mb-12" style={{ color: 'var(--color-muted)' }}>
            November 15, 2026 · Mumbai
          </motion.p>

          {/* Countdown grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
            variants={staggerContainer}
          >
            {units.map(({ label, value }) => (
              <motion.div
                key={label}
                variants={scaleIn}
                className="relative px-4 py-6 rounded-2xl glow-border overflow-hidden"
                style={{ background: 'var(--color-surface)' }}
              >
                {/* Bg glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 100%, rgba(232,160,180,0.08) 0%, transparent 70%)' }}
                />
                <motion.p
                  key={value}
                  className="font-display glow-text-strong relative z-10"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', color: 'var(--color-accent)', lineHeight: 1 }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(value).padStart(2, '0')}
                </motion.p>
                <p className="font-sans text-xs tracking-[0.2em] uppercase mt-3 relative z-10" style={{ color: 'var(--color-muted)' }}>
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <GlowDivider className="max-w-xs mx-auto mb-10" />

          <motion.p variants={fadeUp} className="font-display text-xl md:text-2xl" style={{ color: 'var(--color-text)', opacity: 0.75 }}>
            Until we say{' '}
            <span className="shimmer-text">forever</span>
          </motion.p>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
