import { createContext, useContext, useState, type PropsWithChildren, type SetStateAction, type Dispatch } from 'react'

export type WanderlyUser = {
  name: string
  email: string
  phone?: string
  homeCity?: string
}

export type BookingDraft = {
  destinationSlug: string
  type: string
  from: string
  departDate: string
  returnDate: string
  travelers: number
}

export type SavedBooking = BookingDraft & {
  id: string
  destinationName: string
  travelerName: string
  email: string
  bookedAt: string
  total: number
  status: 'Confirmed'
}

type WanderlyContextValue = {
  user: WanderlyUser | null
  signIn: (user: WanderlyUser) => void
  signOut: () => void
  updateProfile: (user: WanderlyUser) => void
  favorites: string[]
  toggleFavorite: (slug: string) => void
  draft: BookingDraft
  setDraft: Dispatch<SetStateAction<BookingDraft>>
  bookings: SavedBooking[]
  addBooking: (booking: Omit<SavedBooking, 'id' | 'bookedAt' | 'status'>) => SavedBooking
}

const today = new Date()
const dateAfter = (days: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}
const defaultDraft: BookingDraft = {
  destinationSlug: 'phuket', type: 'Flights', from: 'New York (NYC)', departDate: dateAfter(30), returnDate: dateAfter(37), travelers: 2,
}

function load<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) as T : fallback
  } catch {
    return fallback
  }
}

const WanderlyContext = createContext<WanderlyContextValue | null>(null)

export function WanderlyProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<WanderlyUser | null>(() => load('wanderly-user', null))
  const [favorites, setFavorites] = useState<string[]>(() => load('wanderly-favorites', []))
  const [draft, setDraft] = useState<BookingDraft>(() => load('wanderly-draft', defaultDraft))
  const [bookings, setBookings] = useState<SavedBooking[]>(() => load('wanderly-bookings', []))

  const signIn = (nextUser: WanderlyUser) => {
    setUser(nextUser)
    localStorage.setItem('wanderly-user', JSON.stringify(nextUser))
  }
  const signOut = () => {
    setUser(null)
    localStorage.removeItem('wanderly-user')
  }
  const updateProfile = (nextUser: WanderlyUser) => signIn(nextUser)
  const toggleFavorite = (slug: string) => {
    setFavorites(current => {
      const next = current.includes(slug) ? current.filter(item => item !== slug) : [...current, slug]
      localStorage.setItem('wanderly-favorites', JSON.stringify(next))
      return next
    })
  }
  const updateDraft: Dispatch<SetStateAction<BookingDraft>> = value => {
    setDraft(current => {
      const next = typeof value === 'function' ? (value as (previous: BookingDraft) => BookingDraft)(current) : value
      localStorage.setItem('wanderly-draft', JSON.stringify(next))
      return next
    })
  }
  const addBooking = (booking: Omit<SavedBooking, 'id' | 'bookedAt' | 'status'>) => {
    const saved: SavedBooking = { ...booking, id: `WY-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, bookedAt: new Date().toISOString(), status: 'Confirmed' }
    setBookings(current => {
      const next = [saved, ...current]
      localStorage.setItem('wanderly-bookings', JSON.stringify(next))
      return next
    })
    return saved
  }

  return <WanderlyContext.Provider value={{ user, signIn, signOut, updateProfile, favorites, toggleFavorite, draft, setDraft: updateDraft, bookings, addBooking }}>{children}</WanderlyContext.Provider>
}

export function useWanderly() {
  const context = useContext(WanderlyContext)
  if (!context) throw new Error('useWanderly must be used inside WanderlyProvider')
  return context
}

export function getDefaultDate(days = 30) {
  return dateAfter(days)
}
