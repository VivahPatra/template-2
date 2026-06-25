export interface WeddingEvent {
  id: string
  name: string
  emoji: string
  date: string
  time: string
  venue: string
  venueAddress: string
  image: string
  color: string
}

export interface GalleryImage {
  src: string
  alt: string
  span?: 'wide' | 'tall' | 'normal'
}

export interface FamilyMember {
  name: string
  relation: string
  photo: string
  side: 'bride' | 'groom'
}

export interface StoryMilestone {
  date: string
  title: string
  description: string
  image?: string
  icon: string
}

export interface WeddingConfig {
  brideName: string
  groomName: string
  groomParents?: string
  brideParents?: string
  weddingDate: Date
  hashtag: string
  heroImage: string
  heroVideo?: string
  heroSubtitle?: string
  invitationText: string
  invitationHeading?: string
  invitationSubtitle?: string
  invitationBlessing?: string
  tagline: string
  rsvpHeading?: string
  rsvpText?: string
  rsvpDeadline?: string
  events: WeddingEvent[]
  galleryImages: GalleryImage[]
  familyBride: FamilyMember[]
  familyGroom: FamilyMember[]
  coupleStory: StoryMilestone[]
  venue: {
    name: string
    address: string
    mapUrl: string
  }
  rsvp: {
    whatsappNumber: string
    message: string
    deadline: string
  }
  socialLinks: {
    instagram?: string
  }
  sections?: Record<string, boolean>
}
