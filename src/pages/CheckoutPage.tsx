import { useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { findDestination, formatPrice } from '../data/destinations'
import { getDefaultDate, useWanderly } from '../context/WanderlyContext'

export default function CheckoutPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { user, draft, setDraft, bookings, addBooking } = useWanderly()
  const confirmedId = params.get('confirmed')
  const confirmedBooking = bookings.find(item => item.id === confirmedId)
  const destination = findDestination(confirmedBooking?.destinationSlug || draft.destinationSlug)
  const [travelers, setTravelers] = useState(confirmedBooking?.travelers || draft.travelers || 2)
  const [departDate, setDepartDate] = useState(confirmedBooking?.departDate || draft.departDate || getDefaultDate())
  const [returnDate, setReturnDate] = useState(confirmedBooking?.returnDate || draft.returnDate || getDefaultDate(7))
  const total = (destination?.price || 0) * travelers

  function completeBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const travelerName = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim().toLowerCase()
    if (!destination) return
    const booking = addBooking({ destinationSlug: destination.slug, destinationName: `${destination.city}, ${destination.country}`, type: draft.type, from: draft.from, departDate, returnDate, travelers, travelerName, email, total })
    setDraft(current => ({ ...current, departDate, returnDate, travelers }))
    navigate(`/checkout?confirmed=${booking.id}`)
  }

  if (confirmedId) return <section className="confirmation-panel route-card"><span className="confirmation-icon"><CheckCircle2 size={35} /></span><span className="section-kicker">All set</span><h1>Your trip is on its way.</h1><p>{confirmedBooking ? `We’ve saved your ${destination?.city} getaway for ${confirmedBooking.travelerName}.` : 'Your demo booking is confirmed.'} You can find the details in your profile.</p><div className="confirmation-ref">Booking reference <strong>{confirmedId}</strong></div><div className="confirmation-actions"><Link className="primary-button" to="/profile">View my trips <ArrowRight size={16} /></Link><Link className="outline-button" to="/tours">Keep exploring</Link></div></section>
  if (!destination) return <section className="empty-state route-card"><h1>Choose a trip first</h1><p>Your checkout is ready as soon as you find a place to go.</p><Link className="primary-button" to="/booking">Find a trip <ArrowRight size={16} /></Link></section>

  return <>
    <Link className="back-link" to={`/destinations/${destination.slug}`}><ArrowLeft size={15} /> Back to {destination.city}</Link>
    <section className="page-intro checkout-intro"><span className="eyebrow">One last step</span><h1>Let’s make it <em>official.</em></h1><p>Review the trip and add your traveler details.</p></section>
    <div className="checkout-layout"><form className="route-card checkout-form" onSubmit={completeBooking}><span className="section-kicker">Traveler details</span><h2>Who’s coming along?</h2><div className="contact-two-col"><label className="form-control"><span>Full name</span><input name="name" defaultValue={user?.name || ''} autoComplete="name" required /></label><label className="form-control"><span>Email address</span><input name="email" type="email" defaultValue={user?.email || ''} autoComplete="email" required /></label></div><div className="contact-two-col"><label className="form-control"><span>Departure</span><input type="date" value={departDate} min={getDefaultDate(0)} onChange={event => setDepartDate(event.target.value)} required /></label><label className="form-control"><span>Return</span><input type="date" value={returnDate} min={departDate} onChange={event => setReturnDate(event.target.value)} required /></label></div><label className="form-control"><span>Travelers</span><select value={travelers} onChange={event => setTravelers(Number(event.target.value))}>{[1, 2, 3, 4, 5, 6].map(count => <option value={count} key={count}>{count} {count === 1 ? 'traveler' : 'travelers'}</option>)}</select></label><label className="form-control"><span>How would you like to pay?</span><select name="payment"><option>Choose a payment option later</option><option>Pay at the destination</option><option>Contact me about online payment</option></select></label><div className="checkout-assurance"><ShieldCheck size={17} /><span><strong>Secure planning</strong><small>This frontend demo never asks for or stores card details.</small></span></div><button className="primary-button full-button" type="submit">Confirm my trip <ArrowRight size={16} /></button></form>
      <aside className="route-card order-summary"><span className="section-kicker">Trip summary</span><img src={destination.image} alt={destination.alt} /><h2>{destination.city}, {destination.country}</h2><p>{destination.duration} · {draft.type}</p><div className="summary-row"><span>Trip price</span><strong>{formatPrice(destination.price)} × {travelers}</strong></div><div className="summary-row"><span>Taxes & planning</span><strong>Included</strong></div><div className="summary-total"><span>Estimated total</span><strong>{formatPrice(total)}</strong></div><p className="summary-small"><CreditCard size={14} /> No charge is made in this demo.</p></aside></div>
  </>
}
