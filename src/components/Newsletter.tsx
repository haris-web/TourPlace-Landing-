import { useState, type FormEvent } from 'react'
import { Facebook, Instagram, Send, Twitter, Youtube } from 'lucide-react'

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="newsletter">
      <div className="newsletter-intro">
        <span className="newsletter-plane"><Send size={23} fill="currentColor" /></span>
        <span><strong>Subscribe to Our Newsletter</strong><small>Get the latest travel deals and inspiration<br /> straight to your inbox.</small></span>
      </div>
      <form className="newsletter-form" onSubmit={handleSubscribe}>
        <label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>
        <input id="newsletter-email" type="email" required placeholder="Enter your email" />
        <button type="submit">{subscribed ? 'Subscribed!' : 'Subscribe'}</button>
      </form>
      <nav className="social-links" aria-label="Social media">
        <a href="https://facebook.com" aria-label="Facebook"><Facebook size={17} fill="currentColor" /></a>
        <a href="https://instagram.com" aria-label="Instagram"><Instagram size={17} /></a>
        <a href="https://x.com" aria-label="X"><Twitter size={17} fill="currentColor" /></a>
        <a href="https://youtube.com" aria-label="YouTube"><Youtube size={18} fill="currentColor" /></a>
      </nav>
    </footer>
  )
}
