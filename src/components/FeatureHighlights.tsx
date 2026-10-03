import { BadgeCheck, Headset, ShieldCheck, Tags } from 'lucide-react'

const features = [
  { title: 'Best Price Guarantee', description: 'We ensure you get the best deals always.', icon: Tags },
  { title: '24/7 Customer Support', description: "We're here to help you anytime, anywhere.", icon: Headset },
  { title: 'Secure Bookings', description: 'Your data and payments are 100% safe with us.', icon: ShieldCheck },
  { title: 'Handpicked Experiences', description: 'Curated tours and hotels for unforgettable trips.', icon: BadgeCheck },
]

export default function FeatureHighlights() {
  return (
    <section className="feature-grid" aria-label="Booking benefits">
      {features.map(({ title, description, icon: Icon }) => (
        <article className="feature-item" key={title}>
          <span className="feature-icon"><Icon size={21} /></span>
          <span className="feature-copy"><strong>{title}</strong><span>{description}</span></span>
        </article>
      ))}
    </section>
  )
}
