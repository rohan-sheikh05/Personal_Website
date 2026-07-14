// src/components/Skills.jsx
//
// Rebuilt on the shared Card/Tag/SectionHeader system (Phase 3). Icon
// accent is now a single consistent teal across every card instead of a
// different hex color per category - the admin panel's "Accent color"
// field still exists (harmless to leave for now) but is no longer read
// here, on purpose, to keep the palette restrained.

import React from "react";
import { motion } from "framer-motion";
import useCollection from "../hooks/useCollection";
import { fallbackSkills } from "../data/fallbackData";
import iconMap from "../data/iconMap";
import Card from "./ui/Card";
import Tag from "./ui/Tag";
import SectionHeader from "./ui/SectionHeader";

function SkillCard({ title, icon, items, index }) {
  const Icon = iconMap[icon] || iconMap.Code;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Card className="h-full">
        <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-4">
          <Icon size={22} className="text-teal-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
        {items.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {items.map((item, i) => (
              <Tag key={i}>{item}</Tag>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

export default function Skills() {
  const { data: skills } = useCollection("skills", fallbackSkills);

  return (
    <section id="skills" className="px-6 py-24 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="What I Work With"
        title="Skills"
        subtitle="Tools and areas I've built real experience in — from embedded systems to research writing."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {skills.map((skill, i) => (
          <SkillCard key={skill.id} {...skill} index={i} />
        ))}
      </div>
    </section>
  );
}
