import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Eye, EyeOff, ImagePlus, Upload, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
import {
  getAuthErrorMessage,
  validatePassword,
  validateProfilePhoto,
} from '../firebase/authErrors.js'

function Register() {
  const { register, isConfigured, isStorageConfigured } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [photoSelection, setPhotoSelection] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const photoInput = useRef(null)

  useEffect(() => {
    const previewURL = photoSelection?.previewURL
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL)
    }
  }, [photoSelection])

  function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const photoError = validateProfilePhoto(file)
    if (photoError) {
      toast.error(photoError)
      event.target.value = ''
      return
    }
    setPhotoSelection({ file, previewURL: URL.createObjectURL(file) })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const password = form.get('password')
    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }
    if (password !== form.get('confirmPassword')) {
      toast.error('Those passwords do not match.')
      return
    }
    if (!photoSelection?.file) {
      toast.error('Please upload a profile photo.')
      return
    }

    setSubmitting(true)
    try {
      await register(
        form.get('name'),
        form.get('email'),
        password,
        photoSelection.file,
      )
      toast.success('Welcome to SkillSwap!')
      navigate('/profile')
    } catch (error) {
      toast.error(
        error.code === 'auth/profile-photo-upload-failed'
          ? error.message
          : getAuthErrorMessage(error),
      )
      if (error.code === 'auth/profile-photo-upload-failed') navigate('/profile')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Good things grow when shared</span>
        <h1>Join your neighbors</h1>
        <p>Create an account and start learning or sharing skills.</p>
        {!isConfigured && <p className="auth-notice" role="status">Add your Firebase settings to <code>.env.local</code>, then restart the dev server to enable sign up.</p>}
        {isConfigured && !isStorageConfigured && <p className="auth-notice" role="status">Set <code>VITE_FIREBASE_STORAGE_BUCKET</code> and enable Firebase Storage to upload a profile photo.</p>}
        <label className="form-field">Your name
          <input name="name" autoComplete="name" placeholder="How should we call you?" required maxLength={60} />
        </label>
        <label className="form-field">Email address
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </label>
        <div className="form-field">
          <span id="profile-photo-label">Profile photo</span>
          <div className={`photo-upload${photoSelection ? ' has-photo' : ''}`}>
            {photoSelection ? (
              <>
                <img className="photo-upload-preview" src={photoSelection.previewURL} alt="Selected profile preview" />
                <div className="photo-upload-info">
                  <span className="photo-upload-filename">{photoSelection.file.name}</span>
                  <span className="photo-upload-success"><CheckCircle2 size={14} /> Ready to upload</span>
                </div>
                <button
                  className="photo-remove-button"
                  type="button"
                  aria-label="Remove selected profile photo"
                  onClick={() => {
                    setPhotoSelection(null)
                    if (photoInput.current) photoInput.current.value = ''
                  }}
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                <span className="photo-upload-icon"><ImagePlus size={21} /></span>
                <span className="photo-upload-copy">Choose a photo for your profile</span>
                <span className="photo-upload-hint">JPG, PNG, or WebP · up to 5 MB</span>
              </>
            )}
            <label className="photo-upload-button" htmlFor="profile-photo">
              <Upload size={15} /> {photoSelection ? 'Change photo' : 'Upload photo'}
            </label>
            <input
              id="profile-photo"
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              aria-labelledby="profile-photo-label"
              ref={photoInput}
              onChange={handlePhotoChange}
              className="visually-hidden-file"
            />
          </div>
        </div>
        <label className="form-field">Password
          <span className="password-input-wrap">
            <input name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="At least 6 characters" minLength={6} required />
            <button className="password-visibility" type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
          <span className="field-hint">At least 6 characters, with an uppercase and a lowercase letter.</span>
        </label>
        <label className="form-field">Confirm password
          <span className="password-input-wrap">
            <input name="confirmPassword" type={showConfirmation ? 'text' : 'password'} autoComplete="new-password" placeholder="Enter your password again" minLength={6} required />
            <button className="password-visibility" type="button" onClick={() => setShowConfirmation((visible) => !visible)} aria-label={showConfirmation ? 'Hide confirmation password' : 'Show confirmation password'} aria-pressed={showConfirmation}>
              {showConfirmation ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </span>
        </label>
        <button className="button-primary auth-submit" type="submit" disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
        <p className="auth-foot">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </section>
  )
}

export default Register
