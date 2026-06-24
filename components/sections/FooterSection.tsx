'use client'
import { motion } from 'framer-motion'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, staggerContainer } from '@/lib/animations'

export default function FooterSection() {
  const weddingData = useWeddingData()
  return (
    <footer
      className="relative overflow-hidden py-24 text-center"
      style={{ background: 'linear-gradient(180deg, var(--color-surface2) 0%, var(--color-bg) 100%)' }}
    >
      {/* Bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(192,66,92,0.12) 0%, transparent 70%)' }}
      />

      {/* Elephant walking */}
      <div className="absolute bottom-4 right-4 pointer-events-none z-10" aria-hidden>
        <img src="/assets/doli.png" alt="" className="w-[140px] sm:w-[240px] md:w-[300px]" style={{ height: 'auto', opacity: 0.6, filter: 'brightness(1.1)' }} />
      </div>

      <div className="relative z-10 max-w-xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Rose */}
          <motion.div
            variants={fadeUp}
            className="mb-6 float-slow flex justify-center"
            style={{ filter: 'drop-shadow(0 0 20px var(--color-glow-strong))' }}
          >
            <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="ganesha-backdrop" style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,180,50,0.7) 0%, rgba(245,158,11,0.3) 50%, transparent 75%)', filter: 'blur(14px)' }} />
              <img src="/assets/diya.png" alt="" className="lantern-glow" style={{ width: 112, height: 'auto', position: 'relative', zIndex: 1 }} />
            </div>
          </motion.div>

          {/* Names */}
          <motion.h2
            variants={fadeUp}
            className="font-display shimmer-text mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: 1.1 }}
          >
            {weddingData.groomName}
            <span className="mx-3 float-slow" style={{ color: 'var(--color-accent2)', fontSize: '0.65em' }}>&amp;</span>
            {weddingData.brideName}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-sans text-sm tracking-[0.3em] uppercase mb-2"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            {weddingData.tagline}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-sans text-xs tracking-wider mt-2 mb-8"
            style={{ color: 'var(--color-muted)' }}
          >
            November 15, 2026 · Mumbai
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            className="h-px w-32 mx-auto mb-8"
            style={{ background: 'linear-gradient(to right, transparent, var(--color-accent), transparent)', opacity: 0.4 }}
          />

          {/* Hashtag */}
          <motion.p
            variants={fadeUp}
            className="font-display text-xl glow-text mb-6"
            style={{ color: 'var(--color-accent)' }}
          >
            {weddingData.hashtag}
          </motion.p>

          {/* Social */}
          {weddingData.socialLinks?.instagram && (
            <motion.div variants={fadeUp} className="flex justify-center mb-10">
              <motion.a
                href={weddingData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 rounded-full font-sans text-sm"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-accent)', background: 'var(--color-surface)' }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--color-glow)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Follow our journey
              </motion.a>
            </motion.div>
          )}

          {/* Made with love */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-xs"
            style={{ color: 'var(--color-muted)', opacity: 0.4 }}
          >
            Made with ❤️ for our special day
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
