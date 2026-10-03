import { ArrowRight, MoveUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import DestinationCard from './DestinationCard'
import { destinations } from '../data/destinations'

export default function PopularDestinations() {
  return (
    <section className="section-block destinations-section" id="destinations">
      <div className="section-heading">
        <h2>Popular Destinations <MoveUpRight className="heading-plane" size={19} /></h2>
        <Link className="outline-button" to="/tours">View All Destinations <ArrowRight size={16} /></Link>
      </div>
      <div className="destination-grid">
        {destinations.map(destination => <DestinationCard destination={destination} key={destination.country} />)}
      </div>
    </section>
  )
}
