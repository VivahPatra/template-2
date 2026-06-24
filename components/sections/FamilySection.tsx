'use client'
import { motion } from 'framer-motion'
import ParallaxSection from '@/components/ui/ParallaxSection'
import GlowDivider from '@/components/ui/GlowDivider'
import { useWeddingData } from '@/context/WeddingDataContext'
import { useEditMode } from '@/context/EditModeContext'
import EditableText from '@/components/ui/EditableText'
import type { FamilyMember } from '@/types/wedding.types'
import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'

function FamilyCard({ member, index, side }: { member: FamilyMember; index: number; side: 'bride' | 'groom' }) {
  const arrayField = side === 'bride' ? 'familyBride' : 'familyGroom'
  return (
    <motion.div
      variants={scaleIn}
      className="flex flex-col items-center text-center group"
    >
      <div
        className="relative w-20 h-20 rounded-full overflow-hidden mb-3 glow-border"
        style={{ border: '2px solid var(--color-accent)' }}
      >
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          style={{ opacity: 0.85 }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(192,66,92,0.2)' }}
        />
      </div>
      <EditableText field="name" index={index} arrayField={arrayField} tag="p" className="font-display text-base" style={{ color: 'var(--color-text)' }}>{member.name}</EditableText>
      <EditableText field="relation" index={index} arrayField={arrayField} tag="p" className="font-sans text-xs tracking-wider uppercase mt-0.5" style={{ color: 'var(--color-accent)', opacity: 0.65 }}>{member.relation}</EditableText>
    </motion.div>
  )
}

export default function FamilySection() {
  const weddingData = useWeddingData()
  const { isEditing, editData } = useEditMode()
  const d = isEditing ? editData : weddingData
  return (
    <ParallaxSection
      id="family"
      bgImage="/assets/family-bg.jpg"
      bgOpacity={0.1}
      style={{ background: 'linear-gradient(180deg, var(--color-surface2) 0%, var(--color-bg) 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-6 py-28">
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="font-sans text-xs tracking-[0.4em] uppercase mb-4 glow-pulse" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>
            ✦ &nbsp; With Love &nbsp; ✦
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-display shimmer-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            Our Families
          </motion.h2>
          <GlowDivider className="mt-8 max-w-xs mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Bride's family */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              variants={fadeUp}
              className="font-display text-2xl text-center mb-8 glow-text"
              style={{ color: 'var(--color-accent)' }}
            >
              <EditableText field="brideName">{d.brideName}</EditableText>&apos;s Family
            </motion.h3>
            <div className="grid grid-cols-2 gap-6">
              {d.familyBride.map((m, i) => (
                <FamilyCard key={i} member={m} index={i} side="bride" />
              ))}
            </div>
          </motion.div>

          {/* Divider (vertical on md+) */}
          <div className="hidden md:block absolute left-1/2 top-1/4 bottom-1/4 w-px -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, transparent, var(--color-accent), transparent)', opacity: 0.2 }} />

          {/* Groom's family */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              variants={fadeUp}
              className="font-display text-2xl text-center mb-8 glow-text"
              style={{ color: 'var(--color-accent)' }}
            >
              <EditableText field="groomName">{d.groomName}</EditableText>&apos;s Family
            </motion.h3>
            <div className="grid grid-cols-2 gap-6">
              {d.familyGroom.map((m, i) => (
                <FamilyCard key={i} member={m} index={i} side="groom" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </ParallaxSection>
  )
}
