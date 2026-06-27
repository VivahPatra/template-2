'use client'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { formatDate } from '@/lib/utils'
import SwingDecor from '@/components/ui/SwingDecor'
import EleWalk from '@/components/ui/EleWalk'

function KasvuCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 52 52"
      width="44"
      aria-hidden="true"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
    >
      <path d="M6,46 Q24,-6 48,14" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" opacity="0.35"/>
      <path d="M6,38 Q18,10 38,18" fill="none" stroke="var(--color-accent2)" strokeWidth="0.5" opacity="0.2"/>
      <line x1="4" y1="30" x2="20" y2="30" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.25"/>
      <line x1="4" y1="34" x2="16" y2="34" stroke="var(--color-accent)" strokeWidth="0.4" opacity="0.18"/>
      <rect x="4" y="44" width="4" height="4" fill="var(--color-accent)" opacity="0.4" transform="rotate(45 6 46)"/>
    </svg>
  )
}

export default function InvitationSection() {
  const weddingData = useWeddingData()
  return (
    <ParallaxSection
      bgImage="/assets/invitation-bg.jpg"
      bgOpacity={0.1}
      style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-surface) 100%)' }}
    >
      <div className="max-w-2xl mx-auto px-6 py-28 text-center relative">
        <SwingDecor side="left" />
        <SwingDecor side="right" />
<EleWalk />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p
            variants={fadeUp}
            className="font-sans text-xs tracking-[0.4em] uppercase mb-6 glow-pulse"
            style={{ color: 'var(--color-accent)', opacity: 0.7 }}
          >
            {weddingData.invitationSubtitle || '✦   With Joy   ✦'}
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display shimmer-text mb-10"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1 }}
          >
            {weddingData.invitationHeading || 'You Are Invited'}
          </motion.h2>

          {/* Ornate card with Kasavu SVG corners */}
          <motion.div
            variants={fadeUp}
            data-cursor-glow
            className="relative px-8 py-10 rounded-2xl glow-border"
            style={{ background: 'var(--color-surface2)' }}
            whileHover={{ boxShadow: '0 0 50px var(--color-glow), 0 0 100px var(--color-glow)' }}
            transition={{ duration: 0.4 }}
          >
            {/* Kasavu SVG corners */}
            <div className="absolute top-3 left-3"><KasvuCorner /></div>
            <div className="absolute top-3 right-3"><KasvuCorner flip /></div>
            <div className="absolute bottom-3 left-3" style={{ transform: 'scaleY(-1)' }}><KasvuCorner /></div>
            <div className="absolute bottom-3 right-3" style={{ transform: 'scale(-1,-1)' }}><KasvuCorner /></div>

            {/* Top kasavu rule */}
            <svg viewBox="0 0 300 10" width="100%" style={{ maxWidth: 280 }} className="mx-auto mb-6" aria-hidden>
              <line x1="0"   y1="5" x2="110" y2="5" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.35"/>
              <rect x="128" y="2" width="6" height="6" fill="var(--color-accent)" opacity="0.52" transform="rotate(45 131 5)"/>
              <line x1="152" y1="5" x2="300" y2="5" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.35"/>
            </svg>

            <div className="flex flex-col items-center mb-3">
              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="ganesha-backdrop" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,210,80,0.75) 0%, rgba(201,168,76,0.35) 55%, transparent 75%)', filter: 'blur(10px)' }} />
                <img src="/assets/ganesha.gif" alt="Ganesha" className="ganesha-glow" style={{ width: 58, height: 'auto', position: 'relative', zIndex: 1 }} />
              </div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase mt-2 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.55 }}>
                {weddingData.invitationBlessing || '॥ Shree Ganeshaya Namah ॥'}
              </p>
            </div>

            {/* Couple names */}
            <div className="flex items-center justify-center gap-3 my-5">
              <div className="text-center">
                <span className="font-display shimmer-text block" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                  {weddingData.groomName}
                </span>
                {weddingData.groomParents && (
                  <p className="font-sans text-xs tracking-wide mt-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
                    {weddingData.groomFirst === false ? 'Daughter' : 'Son'} of {weddingData.groomParents}
                  </p>
                )}
              </div>
              <span className="font-display glow-text-strong float-slow" style={{ color: 'var(--color-accent2)', fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>
                &amp;
              </span>
              <div className="text-center">
                <span className="font-display shimmer-text block" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)' }}>
                  {weddingData.brideName}
                </span>
                {weddingData.brideParents && (
                  <p className="font-sans text-xs tracking-wide mt-1" style={{ color: 'var(--color-muted)', opacity: 0.7 }}>
                    {weddingData.groomFirst === false ? 'Son' : 'Daughter'} of {weddingData.brideParents}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom kasavu rule */}
            <svg viewBox="0 0 300 10" width="100%" style={{ maxWidth: 280 }} className="mx-auto mb-6" aria-hidden>
              <line x1="0"   y1="5" x2="110" y2="5" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.35"/>
              <rect x="128" y="2" width="6" height="6" fill="var(--color-accent)" opacity="0.52" transform="rotate(45 131 5)"/>
              <line x1="152" y1="5" x2="300" y2="5" stroke="var(--color-accent)" strokeWidth="0.6" opacity="0.35"/>
            </svg>

            <p
              className="font-display text-lg md:text-xl leading-relaxed mb-6"
              style={{ color: 'var(--color-text)', opacity: 0.85 }}
            >
              {weddingData.invitationText}
            </p>

            <GlowDivider className="my-6" />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 font-sans text-sm tracking-wide" style={{ color: 'var(--color-accent)', opacity: 0.75 }}>
              <span>📅 &nbsp; {formatDate(weddingData.weddingDate)}</span>
              <span className="hidden sm:block opacity-30">◆</span>
              <span>✉️ &nbsp; {weddingData.hashtag}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}
