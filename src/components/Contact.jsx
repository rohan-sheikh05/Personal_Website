// src/components/Contact.jsx
//
// Phase 4: rebuilt on Card/SectionHeader, single teal icon accent instead
// of a different color per platform. Still static/hardcoded on purpose -
// your email, socials, and address don't change often enough to justify
// a Firestore round-trip.

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, GraduationCap, Globe, Facebook, MapPin } from "lucide-react";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";

const CONTACTS = [
  { icon: Mail, label: "Email", value: "rohansheikh2005@gmail.com", href: "mailto:rohansheikh2005@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "Rohan Sheikh", href: "https://www.linkedin.com/in/rohan-sheikh/" },
  { icon: GraduationCap, label: "Google Scholar", value: "Rohan Sheikh", href: "https://scholar.google.com/citations?user=ctab0L4AAAAJ&hl=en" },
  { icon: Globe, label: "ResearchGate", value: "Rohan Sheikh", href: "https://www.researchgate.net/profile/Rohan-Sheikh?ev=hdr_xprf" },
  { icon: Facebook, label: "Facebook", value: "Rohan Sheikh", href: "https://www.facebook.com/rohan.sheikh.9085" },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 max-w-5xl mx-auto text-center">
      <SectionHeader
        align="center"
        eyebrow="Let's Talk"
        title="Contact"
        subtitle="Open to collaborations, research opportunities, or projects — let's connect."
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {CONTACTS.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
          >
            <Card className="flex flex-col items-center text-center h-full">
              <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-3">
                <c.icon size={20} className="text-teal-400" />
              </div>
              <span className="font-medium text-white">{c.label}</span>
              <a href={c.href} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-teal-400 transition mt-1 text-sm break-all">
                {c.value}
              </a>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="flex flex-col items-center text-center h-full">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-3">
              <MapPin size={20} className="text-teal-400" />
            </div>
            <span className="font-medium text-white">Address</span>
            <p className="text-gray-400 mt-1 text-sm">Titumir Hall, BUET, Dhaka, Bangladesh</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
