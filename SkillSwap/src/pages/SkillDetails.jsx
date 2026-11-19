import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Mail, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
import skills from '../data/skills.json'

function SkillDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const skill = skills.find((item) => item.skillId === id)
  const [name, setName] = useState(user?.displayName || '')
  const [email, setEmail] = useState(user?.email || '')

  if (!skill) {
    return (
      <section className="not-found">
        <div>
          <h1>We couldn't find that skill.</h1>
          <Link className="button-primary" style={{ marginTop: 20 }} to="/">Back to home</Link>
        </div>
      </section>
    )
  }

  function handleBookingSubmit(event) {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error('Please enter your name and email.')
      return
    }

    toast.success(`Session request sent for ${skill.skillName}!`)
    setName('')
    setEmail('')
    event.currentTarget.reset()
  }

  return (
    <section className="detail-page">
      <div className="container">
        <Link className="text-link" to="/#popular-skills"><ArrowLeft size={16} /> Back to skills</Link>
        <div className="detail-layout">
          <article className="detail-content">
            <img className="detail-image" src={skill.image} alt={skill.skillName} />
            <div className="detail-category-row">
              <span className="skill-category detail-category">{skill.category}</span>
              <span className="rating"><Star size={16} fill="currentColor" /> {skill.rating.toFixed(1)} rating</span>
            </div>
            <h1 className="section-heading detail-title">{skill.skillName}</h1>
            <p className="detail-description">{skill.description}</p>

            <section className="detail-provider">
              <h2 className="detail-subheading">Meet your provider</h2>
              <p className="detail-provider-name">{skill.providerName}</p>
              <a className="detail-provider-email" href={`mailto:${skill.providerEmail}`}>
                <Mail size={15} /> {skill.providerEmail}
              </a>
            </section>
          </article>

          <aside className="profile-panel detail-booking">
            <span className="eyebrow">Book a session</span>
            <p className="detail-price">${skill.price}<span> / session</span></p>
            <p className="detail-slots">{skill.slotsAvailable} {skill.slotsAvailable === 1 ? 'slot' : 'slots'} available</p>
            <div className="booking-divider" />
            <h2 className="booking-heading">Request this skill</h2>
            <p className="booking-copy">Leave your details and we’ll get your session request started.</p>
            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <label className="form-field" htmlFor="booking-name">Your name
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
              <label className="form-field" htmlFor="booking-email">Email address
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>
              <button className="button-primary booking-submit" type="submit">
                <CalendarDays size={17} /> Request session
              </button>
            </form>
            <p className="booking-disclaimer">This demo form confirms your request on this device. No booking or payment is processed.</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default SkillDetails
