import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import toast from 'react-hot-toast'
import AuthContext from './AuthContext.jsx'
import {
  auth,
  isFirebaseConfigured,
  isFirebaseStorageConfigured,
  missingFirebaseEnv,
  storage,
} from '../firebase/firebase.config.js'
import {
  getAuthErrorMessage,
  validatePassword,
  validatePhotoURL,
  validateProfilePhoto,
} from '../firebase/authErrors.js'

function requireAuth() {
  if (auth) return auth
  throw new Error(
    `Firebase Authentication is not configured. Add ${missingFirebaseEnv.join(', ')} to .env.local and restart the development server.`,
  )
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [, setProfileRevision] = useState(0)
  const [loading, setLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!auth) return undefined

    return onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
        setLoading(false)
      },
      (error) => {
        console.error('Unable to read Firebase authentication state:', error)
        toast.error('Unable to check your sign-in status. Please refresh and try again.')
        setLoading(false)
      },
    )
  }, [])

  const value = {
    user,
    loading,
    isConfigured: isFirebaseConfigured,
    isStorageConfigured: isFirebaseStorageConfigured,
    login: (email, password) =>
      signInWithEmailAndPassword(requireAuth(), email.trim(), password),
    loginWithGoogle: () =>
      signInWithPopup(requireAuth(), new GoogleAuthProvider()),
    register: async (name, email, password, photoFile) => {
      const passwordError = validatePassword(password)
      if (passwordError) throw new Error(passwordError)
      const photoError = validateProfilePhoto(photoFile)
      if (photoError) throw new Error(photoError)
      if (!isFirebaseStorageConfigured || !storage) {
        throw new Error(
          'Firebase Storage is not configured. Set VITE_FIREBASE_STORAGE_BUCKET in .env.local and restart the development server.',
        )
      }

      const credential = await createUserWithEmailAndPassword(
        requireAuth(),
        email.trim(),
        password,
      )
      try {
        const safeFileName = photoFile.name.replace(/[^a-zA-Z0-9._-]/g, '-')
        const photoRef = ref(
          storage,
          `profile-photos/${credential.user.uid}/${Date.now()}-${safeFileName}`,
        )
        const uploadedPhoto = await uploadBytes(photoRef, photoFile, {
          contentType: photoFile.type,
        })
        const photoURL = await getDownloadURL(uploadedPhoto.ref)
        await updateProfile(credential.user, {
          displayName: name.trim(),
          photoURL,
        })
      } catch (error) {
        console.error('Firebase profile photo upload failed:', {
          code: typeof error?.code === 'string' ? error.code : 'unknown',
          message:
            typeof error?.message === 'string'
              ? error.message
              : 'No error message was provided.',
        })
        throw Object.assign(
          new Error(
            `Your account was created, but the profile photo could not be uploaded. ${getAuthErrorMessage(error)} You are signed in; update your profile photo later or try again.`,
            { cause: error },
          ),
          { code: 'auth/profile-photo-upload-failed' },
        )
      }
      setUser(credential.user)
      setProfileRevision((revision) => revision + 1)
      return credential
    },
    logout: () => signOut(requireAuth()),
    resetPassword: (email) =>
      sendPasswordResetEmail(requireAuth(), email.trim()),
    updateUserProfile: async (name, photoURL) => {
      const currentAuth = requireAuth()
      if (!currentAuth.currentUser) {
        throw new Error('Sign in before updating your profile.')
      }
      if (!name.trim()) throw new Error('Your name cannot be empty.')
      if (photoURL?.trim() && !validatePhotoURL(photoURL)) {
        throw new Error('Enter a valid HTTPS photo URL.')
      }

      const profile = {
        displayName: name.trim(),
        photoURL: photoURL?.trim() || null,
      }
      await updateProfile(currentAuth.currentUser, profile)
      setUser(currentAuth.currentUser)
      setProfileRevision((revision) => revision + 1)
      return currentAuth.currentUser
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
