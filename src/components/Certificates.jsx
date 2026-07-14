// src/components/Certificates.jsx
//
// Card grid (no slider) with:
//  - a clickable category filter bar above the grid ("All" + every
//    distinct category found in the data), with a smooth reflow when the
//    filter changes (AnimatePresence + layout animation)
//  - clicking a certificate's image opens it full-size in a lightbox;
//    the "View Credential" button stays a separate, normal link
//  - a very small tilt-on-hover, matching Projects

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BadgeCheck, ZoomIn } from "lucide-react";
import useCollection from "../hooks/useCollection";
import { fallbackCertificates } from "../data/fallbackData";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import Lightbox from "./ui/Lightbox";

function CertificateCard({ title, url, category, issuer, year, credentialUrl, index, onImageClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
    >
      <Card className="h-full flex flex-col overflow-hidden !p-0" tilt>
        <button
          onClick={onImageClick}
          aria-label={`View full-size: ${title}`}
          className="relative w-full h-44 overflow-hidden group/img text-left"
        >
          <img src={url} alt={title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/10 to-transparent" />
          <div className="absolute inset-0 bg-slate-950/0 group-hover/img:bg-slate-950/30 transition-colors flex items-center justify-center">
            <ZoomIn size={22} className="text-white opacity-0 group-hover/img:opacity-90 transition-opacity" />
          </div>
          {category && (
            <div className="absolute top-3 left-3 bg-slate-950/70 border border-teal-500/30 text-teal-300 text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full backdrop-blur-sm">
              {category}
            </div>
          )}
        </button>

        <div className="p-6 flex flex-col flex-1 -mt-4 relative">
          <h3 className="text-lg font-bold text-white mb-3 leading-snug">{title}</h3>

          {(issuer || year) && (
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span className="flex items-center gap-1.5 truncate">
                <BadgeCheck size={15} className="text-teal-400 flex-shrink-0" />
                <span className="truncate">{issuer}</span>
              </span>
              {year && <span className="flex-shrink-0 ml-2">{year}</span>}
            </div>
          )}

          <a
            href={credentialUrl || url}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex items-center justify-center gap-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-700 hover:border-teal-500/40 transition rounded-lg px-4 py-2.5 text-sm font-medium text-white"
          >
            <ExternalLink size={14} /> View Credential
          </a>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Certificates() {
  const { data: certificates } = useCollection("certificates", fallbackCertificates);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = useMemo(() => {
    const found = new Set(certificates.map((c) => c.category).filter(Boolean));
    return ["All", ...found];
  }, [certificates]);

  const filtered =
    activeCategory === "All" ? certificates : certificates.filter((c) => c.category === activeCategory);

  return (
    <section id="certificates" className="px-6 py-24 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Validations"
        title="Certificates"
        subtitle="Credentials from competitions, courses, and events."
      />

      {categories.length > 2 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                activeCategory === cat
                  ? "bg-teal-500 border-teal-500 text-slate-950"
                  : "bg-slate-800/60 border-slate-700 text-slate-300 hover:border-teal-500/40 hover:text-teal-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((cert, i) => (
            <CertificateCard
              key={cert.id}
              {...cert}
              index={i}
              onImageClick={() => setLightboxImage({ url: cert.url, alt: cert.title })}
            />
          ))}
        </AnimatePresence>
      </div>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
