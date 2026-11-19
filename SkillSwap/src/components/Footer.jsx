import { Mail, MapPin, Phone, Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-col">
          <Link className="brand" to="/" aria-label="SkillSwap home">
            <span className="brand-mark"><Sprout size={21} /></span>
            <span>Skill<span style={{ color: '#a5d5b3' }}>Swap</span></span>
          </Link>
          <p className="footer-brand-copy">
            Good things grow when we share. Learn something new, teach what you love, and build a stronger community.
          </p>
          <div className="footer-contact">
            <a href="mailto:md.ismail.hosen1797@gmail.com"><Mail size={15} /> md.ismail.hosen1797@gmail.com</a>
            <a href="tel:01770780629"><Phone size={15} /> 01770780629</a>
            <span><MapPin size={15} /> Made for local communities</span>
          </div>
          <div className="social-links" aria-label="Social media">
            <a className="social-link" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><span style={{ fontSize: 16, fontWeight: 800 }}>f</span></a>
            <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><span style={{ fontSize: 19, lineHeight: 1 }}>◎</span></a>
            <a className="social-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <span style={{ fontSize: 13, fontWeight: 800 }}>in</span>
            </a>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Explore</h2>
          <div className="footer-links">
            <Link to="/#popular-skills">Browse skills</Link>
            <Link to="/#how-it-works">How it works</Link>
            <Link to="/register">Become a provider</Link>
            <Link to="/profile">My profile</Link>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">Get in touch</h2>
          <div className="footer-links">
            <a href="mailto:md.ismail.hosen1797@gmail.com">Contact us</a>
            <a href="mailto:md.ismail.hosen1797@gmail.com?subject=SkillSwap%20support">Help & support</a>
            <Link to="/privacy">Privacy Policy</Link>
            <a href="mailto:hello@skillswap.community?subject=Terms%20of%20use">Terms of Use</a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {currentYear} SkillSwap. Better together.</span>
        <span>Made with care for neighbors, everywhere.</span>
      </div>
    </footer>
  )
}

export default Footer
