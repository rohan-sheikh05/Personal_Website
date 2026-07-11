// src/components/CVButton.jsx
//
// Reads the current CV file URL from the `siteConfig/main` Firestore doc.
// You upload/replace the PDF from the admin panel (Manage CV) - no
// redeploy needed to update it. If no CV has been uploaded yet, the
// button simply doesn't render, rather than linking to nothing.

import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { FileText } from "lucide-react";
import { db } from "../firebase";

export default function CVButton({ variant = "nav", onClick }) {
  const [cvUrl, setCvUrl] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "siteConfig", "main"),
      (snap) => setCvUrl(snap.exists() ? snap.data().cvUrl || null : null),
      () => setCvUrl(null)
    );
    return unsub;
  }, []);

  if (!cvUrl) return null;

  const baseClasses =
    "inline-flex items-center gap-2 font-semibold transition rounded-full";

  const variantClasses =
    variant === "nav"
      ? `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm text-white hover:opacity-90`
      : `${baseClasses} bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-white justify-center mt-2`;

  return (
    <a
      href={cvUrl}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={variantClasses}
    >
      <FileText size={18} />
      Download CV
    </a>
  );
}
