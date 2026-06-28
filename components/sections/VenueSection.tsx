'use client'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

export default function VenueSection() {
  const weddingData = useWeddingData()
  return (
    <ParallaxSection
      id="venue"
      bgImage="/assets/venue-bg.jpg"
      bgOpacity={0.15}
      style={{ background: 'linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface2) 100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 py-28">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
            ✦ &nbsp; Find Us &nbsp; ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Venue
          </motion.h2>
          <GlowDivider className="mt-8 max-w-xs mx-auto" />
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden glow-border"
          style={{ background: 'var(--color-surface)' }}
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Decorative header */}
          <div
            className="relative py-12 px-8 text-center"
            style={{ background: 'linear-gradient(135deg, var(--color-surface2), var(--color-surface))' }}
          >
            <motion.div
              className="text-5xl mb-4 float-slow"
              style={{ filter: 'drop-shadow(0 0 20px var(--color-glow-strong))' }}
            >
              🏛️
            </motion.div>
            <h3 className="font-display text-3xl glow-text mb-2" style={{ color: 'var(--color-accent)' }}>
              {weddingData.venue.name}
            </h3>
            <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
              {weddingData.venue.address}
            </p>
          </div>

          <div className="p-8 text-center">
            <motion.a
              href={weddingData.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-full font-sans text-sm font-semibold tracking-wider uppercase"
              style={{ background: 'var(--color-accent2)', color: '#fff', boxShadow: '0 0 24px rgba(192,66,92,0.4)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(192,66,92,0.6)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span>📍</span> Get Directions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
