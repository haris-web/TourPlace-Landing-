import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, CarFront, Hotel, MapPin, Plane, Search, Users, Palmtree } from 'lucide-react'

const tabs = [
  { name: 'Flights', icon: Plane },
  { name: 'Hotels', icon: Hotel },
  { name: 'Tours', icon: Palmtree },
  { name: 'Packages', icon: CarFront },
]

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState('Flights')
  const navigate = useNavigate()

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const query = new URLSearchParams({
      type: activeTab,
      from: String(form.get('from') || ''),
      to: String(form.get('to') || ''),
      depart: String(form.get('depart') || ''),
      return: String(form.get('return') || ''),
      travelers: String(form.get('travelers') || '2'),
    })
    navigate(`/booking?${query.toString()}`)
  }

  return (
    <section className="booking-card" id="booking" aria-label="Search and book your trip">
      <div className="booking-tabs" role="tablist" aria-label="Trip type">
        {tabs.map(({ name, icon: Icon }) => (
          <button key={name} className={`booking-tab ${activeTab === name ? 'selected' : ''}`} role="tab" aria-selected={activeTab === name} onClick={() => setActiveTab(name)}>
            <Icon size={16} /> {name}
          </button>
        ))}
      </div>
      <form className="booking-form" onSubmit={handleSearch}>
        <label className="booking-field">
          <span>From</span><span className="input-with-icon"><input name="from" aria-label="Departure city" defaultValue="New York (NYC)" /><Plane className="field-icon plane-small" size={15} /></span>
        </label>
        <label className="booking-field">
          <span>To</span><span className="input-with-icon"><input name="to" aria-label="Destination" placeholder="Where to?" /><MapPin className="field-icon" size={15} /></span>
        </label>
        <label className="booking-field">
          <span>Depart</span><span className="input-with-icon"><input name="depart" aria-label="Departure date" defaultValue="May 20, 2024" /><CalendarDays className="field-icon" size={15} /></span>
        </label>
        <label className="booking-field">
          <span>Return</span><span className="input-with-icon"><input name="return" aria-label="Return date" defaultValue="May 27, 2024" /><CalendarDays className="field-icon" size={15} /></span>
        </label>
        <label className="booking-field travelers-field">
          <span>Travelers</span><span className="input-with-icon"><input name="travelers" aria-label="Travelers" defaultValue="2 Adults, 1 Child" /><Users className="field-icon" size={15} /></span>
        </label>
        <button className="search-button" type="submit">Search <Search size={17} /></button>
      </form>
    </section>
  )
}
