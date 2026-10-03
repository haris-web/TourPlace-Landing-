import { useState } from 'react'
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react'

const stories = [
  { id: 'slow-morning', category: 'The slow edit', title: 'How to make a weekend feel wonderfully long', excerpt: 'A gentle case for fewer plans, later breakfasts, and keeping one afternoon completely open.', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=88', read: '5 min read', body: 'Choose a neighbourhood before you choose a checklist. Walk there for breakfast, notice what is open, and let the first good thing set the pace. A long weekend feels longer when you make a little room for being surprised.' },
  { id: 'meet-the-makers', category: 'Local voices', title: 'The people keeping Bali’s craft traditions alive', excerpt: 'Spend a morning with the makers, cooks and growers who shape the island’s quieter side.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=88', read: '7 min read', body: 'In Ubud, a studio visit can become the best part of the day. Local makers invite travellers to learn by doing: shaping clay, preparing family recipes, and hearing the stories behind everyday objects.' },
  { id: 'carry-less', category: 'Travel well', title: 'A small guide to packing lighter', excerpt: 'Bring fewer things, keep your favourite layers close, and spend less time searching your bag.', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=88', read: '4 min read', body: 'Start with the days you have, then pack for the weather you expect and one surprise. A small colour palette makes every layer work together. Leave a little space for something you find along the way.' },
]

export default function JournalPage() {
  const [openStory, setOpenStory] = useState<string | null>(null)
  return <>
    <section className="page-intro"><span className="eyebrow"><BookOpen size={13} /> Notes from the road</span><h1>The Wanderly <em>journal.</em></h1><p>Thoughtful reads for curious travellers and people who like a good detour.</p></section>
    <section className="journal-grid">{stories.map(story => <article className={`journal-card ${openStory === story.id ? 'journal-open' : ''}`} key={story.id}><img src={story.image} alt="Travel scene from the Wanderly journal" loading="lazy" /><div className="journal-content"><span className="section-kicker">{story.category}</span><h2>{story.title}</h2><p>{story.excerpt}</p><div className="journal-meta"><span><Clock3 size={14} /> {story.read}</span><button type="button" onClick={() => setOpenStory(openStory === story.id ? null : story.id)}>{openStory === story.id ? 'Close story' : 'Read story'} <ArrowRight size={14} /></button></div>{openStory === story.id && <p className="journal-full-story">{story.body}</p>}</div></article>)}</section>
    <div className="journal-signoff"><span className="section-kicker">A good trip starts with a good idea</span><h2>Which story will you make yours?</h2><a href="/tours">Find your next place <ArrowRight size={15} /></a></div>
  </>
}
