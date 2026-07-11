// src/components/Projects.jsx
import React from "react";
import useCollection from "../hooks/useCollection";
import { fallbackProjects } from "../data/fallbackData";

export default function Projects() {
  const { data: projects } = useCollection("projects", fallbackProjects);

  return (
    <section id="projects" className="px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 border-l-4 border-yellow-500 pl-4">Projects</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p) => (
          <div
            key={p.id}
            className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2 text-yellow-400">{p.title}</h3>
            <p className="text-gray-300">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
