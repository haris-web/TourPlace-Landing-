import { ArrowRight, Plane } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-content" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><Plane size={13} fill="currentColor" /> Explore. Dream. Discover.</div>
        <h1>Discover Amazing<br /><span>Places with Us</span></h1>
        <p>Find the best tours, hotels and flights: everything<br className="desktop-break" /> you need for the perfect trip.</p>
        <a className="primary-button hero-button" href="#destinations">Explore Now <ArrowRight size={18} /></a>
      </div>
      <div className="hero-stamp" aria-hidden="true"><Plane size={17} /></div>
      <div className="hero-caption"><span className="caption-dot" /> Your next story starts here</div>
    </section>
  )
}
