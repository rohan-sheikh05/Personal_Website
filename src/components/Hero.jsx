
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Mail, ArrowRight } from "lucide-react";
import { fallbackSkills, fallbackProjects } from "../data/fallbackData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" },
});

const PHOTO_MAX_TILT_DEG = 7;

function HeroPhoto() {
  const ref = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setRotate({
      x: (0.5 - py) * PHOTO_MAX_TILT_DEG * 2,
      y: (px - 0.5) * PHOTO_MAX_TILT_DEG * 2,
    });
  }
  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
    setHovering(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex justify-center"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-full md:h-auto md:aspect-square md:max-w-sm cursor-default overflow-hidden"
        style={{ perspective: 800 }}
      >
        <div
          className="absolute -inset-4 rounded-full bg-teal-500/30 blur-3xl transition-opacity duration-500"
          style={{ opacity: hovering ? 0.7 : 0.3 }}
        />
        <motion.div
          animate={{ rotateX: rotate.x, rotateY: rotate.y, scale: hovering ? 1.03 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl"
        >
          <img src="/Profile.jpg" alt="Rohan Sheikh" className="w-full h-full object-cover" />
        </motion.div>
        {/* Text addition: Oscillating animation and glowing effect */}
        <motion.div
          animate={{ y: [0, -10, 0] }} // Oscillates up 8px and back down
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-4 left-4 z-20 bg-slate-950/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]"
        >
          <p className="text-cyan-300 text-[0.7rem] font-mono drop-shadow-[0_0_8px_rgba(6,182,212,0.7)]">
            always_<br />tinkering();
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 pt-28 pb-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* Photo + social, grouped as one column so they stay attached together */}
        <div className="order-1 md:order-2 md:col-span-2 flex flex-col items-center gap-6">
          <HeroPhoto />
          <motion.div {...fadeUp(0.6)} className="flex items-center gap-5 bg-slate-800/60 border border-slate-700 rounded-full px-5 py-3 w-fit">
            <a href="https://github.com/rohan-sheikh05" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-400 transition hover:-translate-y-0.5" aria-label="GitHub">
              <Github size={20} />
            </a>
            <span className="w-px h-4 bg-slate-700" aria-hidden="true" />
            <a href="https://www.linkedin.com/in/rohan-sheikh/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-400 transition hover:-translate-y-0.5" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <span className="w-px h-4 bg-slate-700" aria-hidden="true" />
            <a href="https://www.facebook.com/rohansheikh05/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-400 transition hover:-translate-y-0.5" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <span className="w-px h-4 bg-slate-700" aria-hidden="true" />
            <a href="mailto:rohansheikh2005@gmail.com" className="text-slate-400 hover:text-teal-400 transition hover:-translate-y-0.5" aria-label="Email">
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        {/* Text content */}
        <div className="order-2 md:order-1 md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.p {...fadeUp(0)} className="text-gray-500 font-pixel text-5xl font-bold tracking-wide mb-2">
            Hi,
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-white text-5xl sm:text-6xl md:text-7xl font-semibold "
          >
            I'm <span className="font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 ">Rohan!</span>
          </motion.h1>

          <motion.h2 {...fadeUp(0.2)} className="mt-3 text-xl font-code sm:text-2xl font-semibold text-gray-200">
            Materials Engineer · Researcher · Entrepreneur
          </motion.h2>

          <motion.p {...fadeUp(0.3)} className="mt-5 text-lg text-gray-300 max-w-xl">
            Exploring innovative technologies, AI, entrepreneurship, and research in advanced
            materials — currently studying Materials and Metallurgical Engineering at BUET,
            Dhaka, Bangladesh.
          </motion.p>

          {/* Stat badges */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4 mt-8">
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-3 text-center transition duration-300 hover:-translate-y-1.5 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 cursor-default">
              <p className="text-2xl font-bold text-white">{fallbackProjects.length}+</p>
              <p className="text-xs text-gray-400 mt-0.5">Projects Built</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-3 text-center transition duration-300 hover:-translate-y-1.5 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 cursor-default">
              <p className="text-2xl font-bold text-white">{fallbackSkills.length}</p>
              <p className="text-xs text-gray-400 mt-0.5">Skill Areas</p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-5 py-3 text-center transition duration-300 hover:-translate-y-1.5 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10 cursor-default">
              <p className="text-2xl font-bold text-white">BUET</p>
              <p className="text-xs text-gray-400 mt-0.5">MME Sophomore</p>
            </div>
          </motion.div>

          {/* CTAs 
          <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-4 mt-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 transition duration-300 hover:-translate-y-1 px-6 py-3 rounded-full font-semibold text-slate-950"
            >
              View My Work <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition duration-300 hover:-translate-y-1 px-6 py-3 rounded-full font-semibold text-white border border-slate-700"
            >
              Get In Touch
            </a>
          </motion.div>*/}
        </div>
      </div>
    </section>
  );
}
