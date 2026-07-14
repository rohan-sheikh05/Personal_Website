// src/components/ui/Tag.jsx
//
// Border + text light up on hover - small detail, but it makes skill/tech
// tags feel interactive instead of static labels.

import React from "react";

const COLOR_MAP = {
  gray: "bg-slate-700/70 text-slate-200 border border-slate-600/50 hover:border-teal-400/60 hover:text-teal-200 hover:bg-slate-700",
  teal: "bg-teal-500/10 text-teal-300 border border-teal-500/30 hover:border-teal-400 hover:text-teal-200 hover:bg-teal-500/20",
  cyan: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/20",
};

export default function Tag({ children, color = "gray" }) {
  return (
    <span
      className={`inline-block text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap transition-colors duration-200 cursor-default ${
        COLOR_MAP[color] || COLOR_MAP.gray
      }`}
    >
      {children}
    </span>
  );
}
