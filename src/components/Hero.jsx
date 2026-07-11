// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left px-6 gap-10 relative">
      <div className="md:w-1/3 flex justify-center md:justify-end">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 shadow-2xl">
          <img src="/Profile.jpg" alt="Rohan Sheikh" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="md:w-2/3 flex flex-col justify-center items-center md:items-start">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
        >
          Materials Engineer | Entrepreneur | Researcher
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="mt-6 text-xl max-w-2xl mx-auto md:mx-0"
        >
          Exploring innovative technologies, AI, entrepreneurship, and research in advanced materials.
        </motion.p>
      </div>
    </section>
  );
}
