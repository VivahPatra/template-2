'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { weddingData as defaultData } from '@/data/wedding-data'
import type { WeddingConfig, WeddingEvent } from '@/types/wedding.types'

const WeddingDataContext = createContext<WeddingConfig>(defaultData)

export function useWeddingData() {
  return useContext(WeddingDataContext)
}

const PreviewContext = React.createContext(false)

export function useIsPreview(): boolean {
  return React.useContext(PreviewContext)
}

export function WeddingDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<WeddingConfig>(defaultData)
  const [ready, setReady] = useState(true)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    const inIframe = window.parent !== window
    if (inIframe) setReady(false)


    function isTrustedOrigin(origin: string): boolean {
      const trusted = [
        window.location.origin,
        'https://vivahpatra.co',
        'https://www.vivahpatra.co',
      ]
      if (process.env.NODE_ENV === 'development') {
        trusted.push('http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002')
      }
      return trusted.some(t => origin === t || origin.endsWith('.vivahpatra.co')) ||
        /^https:\/\/vivahpatra[a-z0-9-]*\.vercel\.app$/.test(origin)
    }

    function handleMessage(event: MessageEvent) {
      if (!isTrustedOrigin(event.origin)) return
      if (event.data?.type === 'VIVAHPATRA_PREVIEW_MODE') {
        setIsPreview(true)
        return
      }
      if (event.data?.type !== 'VIVAHPATRA_UPDATE') return
      const d = event.data.data ?? event.data.payload ?? {}

      setData((prev) => {
      const merged: WeddingConfig = {
        brideName: d.brideName ?? prev.brideName,
        groomName: d.groomName ?? prev.groomName,
        groomParents: d.groomParents ?? prev.groomParents,
        brideParents: d.brideParents ?? prev.brideParents,
        weddingDate: d.weddingDate ? new Date(d.weddingDate) : prev.weddingDate,
        hashtag: d.hashtag ?? prev.hashtag,
        tagline: d.tagline ?? prev.tagline,
        invitationText: d.invitationText ?? prev.invitationText,
        invitationHeading: d.invitationHeading ?? prev.invitationHeading,
        invitationSubtitle: d.invitationSubtitle ?? prev.invitationSubtitle,
        invitationBlessing: d.invitationBlessing ?? prev.invitationBlessing,
        heroImage: d.heroImage ?? prev.heroImage,
        backgroundMusic: (d.backgroundMusic && d.backgroundMusic.trim() !== '') ? d.backgroundMusic : prev.backgroundMusic,
        heroVideo: d.heroVideo ?? prev.heroVideo,
        heroSubtitle: d.heroSubtitle ?? prev.heroSubtitle,
        rsvpHeading: d.rsvpHeading ?? prev.rsvpHeading,
        rsvpText: d.rsvpText ?? prev.rsvpText,
        rsvpDeadline: d.rsvpDeadline ?? prev.rsvpDeadline,
        events: Array.isArray(d.events)
          ? d.events.map((e: WeddingEvent) => ({ ...e, hidden: e.hidden }))
          : prev.events,
        galleryImages: Array.isArray(d.galleryImages) ? d.galleryImages : prev.galleryImages,
        coupleStory: Array.isArray(d.coupleStory) ? d.coupleStory : prev.coupleStory,
        familyBride: Array.isArray(d.familyBride) ? d.familyBride : prev.familyBride,
        familyGroom: Array.isArray(d.familyGroom) ? d.familyGroom : prev.familyGroom,
        venue: d.venueName
          ? {
              name: d.venueName,
              address: d.venueAddress ?? prev.venue.address,
              mapUrl: d.venueMapUrl ?? prev.venue.mapUrl,
            }
          : d.venue ?? prev.venue,
        rsvp: d.rsvpPhone
          ? {
              whatsappNumber: d.rsvpPhone,
              message: d.rsvpMessage ?? prev.rsvp.message,
              deadline: d.rsvpDeadline ?? prev.rsvp.deadline,
            }
          : d.rsvp ?? prev.rsvp,
        socialLinks: d.instagram
          ? { instagram: d.instagram }
          : d.socialLinks ?? prev.socialLinks,
      }

      if (d.sections) {
        merged.sections = d.sections as Record<string, boolean>
      }

      // Name order swap
      if (d.groomFirst === false) {
      merged.groomFirst = false
        const tmpN = merged.groomName; merged.groomName = merged.brideName; merged.brideName = tmpN
        const tmpP = merged.groomParents; merged.groomParents = merged.brideParents; merged.brideParents = tmpP
      }
      return merged
      })
      setReady(true)
    }

    window.addEventListener('message', handleMessage)

    if (inIframe) {
      window.parent.postMessage({ type: 'VIVAHPATRA_READY' }, '*')
      setTimeout(() => setReady(true), 4000)
    }

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  if (!ready) return null

  return (
    <WeddingDataContext.Provider value={data}>
      <PreviewContext.Provider value={isPreview}>
        {children}
      </PreviewContext.Provider>
    </WeddingDataContext.Provider>
  )
}
