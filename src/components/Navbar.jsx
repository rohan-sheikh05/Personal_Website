// src/components/Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import CVButton from "./CVButton";

const LINKS = [
  { href: "#about", label: "About", hoverClass: "hover:text-indigo-400" },
  { href: "#skills", label: "Skills", hoverClass: "hover:text-purple-400" },
  { href: "#achievements", label: "Achievements", hoverClass: "hover:text-amber-400" },
  { href: "#certificates", label: "Certificates", hoverClass: "hover:text-green-400" },
  { href: "#club", label: "Club Affiliations", hoverClass: "hover:text-teal-400" },
  { href: "#projects", label: "Projects", hoverClass: "hover:text-yellow-400" },
  { href: "#contact", label: "Contact", hoverClass: "hover:text-blue-400" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-lg px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between w-[90%] md:w-3/4 z-50">
      <h1 className="text-xl font-bold text-white">Rohan Sheikh</h1>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 font-semibold text-sm lg:text-base">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} className={`transition ${link.hoverClass}`}>
            {link.label}
          </a>
        ))}
        <CVButton variant="nav" />
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-white p-2 rounded-md hover:bg-white/5 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 60 }}
            className="absolute top-16 right-4 w-[85%] max-w-xs bg-black/95 text-white rounded-xl shadow-2xl p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4 text-lg">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`transition ${link.hoverClass}`}
                >
                  {link.label}
                </a>
              ))}
              <CVButton variant="mobile" onClick={() => setIsOpen(false)} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
