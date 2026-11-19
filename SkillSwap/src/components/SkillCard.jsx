import { ArrowUpRight, CalendarDays, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

function SkillCard({ skill }) {
  const providerInitials = skill.providerName
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <article className="skill-card" data-aos="fade-up">
      <div className="skill-image-wrap">
        <img className="skill-image" src={skill.image} alt={skill.skillName} loading="lazy" />
        <span className="skill-category">{skill.category}</span>
      </div>
      <div className="skill-content">
        <div className="skill-title-row">
          <h3 className="skill-title">{skill.skillName}</h3>
          <span className="rating"><Star size={15} fill="currentColor" /> {skill.rating.toFixed(1)}</span>
        </div>
        <div className="skill-provider">
          <span className="provider-initials" aria-hidden="true">{providerInitials}</span>
          <span>with <strong>{skill.providerName}</strong></span>
        </div>
        <div className="skill-bottom">
          <span className="skill-price"><strong>${skill.price}</strong> / session</span>
          <Link className="details-link" to={`/skills/${skill.skillId}`}>
            View details <ArrowUpRight size={14} />
          </Link>
        </div>
        <p className="skill-availability"><CalendarDays size={14} /> {skill.slotsAvailable} {skill.slotsAvailable === 1 ? 'slot' : 'slots'} available</p>
      </div>
    </article>
  )
}

export default SkillCard
