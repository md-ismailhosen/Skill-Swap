import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function NotFound() {
  return (
    <section className="not-found">
      <div>
        <span className="eyebrow">Looks like a wrong turn</span>
        <h1 style={{ marginTop: 12 }}>This page wandered off.</h1>
        <p className="section-copy" style={{ marginBottom: 22 }}>Let’s get you back to the good stuff.</p>
        <Link className="button-primary" to="/"><ArrowLeft size={16} /> Back to SkillSwap</Link>
      </div>
    </section>
  )
}

export default NotFound
