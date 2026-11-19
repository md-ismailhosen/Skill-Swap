import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
import { getAuthErrorMessage } from '../firebase/authErrors.js'

function ForgotPassword() {
  const { resetPassword, isConfigured } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState(location.state?.email || '')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    try {
      await resetPassword(email)
      toast.success('Password reset email sent. Opening Gmail…')
      window.location.assign('https://mail.google.com/')
    } catch (error) {
      toast.error(getAuthErrorMessage(error))
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">We can help</span>
        <h1>Reset your password</h1>
        <p>Enter your account email and we’ll send a secure reset link.</p>
        {!isConfigured && <p className="auth-notice" role="status">Add your Firebase settings to <code>.env.local</code>, then restart the dev server to enable password reset.</p>}
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
        <button className="button-primary auth-submit" type="submit" disabled={submitting}>
          {submitting ? 'Sending reset email…' : 'Send reset link'}
        </button>
        <p className="auth-foot"><Link to="/login" state={{ email }}>Back to sign in</Link></p>
      </form>
    </section>
  )
}

export default ForgotPassword
