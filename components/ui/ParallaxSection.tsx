'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  bgImage?: string
  bgOpacity?: number
  strength?: number
  className?: string
  style?: React.CSSProperties
  id?: string
  overlay?: string
}

export default function ParallaxSection({
  children,
  bgImage,
  bgOpacity = 0.18,
  strength = 0.35,
  className,
  style,
  id,
  overlay = 'linear-gradient(180deg, var(--color-bg) 0%, transparent 30%, transparent 70%, var(--color-bg) 100%)',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength * 40}%`, `${strength * 40}%`])

  return (
    <section ref={ref} id={id} className={cn('relative overflow-hidden', className)} style={style}>
      {bgImage && (
        <motion.div className="absolute inset-0 scale-125" style={{ y }}>
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: bgOpacity }}
          />
          <div className="absolute inset-0" style={{ background: overlay }} />
        </motion.div>
      )}
      {/* Floating glow orbs in bg */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute w-96 h-96 rounded-full blur-[120px]"
          style={{
            background: 'var(--color-glow)',
            opacity: 0.12,
            top: '10%',
            left: '5%',
            animation: 'orbFloat 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-[100px]"
          style={{
            background: 'var(--color-accent2)',
            opacity: 0.08,
            bottom: '15%',
            right: '8%',
            animation: 'orbFloat 16s ease-in-out infinite reverse',
          }}
        />
      </div>
      <img src="/assets/flower.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.5, mixBlendMode: 'overlay', zIndex: 5 }} />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
