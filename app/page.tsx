'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WeddingDataProvider } from '@/context/WeddingDataContext'
import CustomCursor from '@/components/layout/CustomCursor'
import FloatingFABs from '@/components/layout/FloatingFABs'
import LoadingScreen from '@/components/layout/LoadingScreen'
import ParallaxLanterns from '@/components/ui/ParallaxLanterns'
import WaveDivider from '@/components/ui/WaveDivider'
import HeroSection from '@/components/sections/HeroSection'
import InvitationSection from '@/components/sections/InvitationSection'
import CoupleStory from '@/components/sections/CoupleStory'
import EventsSection from '@/components/sections/EventsSection'
import GallerySection from '@/components/sections/GallerySection'
import VenueSection from '@/components/sections/VenueSection'
import RSVPSection from '@/components/sections/RSVPSection'
import CountdownSection from '@/components/sections/CountdownSection'
import FooterSection from '@/components/sections/FooterSection'
import SectionGate from '@/components/ui/SectionGate'

export default function Page() {
  const [loaded, setLoaded] = useState(false)

  return (
    <WeddingDataProvider>
      <CustomCursor />
      <AnimatePresence>
        {!loaded && <LoadingScreen key="loading" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {loaded && (
        <>
          <ParallaxLanterns />
          <FloatingFABs />
          <div className="relative overflow-x-hidden">
            <main>
              <SectionGate name="hero">
                <HeroSection />
                <WaveDivider fromColor="var(--color-bg)" toColor="var(--color-surface)" />
              </SectionGate>

              <SectionGate name="invitation">
                <InvitationSection />
                <WaveDivider fromColor="var(--color-surface)" toColor="var(--color-surface2)" />
              </SectionGate>

              <SectionGate name="coupleStory">
                <CoupleStory />
                <WaveDivider fromColor="var(--color-surface2)" toColor="var(--color-bg)" />
              </SectionGate>

              <SectionGate name="gallery">
                <GallerySection />
                <WaveDivider fromColor="var(--color-surface)" toColor="var(--color-surface2)" />
              </SectionGate>

              <SectionGate name="events">
                <EventsSection />
                <WaveDivider fromColor="var(--color-surface2)" toColor="var(--color-surface)" />
              </SectionGate>

              <SectionGate name="venue">
                <VenueSection />
                <WaveDivider fromColor="var(--color-surface)" toColor="var(--color-surface)" />
              </SectionGate>

              <SectionGate name="rsvp">
                <RSVPSection />
                <WaveDivider fromColor="var(--color-surface)" toColor="var(--color-surface2)" />
              </SectionGate>

              <SectionGate name="countdown">
                <CountdownSection />
                <WaveDivider fromColor="var(--color-surface2)" toColor="var(--color-surface2)" />
              </SectionGate>

              <SectionGate name="footer">
                <FooterSection />
              </SectionGate>
            </main>
          </div>
        </>
      )}
    </WeddingDataProvider>
  )
}
