import type { PropsWithChildren } from 'react'
import Header from '../components/Header'
import Newsletter from '../components/Newsletter'

export default function PageLayout({ children }: PropsWithChildren) {
  return <div className="subpage"><div className="subpage-header"><Header variant="plain" /></div><main className="route-main"><div className="route-shell">{children}</div></main><div className="route-footer"><Newsletter /></div></div>
}
