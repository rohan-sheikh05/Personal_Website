// src/components/ui/Lightbox.jsx
//
// Simple fullscreen image viewer. Click the backdrop or the close button
// to dismiss; clicking the image itself doesn't close it (so a mis-click
// on the image doesn't feel punishing).

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Lightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-white hover:bg-teal-500 hover:text-slate-950 transition"
          >
            <X size={20} />
          </button>
          <motion.img
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            src={image.url}
            alt={image.alt || ""}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[85vh] rounded-xl border border-slate-700 shadow-2xl object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
