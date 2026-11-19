import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function PrivacyPolicy() {
  return (
    <section className="section-space">
      <article className="container" style={{ maxWidth: 820 }}>
        <Link className="text-link" to="/"><ArrowLeft size={16} /> Back to SkillSwap</Link>
        <div style={{ marginTop: 28 }}>
          <span className="eyebrow">Your information matters</span>
          <h1 className="section-heading">Privacy Policy</h1>
          <p className="section-copy">Last updated: November 19, 2026</p>
        </div>
        <div style={{ display: 'grid', gap: 27, marginTop: 32, color: '#59665d', lineHeight: 1.8 }}>
          <section>
            <h2 className="footer-heading" style={{ color: '#17241d' }}>About this project</h2>
            <p>SkillSwap is a community skill-exchange project. Skill listings currently come from static sample data. This version does not process payments or confirm lesson bookings.</p>
          </section>
          <section>
            <h2 className="footer-heading" style={{ color: '#17241d' }}>Account information</h2>
            <p>If Firebase Authentication is configured and you create an account, your email address and the display name you provide are used for sign-in and to show your profile. Authentication is provided by Firebase and subject to Google’s privacy practices. This app does not add analytics or advertising trackers.</p>
          </section>
          <section>
            <h2 className="footer-heading" style={{ color: '#17241d' }}>External services and links</h2>
            <p>Images and fonts may be requested from Unsplash and Google Fonts. Social links leave this site. If you request a lesson, your email app opens a draft addressed to our contact mailbox; you choose whether to send it. Those services have their own privacy policies.</p>
          </section>
          <section>
            <h2 className="footer-heading" style={{ color: '#17241d' }}>Questions</h2>
            <p>For privacy questions, email <a className="text-link" href="mailto:hello@skillswap.community?subject=Privacy%20question">hello@skillswap.community</a>.</p>
          </section>
        </div>
      </article>
    </section>
  )
}

export default PrivacyPolicy
