import { ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import { destinations } from '../data/destinations'
import { useWanderly } from '../context/WanderlyContext'

export default function FavoritesPage() {
  const { favorites } = useWanderly()
  const saved = destinations.filter(place => favorites.includes(place.slug))
  return <>
    <section className="page-intro"><span className="eyebrow"><Heart size={13} /> Your shortlist</span><h1>Places on your <em>mind.</em></h1><p>Keep your favourite getaways together while you decide where to go.</p></section>
    {saved.length ? <><div className="saved-count">{saved.length} {saved.length === 1 ? 'place' : 'places'} saved</div><div className="catalog-grid favorites-grid">{saved.map(place => <div className="catalog-item" key={place.slug}><DestinationCard destination={place} /><div className="catalog-card-meta"><span>{place.duration}</span><Link to={`/destinations/${place.slug}`}>View details <ArrowRight size={14} /></Link></div></div>)}</div></> : <section className="empty-state route-card"><span className="empty-state-icon"><Heart /></span><h2>Your shortlist is ready.</h2><p>Tap the heart on any destination to save it here for later.</p><Link className="primary-button" to="/tours">Browse places <ArrowRight size={16} /></Link></section>}
  </>
}
