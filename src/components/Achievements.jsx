// src/components/Achievements.jsx
import React from "react";
import useCollection from "../hooks/useCollection";
import { fallbackAchievements } from "../data/fallbackData";

export default function Achievements() {
  const { data: achievements } = useCollection("achievements", fallbackAchievements);

  return (
    <section id="achievements" className="px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 border-l-4 border-amber-500 pl-4">Achievements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((a) => (
          <div
            key={a.id}
            className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-2 hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-pink-400 mb-2">{a.title}</h3>
            <ul className="text-gray-300 space-y-1 list-none">
              {a.points.map((point, i) => (
                <li key={i}>• {point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
