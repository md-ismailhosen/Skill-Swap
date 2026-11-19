import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
import { getAuthErrorMessage } from '../firebase/authErrors.js'

function Login() {
  const { login, loginWithGoogle, isConfigured } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState(location.state?.email || '')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const destination = location.state?.from || '/profile'

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setSubmitting(true)
    try {
      await login(email, form.get('password'))
      toast.success('Welcome back!')
      navigate(destination, { replace: true })
    } catch (error) {
      toast.error(getAuthErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleLogin() {
    setSubmitting(true)
    try {
      await loginWithGoogle()
      toast.success('Signed in with Google. Welcome to SkillSwap!')
      navigate(destination, { replace: true })
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        toast('Google sign-in was cancelled.')
      } else {
        toast.error(getAuthErrorMessage(error))
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Good to see you again</span>
        <h1>Welcome back</h1>
        <p>Sign in to pick up where you left off.</p>
        {!isConfigured && <p className="auth-notice" role="status">Add your Firebase settings to <code>.env.local</code>, then restart the dev server to enable sign in.</p>}
        <label className="form-field">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="form-field">
          Password
          <input name="password" type="password" autoComplete="current-password" placeholder="Your password" required />
        </label>
        <div className="forgot-link-row">
          <Link className="text-link" to="/forgot-password" state={{ email }}>Forgot password?</Link>
        </div>
        <button className="button-primary auth-submit" type="submit" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
        <div className="auth-divider"><span>or continue with</span></div>
        <button className="google-button" type="button" onClick={handleGoogleLogin} disabled={submitting}>
          <span className="google-mark" aria-hidden="true">G</span> Continue with Google
        </button>
        <p className="auth-foot">New to SkillSwap? <Link to="/register">Sign up</Link></p>
      </form>
    </section>
  )
}

export default Login
