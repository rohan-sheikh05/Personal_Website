// src/components/Background.jsx
//
// BUG FIX from the original site: the old blobs used
// `absolute w-full h-full` inside a wrapper with no explicit height, so
// h-full resolved against the hero section rather than the whole
// scrollable page - meaning they only ever appeared near the top.
// `fixed inset-0` covers the full viewport regardless of scroll position
// and page height, which is what was actually intended.
//
// Phase 4: blobs are now all teal/cyan family instead of a different
// rainbow color each - subtle depth without fighting the restrained palette.

import React from "react";
import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
        className="absolute w-96 h-96 bg-teal-500 rounded-full opacity-[0.08] top-10 left-10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "loop" }}
        className="absolute w-72 h-72 bg-cyan-500 rounded-full opacity-[0.06] top-1/2 right-10 blur-2xl"
      />
      <motion.div
        animate={{ y: [0, 25, 0], x: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "loop" }}
        className="absolute w-80 h-80 bg-teal-600 rounded-full opacity-[0.06] bottom-10 left-1/3 blur-2xl"
      />
    </div>
  );
}
