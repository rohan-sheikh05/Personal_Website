// src/components/StorySlider.jsx
//
// v4 — Responsive: coverflow on tablet/desktop, classic full slide on mobile.
//
// On screens >= 768px (Tailwind's `md` breakpoint) this renders the
// coverflow layout: a large center image with dimmed, scaled-down
// neighbor images peeking in from the edges (optionally 3D-tilted via
// SIDE_TILT_DEG below).
//
// On screens < 768px it falls back to the simpler "classic" version:
// one full-bleed image that slides completely off-screen while the
// next one slides fully in — better suited to narrow viewports where
// there's no room to usefully show peeking neighbors.
//
// Breakpoint detection uses matchMedia (not just a CSS media query)
// because the two layouts use different animation logic (coverflow
// needs per-slide offset math; classic needs enter/exit direction), so
// we need to know in JS which track to actually render.

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// ---- Tune the 3D feel of the coverflow (desktop/tablet) here ----------
// Set to 0 for a flat coverflow (no tilt, just scale/opacity/position).
// Set to something like 18–28 for a "rolling cylinder" 3D tilt.
const SIDE_TILT_DEG = 22; // <-- change to 0 for the flat version
// ------------------------------------------------------------------------

const SLOT_OFFSET_PERCENT = 64; // how far left/right the neighbor slides sit
const FAR_OFFSET_PERCENT = 130; // slides beyond the immediate neighbors
const DESKTOP_BREAKPOINT = 768; // px — matches Tailwind's `md`

// Detects whether the viewport is at/above `breakpoint`, updating live
// on resize/orientation change (e.g. rotating a tablet, resizing a
// browser window past the threshold).
function useIsDesktop(breakpoint = DESKTOP_BREAKPOINT) {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : true
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isDesktop;
}

// Shortest signed distance from `index` to `i` on a circular track of
// length `count`, e.g. with 10 slides, going from index 9 to i=0 gives
// +1, not +9 or -9.
function circularOffset(i, index, count) {
  let diff = i - index;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
}

function getSlideAnimate(offset) {
  const abs = Math.abs(offset);
  const sign = Math.sign(offset);

  if (abs === 0) {
    return {
      x: "0%",
      scale: 1,
      opacity: 1,
      rotateY: 0,
      zIndex: 30,
      filter: "brightness(1) blur(0px)",
    };
  }

  if (abs === 1) {
    return {
      x: `${sign * SLOT_OFFSET_PERCENT}%`,
      scale: 0.8,
      opacity: 0.55,
      rotateY: sign * -SIDE_TILT_DEG,
      zIndex: 20,
      filter: "brightness(0.65) blur(0.5px)",
    };
  }

  return {
    x: `${(sign || 1) * FAR_OFFSET_PERCENT}%`,
    scale: 0.6,
    opacity: 0,
    rotateY: (sign || 1) * -SIDE_TILT_DEG,
    zIndex: 0,
    filter: "brightness(0.5) blur(1px)",
  };
}

function CoverSlide({ image, offset }) {
  const isActive = offset === 0;

  return (
    <motion.div
      className="absolute inset-0"
      style={{ transformStyle: "preserve-3d" }}
      animate={getSlideAnimate(offset)}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-black/50 bg-slate-900">
        <img
          src={image.url}
          alt={image.alt || "Rohan Sheikh"}
          loading="lazy"
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

        {(image.alt || image.description) && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-5 sm:p-6"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {image.alt && (
              <h4 className="text-white font-semibold text-base sm:text-lg mb-1">
                {image.alt}
              </h4>
            )}
            {image.description && (
              <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
                {image.description}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function SimpleSlide({ image }) {
  return (
    <div className="relative w-full h-full">
      <img
        src={image.url}
        alt={image.alt || "Rohan Sheikh"}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      {(image.alt || image.description) && (
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          {image.alt && <h4 className="text-white font-semibold text-base sm:text-lg mb-1">{image.alt}</h4>}
          {image.description && (
            <p className="text-slate-300 text-sm leading-relaxed max-w-lg">{image.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function StorySlider({ images, autoplayMs = 4500 }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // only used by the mobile/classic track
  const [paused, setPaused] = useState(false);
  const isDesktop = useIsDesktop();
  const count = images.length;

  function next() {
    setDirection(1);
    setIndex((i) => (i + 1) % count);
  }
  function prev() {
    setDirection(-1);
    setIndex((i) => (i - 1 + count) % count);
  }
  function goTo(i) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  useEffect(() => {
    if (paused || count <= 1) return;
    const timer = setInterval(next, autoplayMs);
    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [paused, count, autoplayMs, index]);

  if (count === 0) return null;

  return (
    <div
      className="relative w-full max-w-2xl mx-auto select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full h-[260px] sm:h-[340px] md:h-[400px] lg:h-[440px]">
        {isDesktop ? (
          <div className="absolute inset-0" style={{ perspective: 1400 }}>
            {images.map((img, i) => (
              <CoverSlide key={img.id} image={img} offset={circularOffset(i, index, count)} />
            ))}
          </div>
        ) : (
          <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-black/50 bg-slate-900">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                initial={{ x: direction > 0 ? "100%" : "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: direction > 0 ? "-100%" : "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 32 }}
                className="absolute inset-0"
              >
                <SimpleSlide image={images[index]} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-slate-950/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-teal-500 hover:text-slate-950 hover:border-teal-400 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-slate-950/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-teal-500 hover:text-slate-950 hover:border-teal-400 transition"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex items-center flex-wrap justify-center gap-2 mt-5">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-teal-400" : "w-2 bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
