import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Heart, Menu, Plane, Phone, UserRound, X } from 'lucide-react'

const links = [
  ['Home', '/'],
  ['Destinations', '/tours'],
  ['Tours', '/booking?type=Tours'],
  ['Flights', '/booking?type=Flights'],
  ['Hotels', '/booking?type=Hotels'],
  ['Blog', '/journal'],
  ['About Us', '/about'],
]

export default function Header({ variant = 'hero' }: { variant?: 'hero' | 'plain' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className={`site-header ${variant === 'plain' ? 'site-header-plain' : ''}`}>
      <Link className="brand" to="/" aria-label="Wanderly home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark"><Plane size={25} strokeWidth={2.1} /></span>
        <span className="brand-copy"><span className="brand-name">Wanderly</span><span className="brand-tagline">TRAVEL THE WORLD</span></span>
      </Link>

      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={23} /> : <Menu size={23} />}
      </button>

      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, to]) => {
          const [path, query] = to.split('?')
          const active = location.pathname === path && (!query || new URLSearchParams(location.search).get('type') === new URLSearchParams(query).get('type'))
          return <Link className={active ? 'nav-link active' : 'nav-link'} to={to} key={label} onClick={() => setMenuOpen(false)}>{label}</Link>
        })}
      </nav>

      <div className="header-actions">
        <Link className="help-link" to="/contact" aria-label="Contact Wanderly support at +1 234 567 8900">
          <span className="help-icon"><Phone size={16} fill="currentColor" /></span>
          <span><small>Need Help?</small><strong>+1 234 567 8900</strong></span>
        </Link>
        <Link className="profile-button saved-link" to="/favorites" aria-label="Your saved trips"><Heart size={18} /></Link>
        <Link className="profile-button" to="/profile" aria-label="Your account"><UserRound size={20} /></Link>
      </div>
    </header>
  )
}
