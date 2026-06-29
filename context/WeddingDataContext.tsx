'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { weddingData as defaultData } from '@/data/wedding-data'
import type { WeddingConfig } from '@/types/wedding.types'

const WeddingDataContext = createContext<WeddingConfig>(defaultData)

export function useWeddingData() {
  return useContext(WeddingDataContext)
}

export function WeddingDataProvider({ children }: { children: React.ReactNode }) {
  const isIframe = typeof window !== 'undefined' && window.parent !== window
  const [data, setData] = useState<WeddingConfig>(defaultData)
  const [ready, setReady] = useState(!isIframe)

  useEffect(() => {
    const inIframe = window.parent !== window

    function handleMessage(event: MessageEvent) {
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
        heroVideo: d.heroVideo ?? prev.heroVideo,
        heroSubtitle: d.heroSubtitle ?? prev.heroSubtitle,
        rsvpHeading: d.rsvpHeading ?? prev.rsvpHeading,
        rsvpText: d.rsvpText ?? prev.rsvpText,
        rsvpDeadline: d.rsvpDeadline ?? prev.rsvpDeadline,
        events: Array.isArray(d.events) ? d.events : prev.events,
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
      if (!ready) setReady(true)
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
      {children}
    </WeddingDataContext.Provider>
  )
}
