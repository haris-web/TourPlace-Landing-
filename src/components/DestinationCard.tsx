import { Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, type Destination } from '../data/destinations'
import { useWanderly } from '../context/WanderlyContext'

export default function DestinationCard({ destination }: { destination: Destination }) {
  const { favorites, toggleFavorite } = useWanderly()
  const isFavorite = favorites.includes(destination.slug)

  return (
    <article className="destination-card">
      <img src={destination.image} alt={destination.alt} loading="lazy" />
      <span className="destination-badge">{destination.badge}</span>
      <button className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`} type="button" aria-label={isFavorite ? `Remove ${destination.city} from saved trips` : `Save ${destination.city}` } onClick={() => toggleFavorite(destination.slug)}><Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} /></button>
      <div className="destination-details">
        <div><h3><Link to={`/destinations/${destination.slug}`}>{destination.country}</Link></h3><p><MapPin size={13} fill="currentColor" /> {destination.city}</p></div>
        <p className="destination-price"><span>From</span><strong>{formatPrice(destination.price)}</strong></p>
      </div>
    </article>
  )
}
