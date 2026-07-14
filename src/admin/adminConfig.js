// src/admin/adminConfig.js
//
// Each entry describes one Firestore collection as a form: which fields
// it has, what type of input each needs, and whether it needs an image
// upload. CollectionEditor.jsx reads this to render the right form -
// so adding a whole new admin-editable content type later is just adding
// an entry here, not building a new form component.
//
// Field "type" options: "text", "textarea", "list" (comma-separated ->
// array of strings), "icon" (dropdown from iconMap), "image" (file upload
// to Storage), "date" (plain text, e.g. "Jan 2024").

const adminConfig = {
  heroImages: {
    label: "Photo Gallery",
    collection: "heroImages",
    hasImage: true,
    imageFieldName: "url",
    fields: [
      { name: "alt", label: "Short title (shown as the caption heading)", type: "text", placeholder: "Rohan at TEDxBUET" },
      { name: "description", label: "Short description of the event/photo (shown under the title)", type: "textarea", placeholder: "Coordinating logistics backstage at TEDxBUET 2025." },
    ],
  },
  skills: {
    label: "Skills",
    collection: "skills",
    hasImage: false,
    fields: [
      { name: "title", label: "Category title", type: "text", required: true },
      { name: "icon", label: "Icon", type: "icon", required: true },
      { name: "color", label: "Accent color (hex)", type: "text", placeholder: "#60a5fa" },
      { name: "items", label: "Skill items (comma-separated)", type: "list" },
    ],
  },
  achievements: {
    label: "Achievements",
    collection: "achievements",
    hasImage: false,
    fields: [
      { name: "title", label: "Category title", type: "text", required: true },
      { name: "points", label: "Bullet points (comma-separated)", type: "list" },
    ],
  },
  certificates: {
    label: "Certificates",
    collection: "certificates",
    hasImage: true,
    imageFieldName: "url",
    fields: [
      { name: "title", label: "Certificate title", type: "text", required: true },
      { name: "category", label: "Category (e.g. Awards, Robotics, Research)", type: "text", required: true },
      { name: "issuer", label: "Issuing institution/organization", type: "text", required: true },
      { name: "year", label: "Year", type: "text", placeholder: "2026" },
      { name: "credentialUrl", label: "Credential verification link (optional - falls back to the certificate image if left blank)", type: "text" },
    ],
  },
  projects: {
    label: "Projects",
    collection: "projects",
    hasImage: true,
    imageFieldName: "thumbnailUrl",
    fields: [
      { name: "title", label: "Project title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "techStack", label: "Tech stack / tools used (comma-separated)", type: "list" },
      { name: "link", label: "Project link (GitHub, live demo, etc. — optional)", type: "text" },
    ],
  },
};

export default adminConfig;
