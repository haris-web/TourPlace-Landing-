import { useMemo, useState } from 'react'
import { ArrowRight, Compass, SlidersHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import { destinations } from '../data/destinations'

const regions = ['All places', ...Array.from(new Set(destinations.map(item => item.region)))]

export default function ToursPage() {
  const [region, setRegion] = useState('All places')
  const [sort, setSort] = useState('featured')
  const places = useMemo(() => {
    const filtered = destinations.filter(place => region === 'All places' || place.region === region)
    return filtered.sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : destinations.indexOf(a) - destinations.indexOf(b))
  }, [region, sort])
  return <>
    <section className="page-intro"><span className="eyebrow"><Compass size={13} /> Find your somewhere</span><h1>Places worth <em>getting lost in.</em></h1><p>Four starting points, countless ways to make the trip your own.</p></section>
    <div className="catalog-tools"><div className="filter-chips" aria-label="Filter by region">{regions.map(item => <button type="button" className={region === item ? 'filter-chip selected' : 'filter-chip'} key={item} onClick={() => setRegion(item)}>{item}</button>)}</div><label className="sort-control"><SlidersHorizontal size={15} /><span className="visually-hidden">Sort trips</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
    <section className="catalog-grid">{places.map(place => <div className="catalog-item" key={place.slug}><DestinationCard destination={place} /><div className="catalog-card-meta"><span>{place.duration}</span><Link to={`/destinations/${place.slug}`}>Explore trip <ArrowRight size={14} /></Link></div></div>)}</section>
    <section className="catalog-bottom"><div><span className="section-kicker">Not sure where to go?</span><h2>Tell us what you’re dreaming about.</h2><p>A real person from our small team can help you shape the first idea.</p></div><Link className="primary-button" to="/contact">Talk to a planner <ArrowRight size={15} /></Link></section>
  </>
}
