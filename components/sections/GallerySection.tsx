'use client'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import EditableText from '@/components/ui/EditableText'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'
import SwingDecor from '@/components/ui/SwingDecor'
import EleWalk from '@/components/ui/EleWalk'

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 0.5, -2.5, 1]

export default function GallerySection() {
  const weddingData = useWeddingData()
  const { isEditing, editData } = useEditMode()
  const d = isEditing ? editData : weddingData
  return (
    <ParallaxSection
      id="gallery"
      bgImage="/assets/gallery-bg.jpg"
      bgOpacity={0.1}
      style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-28 relative">
        <SwingDecor side="left" />
        <SwingDecor side="right" />
<EleWalk />
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}>✦ &nbsp; Memories &nbsp; ✦</motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Our Gallery
          </motion.h2>
          <GlowDivider className="mt-8 max-w-xs mx-auto" />
        </motion.div>

        {/* Polaroid card layout */}
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        >
          {d.galleryImages.map((img, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              data-cursor-glow
              className="cursor-pointer flex-shrink-0"
              style={{
                background: '#fff',
                padding: '10px 10px 40px',
                boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
                borderRadius: '2px',
                transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
                width: 220,
              }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 20, boxShadow: '0 14px 44px rgba(0,0,0,0.6)' }}
              transition={{ duration: 0.25 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover block"
                style={{ height: img.span === 'tall' ? 200 : 160, filter: 'saturate(0.9)' }}
              />
              <div className="flex justify-center mt-3">
                <img src="/assets/fountain.png" alt="" className="fountain-glow" style={{ width: 28, height: 'auto' }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-center mt-14 font-sans text-sm tracking-widest glow-text"
          style={{ color: 'var(--color-accent)', opacity: 0.6 }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
        >
          <EditableText field="hashtag">{d.hashtag}</EditableText>
        </motion.p>
      </div>
    </ParallaxSection>
  )
}
