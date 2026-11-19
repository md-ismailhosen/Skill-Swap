import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Pencil, Save, Sprout, X } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth.js'
import { getAuthErrorMessage } from '../firebase/authErrors.js'

function MyProfile() {
  const { user, updateUserProfile } = useAuth()
  const [name, setName] = useState(user.displayName || '')
  const [photoURL, setPhotoURL] = useState(user.photoURL || '')
  const [editing, setEditing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function cancelEdit() {
    setName(user.displayName || '')
    setPhotoURL(user.photoURL || '')
    setEditing(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    try {
      await updateUserProfile(name, photoURL)
      toast.success('Your profile has been updated.')
      setEditing(false)
    } catch (error) {
      toast.error(getAuthErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  const avatar = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'Member')}&background=eaf3ec&color=2e7650&size=160`

  return (
    <section className="auth-page">
      <article className="profile-panel">
        <div className="profile-heading">
          <img className="provider-large-avatar" style={{ margin: 0 }} src={avatar} alt="" />
          <div>
            <span className="eyebrow">Your SkillSwap profile</span>
            <h1 className="profile-title">{user.displayName || 'Community member'}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>
        <p className="profile-copy">Manage how you appear to your SkillSwap neighbors.</p>
        <button
          className="button-primary profile-edit-toggle"
          type="button"
          onClick={() => editing ? cancelEdit() : setEditing(true)}
          aria-expanded={editing}
          aria-controls="profile-edit-form"
        >
          {editing ? <X size={16} /> : <Pencil size={16} />}
          {editing ? 'Cancel' : 'Update Profile'}
        </button>
        {editing && (
          <form className="profile-edit-form" id="profile-edit-form" onSubmit={handleSubmit}>
            <h2 className="profile-form-heading">Edit your profile</h2>
            <label className="form-field">Display name
              <input name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} maxLength={60} required />
            </label>
            <label className="form-field">Photo URL
              <input name="photoURL" type="url" autoComplete="url" placeholder="https://example.com/your-photo.jpg" value={photoURL} onChange={(event) => setPhotoURL(event.target.value)} />
              <span className="field-hint">Leave blank to remove your photo and use the default avatar.</span>
            </label>
            <div className="profile-form-actions">
              <button className="button-primary" type="submit" disabled={submitting}>
                <Save size={16} /> {submitting ? 'Saving…' : 'Save changes'}
              </button>
              <button className="profile-cancel-button" type="button" onClick={cancelEdit} disabled={submitting}>Cancel</button>
            </div>
          </form>
        )}
        <div className="profile-neighborhood"><MapPin size={16} /> Add your neighborhood when you share your first skill.</div>
        <Link className="button-primary" style={{ marginTop: 13 }} to="/#popular-skills"><Sprout size={16} /> Explore skills</Link>
      </article>
    </section>
  )
}

export default MyProfile
