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
    fields: [{ name: "alt", label: "Description (for accessibility)", type: "text", placeholder: "Rohan at TEDxBUET" }],
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
    fields: [{ name: "title", label: "Certificate title", type: "text", required: true }],
  },
  projects: {
    label: "Projects",
    collection: "projects",
    hasImage: false,
    fields: [
      { name: "title", label: "Project title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  clubRoles: {
    label: "Club Affiliations",
    collection: "clubRoles",
    hasImage: true,
    imageFieldName: "imageUrl",
    fields: [
      { name: "role", label: "Role / position", type: "text", required: true },
      { name: "organization", label: "Club / organization", type: "text", required: true },
      { name: "startDate", label: "Start date", type: "date", placeholder: "Jan 2024", required: true },
      { name: "endDate", label: "End date (blank = Present)", type: "date", placeholder: "Dec 2024" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
};

export default adminConfig;
