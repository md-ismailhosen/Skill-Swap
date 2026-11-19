# SkillSwap

SkillSwap is a local skill-exchange marketplace built with React, Vite, Tailwind CSS, Firebase Authentication, React Router, Swiper, AOS, React Hot Toast, and Lucide.

## Run locally

```sh
npm install
npm run dev
```

The homepage and skill listings work without Firebase credentials. To enable account creation, sign-in, password reset, and profiles:

1. Copy `.env.example` to `.env.local`.
2. Fill in the Firebase Web App values from your Firebase project.
3. Enable Email/Password and Google sign-in providers in Firebase Authentication.
4. Create/enable Firebase Storage and copy the exact bucket name shown in that project's Storage settings into `VITE_FIREBASE_STORAGE_BUCKET`. Do not guess or substitute a bucket suffix; the bucket must exist and belong to the configured Firebase project.
5. In Firebase Console → Storage → Rules, use rules like the following:

```text
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /profile-photos/{userId}/{fileName} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.auth.uid == userId
        && request.resource.size <= 5 * 1024 * 1024
        && request.resource.contentType.matches('image/(jpeg|png|webp)');
    }
  }
}
```

These rules limit uploads to each signed-in user’s own profile-photo directory and reject files larger than 5 MB or outside the supported image formats.
6. Add your local development host and deployed domain to Firebase Authentication's authorized domains.
7. Restart the Vite development server.

Firebase values are read from Vite environment variables and are not committed in this project.
Registration requires a name, email, JPG/PNG/WebP photo (up to 5 MB), and a password with at least six characters including uppercase and lowercase letters. Profile photos are uploaded to Firebase Storage. Google sign-in uses a Firebase popup. Forgot-password sends Firebase's reset email and then opens Gmail.

## Available scripts

- `npm run dev` — start the local development server.
- `npm run build` — create a production build.
- `npm run preview` — preview the production build.
- `npm run lint` — run Oxlint.
