// src/components/Projects.jsx
//
// Thumbnail now fades into the card's background via a gradient overlay
// instead of ending with a hard edge, plus a small "PROJECT 0N" badge
// floating over the image - reads as one cohesive surface instead of an
// image awkwardly glued on top of a text block.

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, Code2 } from "lucide-react";
import useCollection from "../hooks/useCollection";
import { fallbackProjects } from "../data/fallbackData";
import Card from "./ui/Card";
import Tag from "./ui/Tag";
import SectionHeader from "./ui/SectionHeader";

function ProjectCard({ title, description, techStack, link, thumbnailUrl, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
    >
      <Card className="h-full flex flex-col overflow-hidden !p-0" tilt>
        <div className="relative w-full h-44 overflow-hidden">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-slate-900/60 flex items-center justify-center">
              <FolderGit2 size={32} className="text-slate-600" />
            </div>
          )}
          {/* Gradient mesh so the image fades into the card instead of a hard cut */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/10 to-transparent" />

          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-950/70 border border-teal-500/30 text-teal-300 text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full backdrop-blur-sm">
            <Code2 size={12} /> Project {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1 -mt-4 relative">
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {techStack.map((tech, i) => (
                <Tag key={i} color="teal">{tech}</Tag>
              ))}
            </div>
          )}

          <p className="text-gray-300 text-sm flex-1">{description}</p>

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition text-sm font-medium mt-4"
            >
              View project <ExternalLink size={14} />
            </a>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const { data: projects } = useCollection("projects", fallbackProjects);

  return (
    <section id="projects" className="px-6 py-24 max-w-6xl mx-auto">
      <SectionHeader
        eyebrow="Featured Work"
        title="Projects"
        subtitle="A mix of robotics builds, software, and ongoing experiments."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} {...p} index={i} />
        ))}
      </div>
    </section>
  );
}
