'use client'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import EditableText from '@/components/ui/EditableText'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

export default function VenueSection() {
  const weddingData = useWeddingData()
  const { isEditing, editData } = useEditMode()
  const d = isEditing ? editData : weddingData
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
            <EditableText field="venue.name" tag="h3" className="font-display text-3xl glow-text mb-2" style={{ color: 'var(--color-accent)' }}>
              {d.venue.name}
            </EditableText>
            <EditableText field="venue.address" tag="p" className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
              {d.venue.address}
            </EditableText>
          </div>

          {/* Event quick list */}
          <div className="p-8">
            <p className="font-sans text-xs tracking-widest uppercase mb-6 text-center" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>
              Events at this Venue
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {d.events
                .filter((e) => e.venue === d.venue.name)
                .map((event) => (
                  <a
                    key={event.id}
                    href={`https://maps.google.com/?q=${encodeURIComponent(event.venue + ', ' + event.venueAddress)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:opacity-80 transition-opacity"
                    style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-border)', minWidth: 200 }}
                  >
                    <span className="text-xl float-emoji">{event.emoji}</span>
                    <div>
                      <p className="font-display text-base" style={{ color: 'var(--color-text)' }}>{event.name}</p>
                      <p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>{event.date} · {event.time}</p>
                      <p className="font-sans text-xs mt-0.5" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>📍 {event.venueAddress}</p>
                    </div>
                  </a>
                ))}
            </div>

            <GlowDivider className="my-8" />

            {/* Get Directions */}
            <div className="text-center">
              <motion.a
                href={d.venue.mapUrl}
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
          </div>
        </motion.div>

        {/* Other event venues */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {d.events
            .filter((e) => e.venue !== d.venue.name)
            .map((event) => (
              <motion.a
                key={event.id}
                variants={fadeUp}
                href={`https://maps.google.com/?q=${encodeURIComponent(event.venue + ', ' + event.venueAddress)}`}
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-4 rounded-xl glow-border hover:opacity-80 transition-opacity"
                style={{ background: 'var(--color-surface)', minWidth: 240, flex: '1 1 240px', maxWidth: 320 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl float-emoji">{event.emoji}</span>
                  <h4 className="font-display text-lg" style={{ color: event.color || 'var(--color-accent)' }}>{event.name}</h4>
                </div>
                <p className="font-sans text-sm font-medium mb-1" style={{ color: 'var(--color-text)', opacity: 0.85 }}>{event.venue}</p>
                <p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>{event.venueAddress}</p>
                <p className="font-sans text-xs mt-1" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>📍 {event.date} · {event.time}</p>
              </motion.a>
            ))}
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
