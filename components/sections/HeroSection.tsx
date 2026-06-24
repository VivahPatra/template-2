'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function HeroSection() {
  const weddingData = useWeddingData()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imgScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.18])
  const imgY     = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const cloudY   = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])
  const cloudX   = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <section ref={ref} className="relative flex items-center justify-center overflow-hidden min-h-screen md:min-h-screen" style={{ minHeight: '100vh' }}>

      {/* Parallax background — palace at bottom, contain to avoid crop */}
      <div className="absolute inset-0">
        <motion.img
          src="/assets/palace.png"
          alt=""
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            filter: 'brightness(0.55) saturate(0.95)',
            translateX: '-50%',
            scale: imgScale,
            y: imgY,
          }}
        />
        <div className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(192,66,92,0.18) 0%, transparent 60%), linear-gradient(180deg, var(--color-bg) 0%, transparent 30%, transparent 65%, var(--color-bg) 100%)',
          }} />
      </div>

      {/* Drifting clouds — one direction + scroll parallax */}
      <motion.div className="absolute pointer-events-none" style={{ top: 0, bottom: 0, left: '-20%', right: '-20%', y: cloudY, x: cloudX }} aria-hidden>
        <img src="/assets/clds.png" alt="" style={{ position: 'absolute', top: '2%', left: '-5%', width: 180, height: 'auto', opacity: 0.5 }} />
        <img src="/assets/clds.png" alt="" style={{ position: 'absolute', top: '8%', left: '30%', width: 200, height: 'auto', opacity: 0.45 }} />
        <img src="/assets/clds.png" alt="" style={{ position: 'absolute', top: '5%', left: '65%', width: 160, height: 'auto', opacity: 0.5 }} />
        <img src="/assets/clds.png" alt="" style={{ position: 'absolute', top: '14%', left: '10%', width: 140, height: 'auto', opacity: 0.4 }} />
        <img src="/assets/clds.png" alt="" style={{ position: 'absolute', top: '12%', left: '80%', width: 150, height: 'auto', opacity: 0.4 }} />
        <img src="/assets/clds.png" alt="" style={{ position: 'absolute', top: '20%', left: '45%', width: 170, height: 'auto', opacity: 0.35 }} />
      </motion.div>

      {/* Decorative rings — hidden on mobile */}
      <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none" aria-hidden>
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full rotate-slow"
          style={{ border: '1px solid var(--color-accent)', opacity: 0.08 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute w-[440px] h-[440px] rounded-full rotate-slow"
          style={{ border: '1px dashed var(--color-accent)', opacity: 0.12, animationDirection: 'reverse' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute w-96 h-96 rounded-full blur-[120px] float-slow"
          style={{ background: 'var(--color-accent2)', opacity: 0.15, top: '15%', left: '10%' }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-[100px] float-med"
          style={{ background: 'var(--color-accent)', opacity: 0.1, bottom: '20%', right: '8%' }}
        />
      </div>

      {/* Text — rises up as palace zooms in */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ y: textY, opacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeUp}
          className="font-sans text-xs tracking-[0.4em] uppercase mt-12 mb-8 glow-pulse"
          style={{ color: 'var(--color-accent)', opacity: 0.7 }}
        >
          {weddingData.heroSubtitle || '✦   Together Forever   ✦'}
        </motion.p>

        <motion.div variants={fadeUp} className="mb-6">
          <h1 className="font-display leading-none shimmer-text" style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)' }}>
            {weddingData.groomName}
          </h1>
          <span
            className="block my-2 glow-text-strong float-slow font-display"
            style={{ color: 'var(--color-accent2)', fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}
          >
            &amp;
          </span>
          <h1 className="font-display leading-none shimmer-text" style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)' }}>
            {weddingData.brideName}
          </h1>
        </motion.div>

        <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, var(--color-accent))' }} />
          <span className="font-sans text-sm tracking-[0.25em] uppercase" style={{ color: 'var(--color-accent)', opacity: 0.8 }}>
            15 November 2026
          </span>
          <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, var(--color-accent))' }} />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-sans text-base opacity-60 tracking-widest"
          style={{ color: 'var(--color-text)' }}
        >
          {weddingData.tagline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-16 flex flex-col items-center gap-2"
          style={{ opacity: 0.4 }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-accent)' }}>Scroll</span>
          <motion.div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.6, 0.1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
