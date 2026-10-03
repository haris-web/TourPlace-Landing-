import Header from '../components/Header'
import Hero from '../components/Hero'
import SearchBox from '../components/SearchBox'
import FeatureHighlights from '../components/FeatureHighlights'
import PopularDestinations from '../components/PopularDestinations'
import WhyChoose from '../components/WhyChoose'
import Newsletter from '../components/Newsletter'

export default function HomePage() {
  return <><div className="hero-scene"><div className="hero-shell"><Header /><Hero /></div></div><main className="page-content"><div className="content-shell"><SearchBox /><FeatureHighlights /><PopularDestinations /><WhyChoose /><Newsletter /></div></main></>
}
