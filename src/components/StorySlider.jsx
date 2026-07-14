// src/components/StorySlider.jsx
//
// Rebuilt (v2). Previous version crossfaded the center image in place,
// which read as "replacing" rather than "sliding." This version actually
// translates the slide fully off-screen in one direction while the next
// one slides in from the other side - a real directional slide, wrapping
// circularly (next from the last slide goes back to the first, still
// sliding the same direction).
//
// The old "browser window" frame (traffic-light dots + title bar) is
// gone. In its place: a gradient mesh at the bottom of the photo (same
// language as Projects/Certificates) with the photo's title + short
// description sitting on top of it as a caption - set both via the admin
// panel's Photo Gallery section.

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Slide({ image }) {
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
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
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
      <div className="relative w-full h-[300px] sm:h-[380px] md:h-[440px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl shadow-black/50 bg-slate-900">
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
            <Slide image={images[index]} />
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-950/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-teal-500 hover:text-slate-950 hover:border-teal-400 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-950/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-teal-500 hover:text-slate-950 hover:border-teal-400 transition"
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
