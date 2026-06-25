import { WeddingConfig } from '@/types/wedding.types'

export const weddingData: WeddingConfig = {
  brideName: 'Priya',
  groomName: 'Aryan',
  groomParents: 'Mr. Rajesh Sharma & Mrs. Sunita Sharma',
  brideParents: 'Mr. Vijay Kapoor & Mrs. Rekha Kapoor',
  weddingDate: new Date('2026-11-15T10:00:00'),
  hashtag: '#PriyaWedAryan',
  tagline: 'Two hearts, one forever',
  invitationText:
    'Together with their families, Priya and Aryan joyfully invite you to celebrate the beginning of their forever. Your presence will make our day complete.',
  heroImage: '/assets/hero.jpg',

  events: [
    {
      id: 'engagement',
      name: 'Engagement',
      emoji: '💍',
      date: 'November 11, 2026',
      time: '6:00 PM',
      venue: 'The Grand Ballroom, The Leela',
      venueAddress: 'Sahar Airport Road, Mumbai',
      image: '/assets/events/engagement.png',
      color: '#c9a84c',
    },
    {
      id: 'mehendi',
      name: 'Mehendi',
      emoji: '🌿',
      date: 'November 12, 2026',
      time: '4:00 PM onwards',
      venue: 'The Garden Palace',
      venueAddress: '12 Rose Garden Road, Mumbai',
      image: '/assets/events/mehendi.png',
      color: '#4a7c59',
    },
    {
      id: 'haldi',
      name: 'Haldi',
      emoji: '✨',
      date: 'November 13, 2026',
      time: '10:00 AM onwards',
      venue: 'Home Ceremony',
      venueAddress: '45 Sunset Avenue, Mumbai',
      image: '/assets/events/haldi.png',
      color: '#c9a84c',
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      emoji: '🎶',
      date: 'November 13, 2026',
      time: '7:00 PM onwards',
      venue: 'Grand Ballroom, The Leela',
      venueAddress: 'Sahar Airport Road, Mumbai',
      image: '/assets/events/sangeet.png',
      color: '#c0425c',
    },
    {
      id: 'wedding',
      name: 'Wedding',
      emoji: '💍',
      date: 'November 15, 2026',
      time: '10:00 AM',
      venue: 'Shri Ganesh Mandir Banquet',
      venueAddress: 'Temple Road, Andheri, Mumbai',
      image: '/assets/events/wedding.png',
      color: '#e8a0b4',
    },
    {
      id: 'reception',
      name: 'Reception',
      emoji: '🥂',
      date: 'November 15, 2026',
      time: '7:00 PM',
      venue: 'Grand Ballroom, The Leela',
      venueAddress: 'Sahar Airport Road, Mumbai',
      image: '/assets/events/reception.png',
      color: '#9b6b9b',
    },
  ],

  galleryImages: [
    { src: '/assets/gallery/gallery-1.jpg', alt: 'Couple photo 1', span: 'wide' },
    { src: '/assets/gallery/gallery-2.jpg', alt: 'Couple photo 2', span: 'normal' },
    { src: '/assets/gallery/gallery-3.jpg', alt: 'Couple photo 3', span: 'tall' },
    { src: '/assets/gallery/gallery-4.jpg', alt: 'Couple photo 4', span: 'normal' },
  ],

  coupleStory: [
    {
      date: 'January 2020',
      title: 'When We First Met',
      description: 'A chance encounter at a college fest turned into hours of conversation. Neither of us wanted the evening to end.',
      icon: '☕',
      image: '/assets/story/story-1.jpg',
    },
    {
      date: 'June 2021',
      title: 'Our First Date',
      description: 'A monsoon evening walk by the sea that turned magical. We both knew, though neither said it yet.',
      icon: '🌧️',
      image: '/assets/story/story-2.jpg',
    },
    {
      date: 'December 2022',
      title: 'The Proposal',
      description: 'Under a sky full of stars at our favourite rooftop restaurant, Aryan got down on one knee. She said yes before he finished the sentence.',
      icon: '💍',
      image: '/assets/story/story-3.jpg',
    },
    {
      date: 'November 2026',
      title: 'Forever Begins',
      description: 'And now we begin forever. We cannot wait to celebrate with every person who has been part of our journey.',
      icon: '🌹',
      image: '/assets/story/story-4.jpg',
    },
  ],

  familyBride: [
    { name: 'Suresh Gupta', relation: 'Father', photo: '/assets/family/bf.jpg', side: 'bride' },
    { name: 'Meena Gupta', relation: 'Mother', photo: '/assets/family/bm.jpg', side: 'bride' },
    { name: 'Rohan Gupta', relation: 'Brother', photo: '/assets/family/bb.jpg', side: 'bride' },
    { name: 'Anita Devi', relation: 'Grandmother', photo: '/assets/family/bg.jpg', side: 'bride' },
  ],

  familyGroom: [
    { name: 'Rajesh Sharma', relation: 'Father', photo: '/assets/family/gf.jpg', side: 'groom' },
    { name: 'Sunita Sharma', relation: 'Mother', photo: '/assets/family/gm.jpg', side: 'groom' },
    { name: 'Pooja Sharma', relation: 'Sister', photo: '/assets/family/gs.jpg', side: 'groom' },
    { name: 'Ram Prasad', relation: 'Grandfather', photo: '/assets/family/gg.jpg', side: 'groom' },
  ],

  venue: {
    name: 'Shri Ganesh Mandir Banquet',
    address: 'Temple Road, Andheri West, Mumbai — 400058',
    mapUrl: 'https://maps.google.com',
  },

  rsvp: {
    whatsappNumber: '919876543210',
    message: 'Hi! I would like to RSVP for the wedding of Priya & Aryan on 15th November 2026.',
    deadline: 'November 1, 2026',
  },

  socialLinks: {
    instagram: 'https://instagram.com',
  },
}
