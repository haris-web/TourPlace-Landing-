export type Destination = {
  slug: string
  country: string
  city: string
  region: string
  price: number
  badge: string
  image: string
  alt: string
  duration: string
  overview: string
  highlights: string[]
  itinerary: { day: string; title: string; detail: string }[]
}

export const destinations: Destination[] = [
  {
    slug: 'phuket', country: 'Thailand', city: 'Phuket', region: 'Asia', price: 699, badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&w=1200&q=88',
    alt: 'Longtail boats on turquoise water in Thailand', duration: '7 days · 6 nights',
    overview: 'A week of island-hopping, warm Andaman water, and slow evenings in the old town. This easygoing escape balances beach time with the best of Phuket.',
    highlights: ['Longtail boat trip to Phi Phi Islands', 'Old Town food walk with a local guide', 'Six nights in a handpicked boutique stay'],
    itinerary: [
      { day: 'Day 1', title: 'Settle into island time', detail: 'Arrive in Phuket and unwind at your beachside stay.' },
      { day: 'Day 2', title: 'Colourful Old Town', detail: 'Explore the historic streets, then share a guided tasting walk.' },
      { day: 'Day 3', title: 'Phi Phi by longtail', detail: 'Cruise across clear water for a full day among the islands.' },
      { day: 'Days 4–7', title: 'Make it your own', detail: 'Enjoy open days for quiet beaches, markets, and a relaxed departure.' },
    ],
  },
  {
    slug: 'paris', country: 'France', city: 'Paris', region: 'Europe', price: 799, badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=88',
    alt: 'Paris rooftops and the Eiffel Tower at sunset', duration: '5 days · 4 nights',
    overview: 'Find your own rhythm in Paris with neighbourhood walks, classic views, and time for a long café lunch. We have paired a central stay with a few thoughtful local experiences.',
    highlights: ['Small-group Seine evening cruise', 'A central boutique hotel for four nights', 'Neighbourhood guide and museum tips'],
    itinerary: [
      { day: 'Day 1', title: 'Bonjour, Paris', detail: 'Check in, take a gentle walk, and enjoy your first café stop.' },
      { day: 'Day 2', title: 'The river and the city', detail: 'See the landmarks on foot, then take an evening Seine cruise.' },
      { day: 'Day 3', title: 'Art at your pace', detail: 'Choose a museum, browse the bookstalls, and linger over lunch.' },
      { day: 'Days 4–5', title: 'A neighbourhood goodbye', detail: 'Explore a local market before your relaxed final morning.' },
    ],
  },
  {
    slug: 'ubud', country: 'Bali, Indonesia', city: 'Ubud', region: 'Asia', price: 599, badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=88',
    alt: 'Balinese temple and tropical scenery', duration: '6 days · 5 nights',
    overview: 'A restorative Ubud stay among emerald rice terraces, small craft studios, and lush gardens. Leave room in the schedule for a long breakfast and a very good massage.',
    highlights: ['Guided sunrise walk through rice terraces', 'Balinese cooking class in a family home', 'Five nights in a garden-view retreat'],
    itinerary: [
      { day: 'Day 1', title: 'Welcome to Ubud', detail: 'Arrive at your garden retreat and take the rest of the day slowly.' },
      { day: 'Day 2', title: 'Green paths', detail: 'Walk the rice terraces with a local guide before the heat of the day.' },
      { day: 'Day 3', title: 'Cook and share', detail: 'Visit a local market and prepare a Balinese meal together.' },
      { day: 'Days 4–6', title: 'Space to recharge', detail: 'Enjoy a flexible day, a spa visit, and an easy final morning.' },
    ],
  },
  {
    slug: 'dubai', country: 'Dubai, UAE', city: 'Dubai', region: 'Middle East', price: 899, badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=88',
    alt: 'Dubai skyline at blue hour', duration: '5 days · 4 nights',
    overview: 'A bright city break with rooftop views, the old creek, and a desert evening under open skies. The itinerary mixes landmark moments with room to discover the city on your own.',
    highlights: ['Desert sunset experience with dinner', 'Four nights in a central city hotel', 'Creek-side heritage district walking tour'],
    itinerary: [
      { day: 'Day 1', title: 'A city of possibilities', detail: 'Arrive and take in the skyline from your hotel.' },
      { day: 'Day 2', title: 'Old Dubai', detail: 'Cross the creek by abra and explore the heritage district.' },
      { day: 'Day 3', title: 'Desert at dusk', detail: 'Head out of the city for a sunset desert experience and dinner.' },
      { day: 'Days 4–5', title: 'Choose your view', detail: 'Spend a free day by the water before a relaxed departure.' },
    ],
  },
]

export function findDestination(slug?: string) {
  return destinations.find(destination => destination.slug === slug)
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}
