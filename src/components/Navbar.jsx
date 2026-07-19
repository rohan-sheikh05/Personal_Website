// src/components/Navbar.jsx
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CVButton from "./CVButton";

const LINKS = [
  { href: "#about", label: "About" },
  /*{ href: "#skills", label: "Skills" },*/
  { href: "#achievements", label: "Achievements" },
  { href: "#certificates", label: "Certificates" },
  /*{ href: "#club", label: "Club Affiliations" },*/
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });
  const linkRefs = useRef([]);

  function handleHover(i) {
    const el = linkRefs.current[i];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  }

  function handleRowLeave() {
    setPill((p) => ({ ...p, opacity: 0 }));
  }

  return (
    <nav className="fixed top-4 inset-x-0 mx-auto w-[90%] md:w-3/4 bg-black/40 backdrop-blur-lg px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between z-50">
      <a href="/" className="text-xl font-bold text-white hover:text-teal-400 transition-colors whitespace-nowrap">
        Rohan Sheikh
      </a>

      <div className="flex items-center justify-end gap-6 flex-shrink-0 w-auto">
        <div
          className="hidden lg:flex items-center gap-1 font-semibold text-sm lg:text-base relative"
          onMouseLeave={handleRowLeave}
        >
          <motion.span
            className="absolute top-0 h-full rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] pointer-events-none"
            animate={{ left: pill.left, width: pill.width, opacity: pill.opacity }}
            transition={{ type: "spring", stiffness: 280, damping: 23, mass: 0.6 }}
          />
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => (linkRefs.current[i] = el)}
              href={link.href}
              onMouseEnter={() => handleHover(i)}
              className="relative z-10 px-3 py-2 rounded-full text-gray-200 hover:text-white transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <CVButton variant="nav" />
          <button
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/5 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 60 }}
            className="absolute top-16 right-4 w-[85%] max-w-xs bg-black/95 text-white rounded-xl shadow-2xl p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4 text-lg">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="transition hover:text-teal-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
