import { useState, type FormEvent } from 'react'
import { ArrowRight, CalendarDays, MapPin, Search, Users } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { destinations, findDestination, formatPrice } from '../data/destinations'
import { getDefaultDate, useWanderly } from '../context/WanderlyContext'

const tripTypes = ['Flights', 'Hotels', 'Tours', 'Packages']

export default function BookingPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { draft, setDraft } = useWanderly()
  const requested = destinations.find(item => `${item.city} ${item.country}`.toLowerCase().includes((params.get('to') || '').toLowerCase()))
  const [type, setType] = useState(params.get('type') || draft.type)
  const [from, setFrom] = useState(params.get('from') || draft.from)
  const [destinationSlug, setDestinationSlug] = useState(requested?.slug || draft.destinationSlug || destinations[0].slug)
  const [departDate, setDepartDate] = useState(params.get('depart') && params.get('depart')?.includes('-') ? params.get('depart')! : draft.departDate || getDefaultDate())
  const [returnDate, setReturnDate] = useState(params.get('return') && params.get('return')?.includes('-') ? params.get('return')! : draft.returnDate || getDefaultDate(7))
  const [travelers, setTravelers] = useState(Number(params.get('travelers')) || draft.travelers || 2)
  const [searched, setSearched] = useState(false)
  const destination = findDestination(destinationSlug) || destinations[0]

  function searchTrips(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setDraft({ destinationSlug, type, from, departDate, returnDate, travelers })
    setSearched(true)
  }

  function chooseTrip(slug: string) {
    setDraft(current => ({ ...current, destinationSlug: slug, type, from, departDate, returnDate, travelers }))
    navigate('/checkout')
  }

  return <>
    <section className="page-intro booking-intro"><span className="eyebrow">Make room for a new story</span><h1>Find a trip that feels <em>like you.</em></h1><p>Set your dates and we’ll bring the good places to you.</p></section>
    <form className="route-card booking-search-panel" onSubmit={searchTrips}>
      <div className="trip-type-row" role="tablist" aria-label="Choose a trip type">{tripTypes.map(item => <button type="button" role="tab" aria-selected={type === item} className={`trip-type ${type === item ? 'selected' : ''}`} key={item} onClick={() => setType(item)}>{item}</button>)}</div>
      <div className="route-form-grid">
        <label className="form-control"><span>Leaving from</span><span className="control-icon"><MapPin size={16} /><input value={from} onChange={event => setFrom(event.target.value)} required /></span></label>
        <label className="form-control"><span>Where to?</span><select value={destinationSlug} onChange={event => setDestinationSlug(event.target.value)}>{destinations.map(item => <option value={item.slug} key={item.slug}>{item.city}, {item.country}</option>)}</select></label>
        <label className="form-control"><span>Depart</span><span className="control-icon"><CalendarDays size={16} /><input type="date" value={departDate} min={getDefaultDate(0)} onChange={event => setDepartDate(event.target.value)} required /></span></label>
        <label className="form-control"><span>Return</span><span className="control-icon"><CalendarDays size={16} /><input type="date" value={returnDate} min={departDate} onChange={event => setReturnDate(event.target.value)} required /></span></label>
        <label className="form-control"><span>Travelers</span><span className="control-icon"><Users size={16} /><select value={travelers} onChange={event => setTravelers(Number(event.target.value))}>{[1, 2, 3, 4, 5, 6].map(count => <option value={count} key={count}>{count} {count === 1 ? 'traveler' : 'travelers'}</option>)}</select></span></label>
        <button className="primary-button route-submit" type="submit"><Search size={17} /> Search trips</button>
      </div>
    </form>
    <section className="booking-results"><div className="results-heading"><div><span className="section-kicker">{searched ? 'Your search is ready' : 'A few places to start'}</span><h2>{searched ? `Trips to ${destination.city}` : 'Handpicked for your next getaway'}</h2></div><span className="result-count">{destinations.length} trips</span></div>
      {searched && <div className="search-summary"><span>{type}</span><span>{from}</span><ArrowRight size={15} /><span>{destination.city}</span><span>{travelers} travelers · {departDate}</span></div>}
      <div className="booking-offers">{destinations.map(item => <article className={`offer-card ${destinationSlug === item.slug && searched ? 'offer-highlight' : ''}`} key={item.slug}><img src={item.image} alt={item.alt} loading="lazy" /><div className="offer-info"><span className="destination-badge">{item.badge}</span><h3>{item.city}, {item.country}</h3><p>{item.duration} <span>·</span> Small-group experience</p><strong>From {formatPrice(item.price)} <small>/ person</small></strong></div><button className="offer-button" type="button" onClick={() => chooseTrip(item.slug)}>Choose trip <ArrowRight size={15} /></button></article>)}</div>
      <p className="booking-note">Every trip is carefully selected by our local travel team. Prices are examples for this frontend demo.</p>
    </section>
    <div className="route-inline-link">Need a little inspiration? <Link to="/journal">Read the Wanderly journal <ArrowRight size={14} /></Link></div>
  </>
}
