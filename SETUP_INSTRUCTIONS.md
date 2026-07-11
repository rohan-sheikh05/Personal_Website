# Setup instructions

Everything code-side is done. These are the manual steps only you can do
(they need your Google/Firebase/GitHub/Cloudflare accounts). Go top to
bottom - each step depends on the one before it.

## 1. Create your Firebase project

1. Go to https://console.firebase.google.com → **Add project** → name it
   (e.g. "rohan-portfolio") → you can disable Google Analytics, you don't
   need it → Create.

## 2. Register a Web App and get your config keys

1. In your new Firebase project, click the **</> (Web)** icon on the project overview page.
2. Give it a nickname (e.g. "portfolio-web") → **Register app**. You don't need Firebase Hosting.
3. It'll show you a `firebaseConfig` object with 6 values (`apiKey`, `authDomain`, etc.) - keep this tab open, you'll need it in step 6.

## 3. Turn on Authentication (so only you can access /admin)

1. Left sidebar → **Build → Authentication** → **Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab → **Add user** → enter your own email + a strong password. This is your admin login - there is no public sign-up page anywhere in the app, so this is the only account that will ever exist.

## 4. Turn on Firestore Database

1. Left sidebar → **Build → Firestore Database** → **Create database**.
2. Choose a location close to you (e.g. `asia-south1`) → start in **production mode**.
3. Go to the **Rules** tab, delete what's there, and paste in the contents of `firestore.rules` (included in this delivery) → **Publish**.

## 5. Turn on Storage (for photos, certificates, club logos, your CV)

1. Left sidebar → **Build → Storage** → **Get started** → same location as Firestore → production mode.
2. Go to the **Rules** tab, paste in the contents of `storage.rules` → **Publish**.

> Note: Firebase Storage requires linking a billing account (Blaze plan) as of recent changes, but usage stays free under very generous limits (5GB storage, 1GB/day downloads) for a personal site like this - you won't be charged unless you go far beyond that.

## 6. Add your files to the repo

Copy everything from this delivery into your `Personal_Website` repo, preserving the folder structure:

```
src/
  firebase.js
  App.js                     ← replaces your current App.js
  contexts/AuthContext.js
  hooks/useCollection.js
  data/fallbackData.js
  data/iconMap.js
  components/                ← all new files
  admin/                     ← all new files
public/
  _redirects                 ← new, required for /admin to work on refresh
```

## 7. Install the two new dependencies

From your repo root:

```bash
npm install firebase react-router-dom
```

## 8. Set your environment variables

**Locally:** copy `.env.example` to `.env.local` in your repo root, and fill in the 6 values from step 2. `.env.local` is already covered by Create React App's default `.gitignore` - double check it's not being committed (`git status` after creating it should not show it).

**On Cloudflare:** Cloudflare Pages dashboard → your project → **Settings → Environment variables** → add all 6 `REACT_APP_FIREBASE_*` keys with the same values, for both **Production** and **Preview**. Cloudflare needs its own copy - it doesn't read your local `.env.local`.

## 9. Seed your existing content into Firestore

This uploads your current skills/achievements/certificates/projects/photos into Firestore, so the admin panel starts populated instead of empty.

1. Firebase Console → ⚙️ **Project settings → Service accounts** → **Generate new private key** → save the downloaded file as `scripts/serviceAccountKey.json`.
   **Important:** this file is a full admin credential for your Firebase project. Never commit it. Add `scripts/serviceAccountKey.json` to your `.gitignore` right now, before doing anything else.
2. ```bash
   cd scripts
   npm install
   node seedFirestore.js
   ```
3. You should see a `✓ Seeded ... into "..."` line for each collection. Delete `scripts/serviceAccountKey.json` afterward if you want extra safety (you can always regenerate it later).

## 10. Test locally

```bash
npm start
```

- Visit `http://localhost:3000` - should look identical to your current live site, now loading from Firestore.
- Visit `http://localhost:3000/admin` - log in with the account from step 3 - try editing something and confirm it updates on the main site live (no refresh needed).

## 11. Deploy

```bash
git add .
git commit -m "Refactor into components, add Firebase-backed admin panel, Club Affiliations section, CV button"
git push
```

Cloudflare Pages will auto-build and deploy as usual. Once live, re-test `/admin` on the real domain - this is what confirms the `_redirects` file is working.

## 12. Add your Club Affiliations

I don't have access to your LinkedIn data, so this section starts empty (it won't even show on the site until you add at least one entry). Once you're logged into `/admin`, go to **Club Affiliations** → **Add new**, and fill in each role: title, organization, start/end date, description, and optionally a logo. Sort order: give your most recent/current role `0`, then `1`, `2`, etc.

---

## If something doesn't match your repo

I built this from your `App.js` plus standard Create React App conventions, but I don't have live access to your actual GitHub repo contents. If your project structure differs from what's assumed here (e.g. a different `src/index.js`, a `craco.config.js`, or Tailwind content paths that don't cover `src/admin/**` and `src/components/**`), send me:
- `src/index.js`
- `package.json`
- `tailwind.config.js`

and I'll adjust anything that needs it.
