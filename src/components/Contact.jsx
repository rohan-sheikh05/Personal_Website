// src/components/Contact.jsx
//
// Kept static/hardcoded on purpose - your email, socials, and address
// don't change often enough to justify a Firestore round-trip. If that
// changes, this could be moved to the same pattern as everything else.

import React from "react";
import { Mail, Linkedin, GraduationCap, Globe } from "lucide-react";

const CONTACTS = [
  {
    icon: Mail,
    iconColor: "text-orange-400",
    label: "Email",
    value: "rohansheikh2005@gmail.com",
    href: "mailto:rohansheikh2005@gmail.com",
  },
  {
    icon: Linkedin,
    iconColor: "text-blue-400",
    label: "LinkedIn",
    value: "Rohan Sheikh",
    href: "https://www.linkedin.com/in/rohan-sheikh/",
  },
  {
    icon: GraduationCap,
    iconColor: "text-blue-400",
    label: "Google Scholar",
    value: "Rohan Sheikh",
    href: "https://scholar.google.com/citations?user=ctab0L4AAAAJ&hl=en",
  },
  {
    icon: Globe,
    iconColor: "text-gray-300",
    label: "ResearchGate",
    value: "Rohan Sheikh",
    href: "https://www.researchgate.net/profile/Rohan-Sheikh?ev=hdr_xprf",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-20 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-10 border-l-4 border-blue-400 pl-4">Contact</h2>
      <p className="text-lg mb-8">Open to collaborations, research opportunities, or projects. Let's connect!</p>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {CONTACTS.map((c) => (
          <div key={c.label} className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
            <c.icon size={28} className={`${c.iconColor} mb-2`} />
            <span className="font-medium">{c.label}</span>
            <a href={c.href} target="_blank" rel="noreferrer" className="text-blue-300 hover:underline mt-1">
              {c.value}
            </a>
          </div>
        ))}

        <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
          <svg className="w-7 h-7 text-blue-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12a10 10 0 1 0-11 9.95V15h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.3 3h-2v6.95A10.02 10.02 0 0 0 22 12" />
          </svg>
          <span className="font-medium">Facebook</span>
          <a href="https://www.facebook.com/rohan.sheikh.9085" target="_blank" rel="noreferrer" className="text-blue-300 hover:underline mt-1">
            Rohan Sheikh
          </a>
        </div>

        <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
          <svg className="w-7 h-7 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
          </svg>
          <span className="font-medium">Address</span>
          <p className="text-yellow-300 mt-1">Titumir Hall, BUET, Dhaka, Bangladesh</p>
        </div>
      </div>
    </section>
  );
}
