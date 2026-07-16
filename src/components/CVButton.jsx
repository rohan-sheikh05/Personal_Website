// src/components/CVButton.jsx
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { FileText } from "lucide-react";
import { db } from "../firebase";

export default function CVButton({ variant = "nav", onClick }) {
  const [cvUrl, setCvUrl] = useState(null);

  useEffect(() => {
    // Explicitly scope the Firestore realtime subscriber
    const unsub = onSnapshot(
      doc(db, "siteConfig", "main"),
      (snap) => {
        if (snap.exists()) {
          setCvUrl(snap.data().cvUrl || null);
        } else {
          setCvUrl(null);
        }
      },
      (error) => {
        console.error("Firestore CV Fetch Error:", error);
        setCvUrl(null);
      }
    );
    
    // Unsubscribe listener when component unmounts
    return () => unsub();
  }, []);

  if (!cvUrl) return null;

  const baseClasses =
    "inline-flex items-center gap-2 font-semibold transition-all duration-300 rounded-full transform scale-100 active:scale-95 ease-out";

  const variantClasses =
    variant === "nav"
      ? `${baseClasses} border border-white/15 text-teal-300 bg-white/5 backdrop-blur-md hover:text-white hover:bg-teal-500/15 hover:border-teal-400/60 hover:scale-105 px-3.5 py-1.5 text-xs sm:text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0_15px_rgba(20,184,166,0.08)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_0_20px_rgba(20,184,166,0.3)] whitespace-nowrap`
      : `${baseClasses} bg-teal-500 hover:bg-teal-400 px-4 py-2 text-slate-950 justify-center mt-2 shadow-md`;

  return (
    <a
      href={cvUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={variantClasses}
    >
      <FileText size={variant === "nav" ? 15 : 18} />
      <span>{variant === "nav" ? "Resume" : "Download CV"}</span>
    </a>
  );
}