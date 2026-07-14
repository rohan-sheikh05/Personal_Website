// src/components/ui/SectionHeader.jsx
//
// Every section should announce itself the same way: a small uppercase
// eyebrow label, a big title, an optional one-line subtitle - and it
// should fade/slide in the first time it scrolls into view, once, not
// every time you scroll past it.

import React from "react";
import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, subtitle, align = "left" }) {
  const alignClass = align === "center" ? "text-center mx-auto items-center" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 max-w-2xl flex flex-col ${alignClass}`}
    >
      {eyebrow && (
        <p className="text-sm font-semibold tracking-widest uppercase text-teal-400 mb-2">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-white">{title}</h2>
      {subtitle && <p className="text-gray-400 mt-3 text-lg">{subtitle}</p>}
    </motion.div>
  );
}
