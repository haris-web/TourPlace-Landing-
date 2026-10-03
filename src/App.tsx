import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { WanderlyProvider } from './context/WanderlyContext'
import HomePage from './pages/HomePage'
import PageLayout from './pages/PageLayout'
import BookingPage from './pages/BookingPage'
import DestinationDetailPage from './pages/DestinationDetailPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import ContactPage from './pages/ContactPage'
import ProfilePage from './pages/ProfilePage'
import FavoritesPage from './pages/FavoritesPage'
import ToursPage from './pages/ToursPage'
import CheckoutPage from './pages/CheckoutPage'
import JournalPage from './pages/JournalPage'

function NotFoundPage() {
  return <section className="empty-state"><span className="section-kicker">A little detour</span><h1>This page wandered off.</h1><p>Let’s get you back to the good stuff.</p><Link className="primary-button" to="/">Go home <ArrowRight size={16} /></Link></section>
}

function RoutedPage({ children }: { children: ReactNode }) {
  return <PageLayout>{children}</PageLayout>
}

export default function App() {
  return <BrowserRouter><WanderlyProvider><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/booking" element={<RoutedPage><BookingPage /></RoutedPage>} />
    <Route path="/destinations/:slug" element={<RoutedPage><DestinationDetailPage /></RoutedPage>} />
    <Route path="/about" element={<RoutedPage><AboutPage /></RoutedPage>} />
    <Route path="/login" element={<RoutedPage><LoginPage /></RoutedPage>} />
    <Route path="/contact" element={<RoutedPage><ContactPage /></RoutedPage>} />
    <Route path="/profile" element={<RoutedPage><ProfilePage /></RoutedPage>} />
    <Route path="/favorites" element={<RoutedPage><FavoritesPage /></RoutedPage>} />
    <Route path="/tours" element={<RoutedPage><ToursPage /></RoutedPage>} />
    <Route path="/checkout" element={<RoutedPage><CheckoutPage /></RoutedPage>} />
    <Route path="/journal" element={<RoutedPage><JournalPage /></RoutedPage>} />
    <Route path="*" element={<RoutedPage><NotFoundPage /></RoutedPage>} />
  </Routes></WanderlyProvider></BrowserRouter>
}
