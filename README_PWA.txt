Nhat-CamnangVisa - PWA Package
===============================

This folder contains everything to deploy as a Progressive Web App (PWA).

Files included:
- index.html           (your app content)
- manifest.json        (PWA metadata)
- service-worker.js    (for offline cache)
- icons/               (NV icons for app install)

Usage:
1. Upload all files in this folder to any static web host, e.g.:
   - Netlify (https://www.netlify.com/)
   - Vercel (https://vercel.com/)
   - GitHub Pages
   - Firebase Hosting

2. Once hosted (e.g., https://nhatcamnangvisa.netlify.app), open it on your phone.

3. To install:
   - Android (Chrome): open site → menu → "Add to Home Screen".
   - iPhone (Safari): open site → share icon → "Add to Home Screen".

4. It will appear as an app named "Nhat-CamnangVisa" with NV logo.
   It works offline after first load (due to service worker caching).

Optional: You can modify manifest.json to adjust colors or name.

Enjoy!