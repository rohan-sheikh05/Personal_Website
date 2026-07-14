// src/components/Footer.jsx
// Phase 4: slate border/text to match the rest of the theme.
import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-8 border-t border-slate-800 text-sm text-slate-500">
      © {new Date().getFullYear()} Rohan Sheikh. All rights reserved.
    </footer>
  );
}
