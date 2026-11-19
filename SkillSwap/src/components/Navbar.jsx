import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { LogOut, Menu, Sprout, X } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
import { getAuthErrorMessage } from '../firebase/authErrors.js'

function Navbar() {
  const { user, loading, logout, isConfigured } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const closeMenu = () => setMenuOpen(false)

  async function handleLogout() {
    try {
      await logout()
      closeMenu()
      toast.success('You have been logged out.')
      navigate('/')
    } catch (error) {
      toast.error(getAuthErrorMessage(error))
    }
  }

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link className="brand" to="/" aria-label="SkillSwap home" onClick={closeMenu}>
          <span className="brand-mark"><Sprout size={21} strokeWidth={2.2} /></span>
          <span>Skill<span style={{ color: 'var(--green)' }}>Swap</span></span>
        </Link>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/profile" onClick={closeMenu}>My Profile</NavLink>
        </nav>

        <div className="nav-actions">
          {loading ? (
            <span className="auth-loading-label" role="status">Checking session…</span>
          ) : user ? (
            <>
              <Link className="avatar-wrap" to="/profile" aria-label="Open your profile">
                <img
                  className="avatar"
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'Member')}&background=eaf3ec&color=2e7650`}
                  alt=""
                />
                <span className="avatar-tooltip">{user.displayName || user.email}</span>
              </Link>
              <button className="logout-button" type="button" onClick={handleLogout} aria-label="Log out">
                <LogOut size={15} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-login" to="/login" title={!isConfigured ? 'Set Firebase environment variables to enable sign in' : undefined}>Login</Link>
              <Link className="button-primary nav-signup" to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
