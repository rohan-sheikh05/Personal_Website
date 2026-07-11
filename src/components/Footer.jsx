// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="text-center py-6 border-t border-gray-700 text-sm text-gray-400">
      © {new Date().getFullYear()} Rohan Sheikh. All rights reserved.
    </footer>
  );
}
