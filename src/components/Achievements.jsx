// src/components/Achievements.jsx
// Rebuilt on the shared Card/SectionHeader system (Phase 3).

import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import useCollection from "../hooks/useCollection";
import { fallbackAchievements } from "../data/fallbackData";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";

export default function Achievements() {
  const { data: achievements } = useCollection("achievements", fallbackAchievements);

  return (
    <section id="achievements" className="px-6 py-24 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Recognition"
        title="Achievements"
        subtitle="A snapshot of competitions, research milestones, and leadership roles."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((a, index) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
          >
            <Card className="h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                  <Trophy size={18} className="text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{a.title}</h3>
              </div>
              <ul className="text-gray-300 space-y-2">
                {a.points.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-teal-400 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
