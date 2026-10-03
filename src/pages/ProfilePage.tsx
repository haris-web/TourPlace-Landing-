import { useState, type FormEvent } from 'react'
import { ArrowRight, CalendarDays, Heart, LogOut, MapPin, Pencil, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWanderly } from '../context/WanderlyContext'
import { findDestination, formatPrice } from '../data/destinations'

export default function ProfilePage() {
  const { user, updateProfile, signOut, bookings, favorites } = useWanderly()
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  if (!user) return <section className="empty-state"><span className="empty-state-icon"><UserRound /></span><span className="section-kicker">Your Wanderly account</span><h1>Your trips, all together.</h1><p>Sign in to see your bookings, update your details and keep your favourite places close.</p><Link className="primary-button" to="/login">Sign in <ArrowRight size={16} /></Link></section>
  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    updateProfile({ name: String(data.get('name')), email: user!.email, phone: String(data.get('phone')), homeCity: String(data.get('homeCity')) })
    setEditing(false); setSaved(true)
  }
  return <>
    <section className="profile-welcome"><div className="avatar-circle">{user.name.slice(0, 1).toUpperCase()}</div><div><span className="section-kicker">Your travel space</span><h1>Good to see you, {user.name.split(' ')[0]}.</h1><p>Keep dreaming up the places you’ll go.</p></div><button className="text-button profile-logout" onClick={signOut}><LogOut size={15} /> Sign out</button></section>
    <div className="profile-grid"><section className="route-card profile-card"><div className="card-title-row"><div><span className="section-kicker">Your details</span><h2>Traveler profile</h2></div><button className="icon-text-button" onClick={() => { setEditing(!editing); setSaved(false) }}><Pencil size={15} /> {editing ? 'Cancel' : 'Edit'}</button></div>{editing ? <form className="stacked-form profile-edit-form" onSubmit={saveProfile}><label className="form-control"><span>Name</span><input name="name" defaultValue={user.name} required /></label><label className="form-control"><span>Email</span><input value={user.email} readOnly /></label><label className="form-control"><span>Phone</span><input name="phone" defaultValue={user.phone || ''} placeholder="Add a phone number" /></label><label className="form-control"><span>Home city</span><input name="homeCity" defaultValue={user.homeCity || ''} placeholder="Where do you call home?" /></label><button className="primary-button" type="submit">Save profile <ArrowRight size={15} /></button></form> : <div className="profile-facts"><p><UserRound size={16} /> {user.name}</p><p><span className="mail-small">@</span> {user.email}</p><p><MapPin size={16} /> {user.homeCity || 'Add your home city'}</p>{saved && <span className="saved-hint">Profile updated.</span>}</div>}</section>
      <section className="route-card profile-card"><span className="section-kicker">Your Wanderly activity</span><h2>A little travel dashboard</h2><div className="profile-stat-row"><div><strong>{bookings.length}</strong><span>Trips booked</span></div><div><strong>{favorites.length}</strong><span>Saved places</span></div></div><Link className="profile-shortcut" to="/favorites"><Heart size={17} /> Your saved trips <ArrowRight size={15} /></Link><Link className="profile-shortcut" to="/booking"><CalendarDays size={17} /> Find a new trip <ArrowRight size={15} /></Link></section></div>
    <section className="profile-bookings"><div className="section-heading"><div><span className="section-kicker">Your travel plans</span><h2>Upcoming trips</h2></div><Link className="outline-button" to="/booking">Plan another <ArrowRight size={14} /></Link></div>{bookings.length ? <div className="saved-bookings">{bookings.map(booking => { const place = findDestination(booking.destinationSlug); return <article className="saved-booking" key={booking.id}><img src={place?.image} alt={place?.alt || booking.destinationName} /><div><span className="booking-id">{booking.id} · {booking.status}</span><h3>{booking.destinationName}</h3><p>{booking.departDate} · {booking.travelers} travelers</p></div><strong>{formatPrice(booking.total)}</strong></article> })}</div> : <div className="soft-empty"><span className="empty-state-icon"><CalendarDays /></span><h3>Your next trip starts here.</h3><p>When you find the right getaway, your plans will show up here.</p><Link to="/booking">Explore trips <ArrowRight size={14} /></Link></div>}</section>
  </>
}
