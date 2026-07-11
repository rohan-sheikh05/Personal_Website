// src/components/Skills.jsx
//
// Was 9 nearly-identical hand-written <div> blocks in the old App.js.
// Now it's one card template driven by an array (Firestore, falling back
// to fallbackSkills) - adding a new skill category is a Firestore write
// from the admin panel, not a code change + redeploy.

import React from "react";
import useCollection from "../hooks/useCollection";
import { fallbackSkills } from "../data/fallbackData";
import iconMap from "../data/iconMap";

function SkillCard({ title, icon, color, items }) {
  const Icon = iconMap[icon] || iconMap.Code;
  return (
    <div className="p-6 bg-gray-800 rounded-2xl shadow-lg transition transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl">
      <Icon size={32} style={{ color }} />
      <p className="mt-2 text-lg font-semibold" style={{ color }}>
        {title}
      </p>
      {items.length > 0 && (
        <p className="text-gray-300 mt-1">{items.join(", ")}</p>
      )}
    </div>
  );
}

export default function Skills() {
  const { data: skills } = useCollection("skills", fallbackSkills);

  return (
    <section id="skills" className="px-6 py-20 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-10 border-l-4 border-purple-500 pl-4">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {skills.map((skill) => (
          <SkillCard key={skill.id} {...skill} />
        ))}
      </div>
    </section>
  );
}
