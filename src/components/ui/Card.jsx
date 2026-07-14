// src/components/ui/Card.jsx
//
// `tilt` is opt-in (default off) so it only affects sections that
// specifically asked for it (Projects, Certificates) without changing
// Skills/Achievements/Contact/Club, which never asked for this. Rotation
// is capped very small on purpose - meant to read as "premium," not
// "gimmick."

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const MAX_TILT_DEG = 3.5;

export default function Card({ children, className = "", hover = true, tilt = false }) {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setRotate({
      x: (0.5 - py) * MAX_TILT_DEG * 2,
      y: (px - 0.5) * MAX_TILT_DEG * 2,
    });
  }
  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  const surface = (
    <div
      className={`bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-sm ${
        hover
          ? "transition duration-300 hover:-translate-y-1.5 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-500/5"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );

  if (!tilt) return surface;

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: 800 }}>
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {surface}
      </motion.div>
    </div>
  );
}
