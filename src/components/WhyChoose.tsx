import { ArrowRight, BadgePercent, Globe2, ThumbsUp, WalletCards } from 'lucide-react'

const benefits = [
  { title: 'Wide Range of Choices', description: 'Choose from thousands of flights, hotels and tours worldwide.', icon: Globe2 },
  { title: 'Trusted by Travelers', description: 'Join millions of happy travelers around the world.', icon: ThumbsUp },
  { title: 'Flexible & Easy Booking', description: 'Book with ease and adjust your plans if needed.', icon: WalletCards },
  { title: 'Exclusive Deals', description: 'Get access to exclusive discounts and special offers.', icon: BadgePercent },
]

export default function WhyChoose() {
  return (
    <section className="why-section" id="why-wanderly">
      <div className="why-copy">
        <div className="section-heading why-heading"><h2>Why Choose <span>Wanderly?</span></h2></div>
        <div className="benefit-grid">
          {benefits.map(({ title, description, icon: Icon }) => (
            <article className="benefit-item" key={title}>
              <span className="benefit-icon"><Icon size={19} fill={title === 'Trusted by Travelers' ? 'currentColor' : 'none'} /></span>
              <span><strong>{title}</strong><small>{description}</small></span>
            </article>
          ))}
        </div>
      </div>
      <article className="adventure-card">
        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1300&q=90" alt="A quiet tropical beach with blue water and palm trees" loading="lazy" />
        <div className="adventure-overlay">
          <span className="adventure-eyebrow">LET'S GO!</span>
          <h3>Your Next Adventure<br />Awaits!</h3>
          <p>Discover breathtaking places<br className="desktop-break" /> and create unforgettable<br className="desktop-break" /> memories.</p>
          <a className="light-button" href="#booking">Plan Your Trip <ArrowRight size={16} /></a>
        </div>
      </article>
    </section>
  )
}
