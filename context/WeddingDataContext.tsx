'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { weddingData as defaultData } from '@/data/wedding-data'
import type { WeddingConfig } from '@/types/wedding.types'

const WeddingDataContext = createContext<WeddingConfig>(defaultData)

export function useWeddingData() {
  return useContext(WeddingDataContext)
}

export function WeddingDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<WeddingConfig>(defaultData)

  useEffect(() => {
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

      return merged
      })
    }

    window.addEventListener('message', handleMessage)
if (window.parent !== window) {      window.parent.postMessage({ type: 'VIVAHPATRA_READY' }, '*')    }
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <WeddingDataContext.Provider value={data}>
      {children}
    </WeddingDataContext.Provider>
  )
}
