// src/utils/uploadImage.js
//
// Uploads a file to Cloudinary's free plan (no credit card required —
// unlike Firebase Storage, which now requires the paid Blaze plan even
// for free-tier-sized usage). Uses an "unsigned" upload preset, which is
// the standard safe way to upload directly from the browser without
// exposing any secret key.
//
// One-time setup (see SETUP_INSTRUCTIONS.md):
//   1. Create a free account at cloudinary.com (no card needed).
//   2. Dashboard -> note your "Cloud name" at the top.
//   3. Settings (gear icon) -> Upload -> Upload presets -> Add upload preset
//      -> Signing Mode: "Unsigned" -> Save -> note the preset name.
//   4. Put both values in .env.local / Cloudflare env vars:
//      REACT_APP_CLOUDINARY_CLOUD_NAME, REACT_APP_CLOUDINARY_UPLOAD_PRESET

export async function uploadFile(file) {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary isn't configured — check REACT_APP_CLOUDINARY_CLOUD_NAME and REACT_APP_CLOUDINARY_UPLOAD_PRESET in .env.local (and in Cloudflare's env vars for the live site)."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // "auto" so this same function works for images (hero photos, certs,
  // club logos) and non-image files (the CV PDF) alike.
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody?.error?.message || `Upload failed (${res.status})`);
  }

  const data = await res.json();
  return data.secure_url;
}
