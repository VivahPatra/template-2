'use client'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { weddingData } from '@/data/wedding-data'
import { fadeUp, slideLeft, slideRight, staggerContainer } from '@/lib/animations'
import SwingDecor from '@/components/ui/SwingDecor'
import EleWalk from '@/components/ui/EleWalk'

function StoryCard({ milestone }: { milestone: (typeof weddingData.coupleStory)[0] }) {
  return (
    <motion.div
      data-cursor-glow
      className="px-6 py-5 rounded-xl glow-border"
      style={{ background: 'var(--color-surface)' }}
      whileHover={{ boxShadow: '0 0 50px var(--color-glow), 0 0 25px var(--color-glow-strong)' }}
      transition={{ duration: 0.3 }}
    >
      {milestone.image && (
        <div className="relative h-36 rounded-lg overflow-hidden mb-4">
          <img src={milestone.image} alt={milestone.title} className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, var(--color-surface) 100%)' }} />
        </div>
      )}
      <h3 className="font-display text-xl mb-2 glow-text" style={{ color: 'var(--color-accent)' }}>
        {milestone.title}
      </h3>
      <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        {milestone.description}
      </p>
    </motion.div>
  )
}

export default function CoupleStory() {
  return (
    <ParallaxSection
      id="story"
      bgImage="/assets/story-bg.jpg"
      bgOpacity={0.1}
      style={{ background: 'linear-gradient(180deg, var(--color-surface2) 0%, var(--color-bg) 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-6 py-28 relative">
        <SwingDecor side="left" />
        <SwingDecor side="right" />
<EleWalk />
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
            ✦ &nbsp; Our Journey &nbsp; ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Our Story
          </motion.h2>
          <GlowDivider className="mt-8 max-w-xs mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)', opacity: 0.3 }}
          />

          <div className="space-y-12 md:space-y-16">
            {weddingData.coupleStory.map((milestone, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  variants={isLeft ? slideLeft : slideRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  {/* Desktop: alternating layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] items-center gap-4">
                    <div className={isLeft ? '' : 'col-start-3'}>
                      <StoryCard milestone={milestone} />
                    </div>

                    {/* Center dot — always col 2 */}
                    <div className={`flex flex-col items-center gap-2 ${isLeft ? 'col-start-2' : 'row-start-1 col-start-2'}`}>
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl glow-box z-10"
                        style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-accent)' }}
                        whileInView={{ scale: [0, 1.2, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {milestone.icon}
                      </motion.div>
                      <span className="font-sans text-xs tracking-widest uppercase text-center" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>
                        {milestone.date}
                      </span>
                    </div>
                  </div>

                  {/* Mobile: stacked */}
                  <div className="md:hidden flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl glow-box"
                        style={{ background: 'var(--color-surface2)', border: '1px solid var(--color-accent)' }}
                      >
                        {milestone.icon}
                      </div>
                      <span className="font-sans text-xs tracking-widest uppercase" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>
                        {milestone.date}
                      </span>
                    </div>
                    <div className="w-full">
                      <StoryCard milestone={milestone} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </ParallaxSection>
  )
}
