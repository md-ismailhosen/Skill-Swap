const authErrorMessages = {
  'auth/account-exists-with-different-credential': 'An account already exists with this email. Sign in using the method you used before.',
  'auth/email-already-in-use': 'An account with this email already exists. Try signing in instead.',
  'auth/invalid-credential': 'The email or password is incorrect. Check your details and try again.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/invalid-profile-attribute': 'The profile name or photo URL is invalid.',
  'auth/network-request-failed': 'A network error interrupted authentication. Check your connection and try again.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase Authentication.',
  'auth/popup-blocked': 'Your browser blocked the Google sign-in window. Allow popups and try again.',
  'auth/popup-closed-by-user': 'The Google sign-in window was closed before sign-in completed.',
  'auth/profile-update-failed': 'Your account was created, but your profile details could not be saved. You are signed in; try updating your profile again.',
  'auth/profile-photo-upload-failed': 'Your account was created, but the profile photo could not be uploaded. Check Firebase Storage settings and rules, then update the photo from your profile.',
  'auth/requires-recent-login': 'For your security, sign out and sign in again before changing this information.',
  'auth/too-many-requests': 'Too many attempts were made. Please wait a while and try again.',
  'auth/unauthorized-domain': 'This site is not authorized for Firebase sign-in. Add its domain in Firebase Authentication settings.',
  'auth/user-disabled': 'This account has been disabled. Contact support for help.',
  'auth/user-not-found': 'The email or password is incorrect. Check your details and try again.',
  'auth/weak-password': 'Choose a password with at least 6 characters, one uppercase letter, and one lowercase letter.',
  'auth/wrong-password': 'The email or password is incorrect. Check your details and try again.',
  'storage/bucket-not-found': 'Firebase Storage could not find the configured bucket. In Firebase Console, enable Storage and set VITE_FIREBASE_STORAGE_BUCKET to the exact bucket name shown for this project.',
  'storage/project-not-found': 'Firebase Storage could not find this project. Check VITE_FIREBASE_PROJECT_ID and the configured Storage bucket.',
  'storage/canceled': 'The profile photo upload was cancelled. Please try again.',
  'storage/object-not-found': 'The uploaded profile photo could not be found. Try uploading it again.',
  'storage/retry-limit-exceeded': 'The photo upload took too long. Check your connection and try again.',
  'storage/unauthorized': 'Firebase Storage denied this photo upload. Check your Storage security rules.',
  'storage/unknown': 'Firebase Storage could not upload the photo. Check your connection and Storage configuration.',
}

export function getAuthErrorMessage(error) {
  if (!error) return 'Something went wrong. Please try again.'
  if (error.code && authErrorMessages[error.code]) return authErrorMessages[error.code]
  const message = typeof error.message === 'string' ? error.message : ''
  return message.replace(/^Firebase:\s*/i, '').replace(/\s*\(auth\/[^)]+\)\.?$/i, '') ||
    'Something went wrong. Please try again.'
}

export function validatePassword(password) {
  if (password.length < 6) return 'Password must be at least 6 characters.'
  if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter.'
  if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter.'
  return null
}

export function validatePhotoURL(photoURL) {
  try {
    return new URL(photoURL).protocol === 'https:'
  } catch {
    return false
  }
}

export function validateProfilePhoto(file) {
  if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    return 'Choose a JPG, PNG, or WebP image for your profile photo.'
  }
  if (file.size > 5 * 1024 * 1024) {
    return 'Profile photo must be 5 MB or smaller.'
  }
  return null
}
