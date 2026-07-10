'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { useWeddingData, useIsPreview } from '@/context/WeddingDataContext'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'
import SwingDecor from '@/components/ui/SwingDecor'
import EleWalk from '@/components/ui/EleWalk'
import RSVPModal from '@/components/ui/RSVPModal'
import PartyConfetti from '@/components/ui/PartyConfetti'

export default function RSVPSection() {
  const weddingData = useWeddingData()
  const isPreview = useIsPreview()
  const [modalOpen, setModalOpen] = useState(false)
  const [responded, setResponded] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('rsvp-responded') === 'true') setResponded(true)
  }, [])

  const handleSend = (guestCount: number, fullMessage: string) => {
    const whatsappSend = `https://wa.me/${weddingData.rsvp.whatsappNumber}?text=${encodeURIComponent(fullMessage)}`
    window.open(whatsappSend, '_blank')
    setModalOpen(false)
    setResponded(true)
    setShowConfetti(true)
    localStorage.setItem('rsvp-responded', 'true')
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <ParallaxSection
      id="rsvp"
      bgImage="/assets/rsvp-bg.jpg"
      bgOpacity={0.12}
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
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
            {weddingData.rsvpText || '✦   Kindly Reply   ✦'}
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            {weddingData.rsvpHeading || 'RSVP'}
          </motion.h2>

          <motion.div
            variants={scaleIn}
            className="px-8 py-10 rounded-2xl glow-border mb-10"
            style={{ background: 'var(--color-surface2)' }}
          >
            {showConfetti && <PartyConfetti />}
            {responded ? (
              <>
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-display shimmer-text mb-3" style={{ fontSize: '2rem', lineHeight: 1.4, padding: '0.1em 0' }}>
                  Thank You!
                </h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  Your RSVP has been sent. We can&apos;t wait to celebrate with you!
                </p>
              </>
            ) : (
              <>
                {/* Floral accent */}
                <motion.div
                  className="text-4xl mb-5 glow-pulse float-slow"
                  style={{ filter: 'drop-shadow(0 0 16px var(--color-glow-strong))' }}
                >
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="ganesha-backdrop" style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,180,50,0.7) 0%, rgba(245,158,11,0.3) 50%, transparent 75%)', filter: 'blur(10px)' }} />
                    <img loading="lazy" src="/assets/diya.webp" alt="" className="lantern-glow" style={{ width: 48, height: 'auto', position: 'relative', zIndex: 1 }} />
                  </div>
                </motion.div>

                <p className="font-display text-xl md:text-2xl mb-4" style={{ color: 'var(--color-text)', opacity: 0.9 }}>
                  We joyfully await your presence.
                </p>
                <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
                  Please let us know by <span style={{ color: 'var(--color-accent)' }}>{weddingData.rsvpDeadline || weddingData.rsvp.deadline}</span>. Your confirmation helps us ensure the celebrations are as beautiful as the occasion.
                </p>

                <GlowDivider className="mb-8" />

                {/* CTA */}
                <motion.button
                  onClick={() => isPreview ? setShowPurchaseAlert(true) : setModalOpen(true)}
                  className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans text-base font-semibold tracking-wider"
                  style={{ background: 'var(--color-accent2)', color: '#fff', boxShadow: '0 0 30px rgba(192,66,92,0.5)' }}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(192,66,92,0.7)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  RSVP on WhatsApp
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Phone option */}
          <motion.p
            variants={fadeUp}
            className="font-sans text-sm"
            style={{ color: 'var(--color-muted)' }}
          >
            Or call us at{' '}
            <a
              href={`tel:+${weddingData.rsvp.whatsappNumber}`}
              className="glow-text font-semibold"
              style={{ color: 'var(--color-accent)' }}
            >
              {weddingData.rsvp.whatsappNumber}
            </a>
          </motion.p>
        </motion.div>
      </div>

      <RSVPModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSend={handleSend}
        defaultMessage={weddingData.rsvp.message}
        brideName={weddingData.brideName}
        groomName={weddingData.groomName}
      />

      {showPurchaseAlert && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setShowPurchaseAlert(false)}>
          <div className="rounded-2xl p-8 max-w-sm w-full text-center" style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }} onClick={e => e.stopPropagation()}>
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-text)' }}>Purchase Required</h3>
            <p className="font-sans text-sm mb-6" style={{ color: 'var(--color-muted)' }}>You need to purchase this card to send RSVPs.</p>
            <button onClick={() => setShowPurchaseAlert(false)} className="px-6 py-2.5 rounded-full font-sans text-sm font-semibold" style={{ background: 'var(--color-accent)', color: '#080f1a' }}>Close</button>
          </div>
        </div>
      )}
    </ParallaxSection>
  )
}
