'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'
import SwingDecor from '@/components/ui/SwingDecor'
import EleWalk from '@/components/ui/EleWalk'

export default function GallerySection() {
  const weddingData = useWeddingData()
  const [selected, setSelected] = useState<number | null>(null)
  const images = weddingData.galleryImages

  return (
    <>
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

          <motion.div
            className="columns-2 md:columns-3 gap-3 space-y-3"
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                data-cursor-glow
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl"
                style={{ border: '1px solid rgba(200,146,42,0.15)' }}
                onClick={() => setSelected(i)}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(200,146,42,0.2)' }}
                transition={{ duration: 0.25 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1' }}
                  loading="lazy"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }}>
                  <div className="absolute bottom-3 left-3">
                    <p className="font-sans text-[10px] text-white/80">{i + 1} / {images.length}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-center mt-14 font-sans text-sm tracking-widest glow-text"
            style={{ color: 'var(--color-accent)', opacity: 0.6 }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 0.6 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.8 }}
          >
            {weddingData.hashtag}
          </motion.p>
        </div>
      </ParallaxSection>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.img
              src={images[selected]?.src}
              alt={images[selected]?.alt}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            />
            <div className="absolute bottom-6 flex items-center gap-4">
              <button onClick={e => { e.stopPropagation(); setSelected(p => p !== null ? (p - 1 + images.length) % images.length : 0) }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white"
                style={{ background: 'rgba(255,255,255,0.1)' }}>←</button>
              <span className="font-sans text-xs text-white/50">{selected + 1} / {images.length}</span>
              <button onClick={e => { e.stopPropagation(); setSelected(p => p !== null ? (p + 1) % images.length : 0) }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white"
                style={{ background: 'rgba(255,255,255,0.1)' }}>→</button>
            </div>
            <button onClick={() => setSelected(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white text-xl"
              style={{ background: 'rgba(255,255,255,0.1)' }}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
