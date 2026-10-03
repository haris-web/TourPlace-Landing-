import { useState, type FormEvent } from 'react'
import { ArrowRight, LockKeyhole, Mail, Plane } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useWanderly } from '../context/WanderlyContext'

export default function LoginPage() {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')
  const { signIn } = useWanderly()
  const navigate = useNavigate()
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '').trim().toLowerCase()
    const password = String(data.get('password') || '')
    const name = String(data.get('name') || '').trim() || email.split('@')[0]
    if (password.length < 6) { setError('Use at least 6 characters for your demo password.'); return }
    signIn({ name, email })
    navigate('/profile')
  }
  return <section className="auth-layout"><div className="auth-art"><img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=88" alt="Mountain lake on a clear day" /><div><span className="auth-art-brand"><Plane size={17} /> Wanderly</span><h1>Keep your<br />next story close.</h1><p>Save the places you love and keep your plans all in one place.</p></div></div><div className="auth-panel"><span className="section-kicker">Your travel space</span><h2>{isCreating ? 'Create your account' : 'Welcome back'}</h2><p>{isCreating ? 'Start saving the trips you can’t stop thinking about.' : 'Sign in to find your saved places and plans.'}</p><form className="stacked-form" onSubmit={handleSubmit}>
    {isCreating && <label className="form-control"><span>Your name</span><input name="name" autoComplete="name" required placeholder="Maya Carter" /></label>}
    <label className="form-control"><span>Email address</span><span className="control-icon"><Mail size={16} /><input type="email" name="email" autoComplete="email" required placeholder="you@example.com" /></span></label><label className="form-control"><span>Password</span><span className="control-icon"><LockKeyhole size={16} /><input type="password" name="password" autoComplete={isCreating ? 'new-password' : 'current-password'} minLength={6} required placeholder="At least 6 characters" /></span></label>
    {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button full-button" type="submit">{isCreating ? 'Create account' : 'Sign in'} <ArrowRight size={16} /></button></form><p className="auth-switch">{isCreating ? 'Already have an account?' : 'New to Wanderly?'} <button type="button" onClick={() => { setIsCreating(!isCreating); setError('') }}>{isCreating ? 'Sign in' : 'Create an account'}</button></p><p className="demo-note">Demo account: any email and a password with 6+ characters. Your password is never stored.</p><Link className="auth-home-link" to="/">Back to exploring</Link></div></section>
}
