import { ArrowLeft, ArrowRight, Check, Clock3, Heart, MapPin, Sparkles } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { destinations, findDestination, formatPrice } from '../data/destinations'
import { getDefaultDate, useWanderly } from '../context/WanderlyContext'
import DestinationCard from '../components/DestinationCard'

export default function DestinationDetailPage() {
  const { slug } = useParams()
  const destination = findDestination(slug)
  const navigate = useNavigate()
  const { favorites, toggleFavorite, setDraft } = useWanderly()
  if (!destination) return <section className="empty-state"><span className="empty-state-icon"><MapPin /></span><h1>We can’t find that place</h1><p>Try one of our handpicked getaways instead.</p><Link className="primary-button" to="/tours">Explore destinations <ArrowRight size={16} /></Link></section>
  const isFavorite = favorites.includes(destination.slug)
  const bookTrip = () => {
    setDraft(current => ({ ...current, destinationSlug: destination.slug, type: 'Tours', departDate: current.departDate || getDefaultDate(), returnDate: current.returnDate || getDefaultDate(7) }))
    navigate('/checkout')
  }
  return <>
    <Link className="back-link" to="/tours"><ArrowLeft size={15} /> All destinations</Link>
    <section className="detail-hero"><img src={destination.image} alt={destination.alt} /><div className="detail-hero-shade" /><div className="detail-hero-copy"><span className="destination-badge">{destination.badge} · {destination.region}</span><h1>{destination.city}</h1><p><MapPin size={16} /> {destination.country}</p></div><button className={`detail-favorite ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={() => toggleFavorite(destination.slug)}><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} /> {isFavorite ? 'Saved' : 'Save trip'}</button></section>
    <div className="detail-columns"><div className="detail-main-copy"><div className="detail-facts"><span><Clock3 size={16} /> {destination.duration}</span><span><Sparkles size={16} /> Handpicked stay & experiences</span></div>
      <section className="content-section"><span className="section-kicker">The feeling of {destination.city}</span><h2>A little more than a place to stay.</h2><p>{destination.overview}</p></section>
      <section className="content-section"><span className="section-kicker">The good stuff</span><h2>Highlights</h2><ul className="check-list">{destination.highlights.map(item => <li key={item}><Check size={16} />{item}</li>)}</ul></section>
      <section className="content-section"><span className="section-kicker">A thoughtfully paced plan</span><h2>Your trip, day by day</h2><div className="itinerary-list">{destination.itinerary.map(item => <article className="itinerary-item" key={item.day}><span>{item.day}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div></section>
    </div><aside className="booking-aside"><span className="section-kicker">Your getaway</span><p className="aside-price">{formatPrice(destination.price)} <small>/ person</small></p><p className="aside-caption">{destination.duration} · Flights, stay and local experiences</p><button className="primary-button" type="button" onClick={bookTrip}>Plan this trip <ArrowRight size={16} /></button><p className="aside-safe">No payment needed to plan. Final details are saved in your profile.</p></aside></div>
    <section className="related-destinations"><div className="section-heading"><h2>More places to wander</h2><Link className="outline-button" to="/tours">See all trips <ArrowRight size={15} /></Link></div><div className="destination-grid">{destinations.filter(item => item.slug !== destination.slug).slice(0, 3).map(item => <DestinationCard destination={item} key={item.slug} />)}</div></section>
  </>
}
