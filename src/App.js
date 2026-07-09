// src/App.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  Mail,
  GraduationCap,
  Linkedin,
  BookOpen,
  Microscope,
  Palette,
  Film,
  Briefcase,
  Users,
  Globe,
  Facebook,
  Phone,
  MapPin,
  Cpu,
  Database,
  Code,
  Settings,
} from "lucide-react";

import react from "react";
import Slider from "react-slick";

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/40 backdrop-blur-lg px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between w-[90%] md:w-2/3 z-50">
      {/* Logo */}
      <h1 className="text-xl font-bold text-white">Rohan Sheikh</h1>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 font-semibold">
        <a href="#about" className="hover:text-indigo-400 transition">
          About
        </a>
        <a href="#skills" className="hover:text-purple-400 transition">
          Skills
        </a>
        <a href="#achievements" className="hover:text-amber-400 transition">
          Achievements
        </a>
        <a href="#certificates" className="hover:text-green-400 transition">
          Certificates
        </a>
        <a href="#projects" className="hover:text-yellow-400 transition">
          Projects
        </a>
        <a href="#contact" className="hover:text-blue-400 transition">
          Contact
        </a>
      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden text-white p-2 rounded-md hover:bg-white/5 transition"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Slide-in (AnimatePresence handles enter/exit) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 60 }}
            className="absolute top-16 right-4 w-[85%] max-w-xs bg-black/95 text-white rounded-xl shadow-2xl p-6 md:hidden"
          >
            <nav className="flex flex-col gap-4 text-lg">
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-400 transition"
              >
                About
              </a>
              <a
                href="#skills"
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-400 transition"
              >
                Skills
              </a>
              <a
                href="#achievements"
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-400 transition"
              >
                Achievements
              </a>
              <a
                href="#certificates"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-400 transition"
              >
                Certificates
              </a>
              <a
                href="#projects"
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-400 transition"
              >
                Projects
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="hover:text-purple-400 transition"
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function App() {
  {
    /* //Slider settings */
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // 3 seconds
  };

  {
    /* // Images (make sure these are in public/) */
  }
  const images = [
    `${process.env.PUBLIC_URL}/pic1.jpg`,
    `${process.env.PUBLIC_URL}/pic2.jpeg`,
    `${process.env.PUBLIC_URL}/pic19.jpg`,
    `${process.env.PUBLIC_URL}/pic3.jpeg`,
    `${process.env.PUBLIC_URL}/pic4.jpeg`,
    `${process.env.PUBLIC_URL}/pic5.jpeg`,
    `${process.env.PUBLIC_URL}/pic6.jpeg`,
    `${process.env.PUBLIC_URL}/pic7.jpeg`,
    `${process.env.PUBLIC_URL}/pic8.jpeg`,
    `${process.env.PUBLIC_URL}/pic9.jpeg`,
    `${process.env.PUBLIC_URL}/pic10.jpeg`,
    `${process.env.PUBLIC_URL}/pic11.jpeg`,
    `${process.env.PUBLIC_URL}/pic12.jpeg`,
    `${process.env.PUBLIC_URL}/pic13.jpeg`,
    `${process.env.PUBLIC_URL}/pic14.jpeg`,
    `${process.env.PUBLIC_URL}/pic15.jpeg`,
    `${process.env.PUBLIC_URL}/pic16.jpeg`,
    `${process.env.PUBLIC_URL}/pic17.jpeg`,
    `${process.env.PUBLIC_URL}/pic18.jpeg`,
    
  ];

  const certificates = [
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert1.png`,
      title: "Intra-BUET Robo Challenge(LFR segment)"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert2.png`,
      title: "CADQUEST 3.0 by BUET Automoblie Club"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert3.png`,
      title: "Faith and Fitness Run 5KM Marathon"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert4.jpg`,
      title: "SciBlitz 1.0 by IEEE CUET Student Branch"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert5.png`,
      title: "CAPITELIZER '25 By BUP Bussiness Society"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert6.jpg`,
      title: "ROBO Carnival 2026 by BUET Robotics Society"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert7.jpeg`,
      title: "MIST Robolution 2025 - Perticipation"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert8.jpg`,
      title: "MIST Robolution 2025 - 2nd Runners UP"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert9.jpg`,
      title: "Vitalizers 3.0 by BRAC BEF - Semifinalist"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert10.jpg`,
      title: "TEDXBUET 2025 - Event Co-ordinator"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert11.jpg`,
      title: "BEAR Summit 2025"
    },
    {
      src: `${process.env.PUBLIC_URL}/certificates/cert12.jpg`,
      title: "CaseSpecs 3.0 by KUET Spectrum"
    },
  ];


  {
    /* // Inline styles */
  }
  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    padding: "50px 20px",
    color: "white",
  };

  const sliderImgStyle = {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const textStyle = {
    maxWidth: "1000px",
    textAlign: "left",
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen font-sans">
      {/* ------------------ BACKGROUND SHAPES ------------------ */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "loop" }}
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30 top-10 left-10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "loop" }}
          className="absolute w-72 h-72 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full opacity-20 top-1/2 right-10 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "loop" }}
          className="absolute w-80 h-80 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 bottom-10 left-1/3 blur-2xl"
        />
      </div>
      <Navbar />

      {/* ------------------ FLOATING CURVED NAVBAR ------------------ */}
      {/* <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50 backdrop-blur-md bg-black/30 shadow-lg rounded-2xl p-4 transition-all hover:shadow-2xl hover:-translate-y-1">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Rohan Sheikh
          </h1>
          <div className="flex gap-6 text-lg font-medium">
            <a href="#about" className="hover:text-blue-400 transition">
              About
            </a>
            <a href="#skills" className="hover:text-purple-400 transition">
              Skills
            </a>
            <a href="#achievements" className="hover:text-pink-400 transition">
              Achievements
            </a>
            <a href="#projects" className="hover:text-yellow-400 transition">
              Projects
            </a>
            <a href="#contact" className="hover:text-blue-400 transition">
              Contact
            </a>
          </div>
        </div>
      </nav> */}

      {/* ------------------ HERO SECTION ------------------ */}
      <section className="h-screen flex flex-col md:flex-row justify-center items-center text-center md:text-left px-6 gap-10 relative">
        {/* ----------------- HERO IMAGE ----------------- */}
        <div className="md:w-1/3 flex justify-center md:justify-end">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 shadow-2xl">
            <img
              src="/Profile.jpg" // <-- Your uploaded image
              alt="Rohan Sheikh"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ----------------- HERO TEXT ----------------- */}
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
            Exploring innovative technologies, AI, entrepreneurship, and
            research in advanced materials.
          </motion.p>
        </div>
      </section>

      {/* ------------------ ABOUT SECTION ------------------ */}
      <div className="min-h-screen font-sans">
        {/* ------------------ ABOUT SECTION ------------------ */}
        <section id="about" style={sectionStyle}>
          <div style={textStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "30px",
                  backgroundColor: "#4F46E5",
                }}
              ></div>
              <h2 style={{ fontSize: "2.2rem" }}>
                <b>About Me</b>
              </h2>
            </div>

            <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
              <p>
                Assalamualaikum! I'm Rohan, an undergraduate student in the Department of Materials and Metallurgical Engineering at the Bangladesh University of Engineering and Technology (BUET). My academic interests lie at the intersection of advanced materials, biomaterials, and sustainable engineering, with a long-term goal of translating research into practical technologies that improve lives.
              </p>

              <p>
                Beyond materials science, I enjoy exploring emerging technologies such as artificial intelligence, robotics, and the Internet of Things (IoT). I believe that meaningful innovation happens when different disciplines come together, and I am constantly looking for opportunities to combine engineering, technology, and research to solve real-world problems.
              </p>

              <p>
                Alongside academics, I actively engage in leadership, entrepreneurship, and collaborative projects. Over the years, I have served in several student organizations, coordinated university events, represented my department as a class representative, and participated in business case competitions, research presentations, and national robotics competitions. These experiences have strengthened my communication, teamwork, and problem-solving skills while exposing me to diverse perspectives beyond the classroom.
              </p>

              <p>
                I am also passionate about building ideas into reality. From founding Spark Lifestyle, an e-commerce venture, to co-founding RoboTronics and contributing to research and innovation initiatives, I enjoy creating solutions that blend technology with practical impact. Whether working on engineering projects, startup ideas, or interdisciplinary collaborations, I am motivated by the challenge of turning concepts into meaningful outcomes.
              </p>

              <p>
                Outside of academics and projects, I enjoy sharing my learning journey through content creation, writing, and community engagement. I believe that knowledge becomes more valuable when it is shared, and I hope to inspire others by documenting my experiences in engineering, research, innovation, and entrepreneurship. As I continue to grow, my aspiration is to bridge the worlds of science, technology, and business to develop solutions that create lasting value for society.
              </p>
            </p>
          </div>

          <div style={{ width: "100%", maxWidth: "700px" }}>
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`slide-${index}`}
                    style={sliderImgStyle}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>
        {/* ------------------ OTHER SECTIONS ------------------ */}
      </div>

      {/* ------------------ SKILLS SECTION ------------------ */}
      <section id="skills" className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 border-l-4 border-purple-500 pl-4">
          Skills
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Technical Skills */}
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <Code size={32} className="text-blue-400" />
            <span><p style={{
              color: "#60a5fa",
              fontSize: "20px",
            }}>Programming & Software Development</p>

              C,
              C++,
              Python,
              HTML,
              CSS,
              JavaScript,
              React,
              Git</span>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <Cpu size={32} className="text-purple-400" />
            <span><p style={{
              color: "#9b53e2",
              fontSize: "20px",
            }}>Robotics & Embedded Systems</p>
              Micro Controllers,
              Sensors,
              Actuators,
              Electronics,
              Automation,
              IoT Prototyping
            </span>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-green-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <Database size={32} className="text-green-400" />
            <span>Microsoft Office</span>
          </div>

          {/* Research & Engineering */}
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <BookOpen size={32} className="text-yellow-400" />
            <span><p style={{
              color: "#fad960",
              fontSize: "20px",
            }}>Research & Technical Writing</p>
              Academic Writing,
              Literature Review,
              Scientific Presentations,
              3MT,
              Reference Management
            </span>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <Microscope size={32} className="text-pink-400" />
            <span><p style={{
              color: "#f43487",
              fontSize: "20px",
            }}>Materials Engineering</p>
              Metallography,
              Materials Characterization,
              Biomaterials
            </span>
          </div>

          {/* Creative & Business */}
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-indigo-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <Palette size={32} className="text-indigo-400" />
            <span><p style={{
              color: "#42749b",
              fontSize: "20px",
            }}>Design & Content Creation</p>
              Adobe Illustrator,
              Canva,
              Video Editing,
              Brand Identity,
              Presentation Design
            </span>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-red-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <Film size={32} className="text-red-400" />
            <span><p>CAD and PCB Design</p></span>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <Briefcase size={32} className="text-orange-400" />
            <span><p style={{
              color: "#ff8120",
              fontSize: "20px",
            }}>Entrepreneurship</p>
              Business Development,
              Startup Ideation,
              Case Analysis,
              Pitch Decks,
              Market Validation
            </span>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-teal-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <Users size={32} className="text-teal-400" />
            <span><p style={{
              color: "#28eee8",
              fontSize: "20px",
            }}>Leadership</p>
              Event Coordination,
              Team Management,
              Public Speaking,
              Project Planning,
              Community Building
            </span>
          </div>
        </div>
      </section>

      {/* ------------------ ACHIEVEMENTS ------------------ */}
      <section id="achievements" className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 border-l-4 border-amber-500 pl-4">
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card */}
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              National Recognition
            </h3>
            <p className="text-gray-300">
              • 3rd Place – Robolution 2025<br />
              • 2nd Place – DRMC Science Festival<br />
              • Multiple national robotics competitions
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              Research
            </h3>
            <p className="text-gray-300">
              • Literature Review on Biomaterials <br />
              • IEEE CUET & IEOM BUET 3MT<br />
              • Research Symposium Presenter<br />
              • Research Team Member<br />
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              Entrepreneurship
            </h3>
            <p className="text-gray-300">
              • Founder – Spark Lifestyle<br />
              • Co-founder – RoboTronics<br />
              • Founder – RAN Academy<br />
              • Startup & Ideation Competitions
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              Ledership
            </h3>
            <p className="text-gray-300">
              • Executive Member of multiple BUET clubs<br />
              • Event Coordinator – TEDx BUET<br />
              • Department CR & TR<br />
              • Organizer of departmental festivals<br />
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              Competitive Excellence
            </h3>
            <p className="text-gray-300">
              • Business Case Competitions<br />
              • Hult Prize<br />
              • CADQuest<br />
              • Engineering Challenges
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">
              Professional Development
            </h3>
            <p className="text-gray-300">
              • Campus Ambassador (5 organizations)<br />
              • International Conferences<br />
              • Mock Interview with CEO @NextJobz<br />
              • Volunteer across university initiatives
            </p>
          </div>
        </div>
      </section>
      {/* ----------------CERTIFICATES------------------*/}
      <section id="certificates" className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 border-l-4 border-green-500 pl-4">
          Certificates
        </h2>
        <div className="slider-container" style={{ width: "80%", margin: "0 auto" }}>
          <Slider {...settings}>
            {certificates.map((cert, index) => (
              <div key={index} style={{ position: "relative", padding: "10px", textAlign: "center" }}>
                {/* Image Container */}
                <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
                  <img
                    src={cert.src}
                    alt={cert.title}
                    style={{ width: "100%", maxHeight: "500px", objectFit: "contain", borderRadius: "8px" }}
                  />
                  {/* Overlay Title in the Upper-Left Corner */}
                  <div style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    color: "#ffffff",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    pointerEvents: "none",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
                    maxWidth: "80%",
                    textAlign: "left"
                  }}>
                    {cert.title}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* ------------------ PROJECTS ------------------ */}
      <section id="projects" className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 border-l-4 border-yellow-500 pl-4">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Card */}
          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">
              Line Following Robot
            </h3>
            <p className="text-gray-300">
              Arduino nano, IR sensor array, n20 motors, L298N motor driver, Buck & Boost Module, Programable Switch, Display, Ultrasonic sensor – built and competed
              in multiple robotics challenge.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">
              Ammeter & Voltmeter
            </h3>
            <p className="text-gray-300">
              Breadborad, Arduino Nano, Jumper wires, resistors, potentiometer, display - made a ammeter & voltemeter from scrach based on core theory.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">
              Emergency delivery Drone
            </h3>
            <p className="text-gray-300">
              On going project, The goal is to make a modern, intelligent drone that can deliver emergency services in case of rescue, disaster, and in areas difficult to reach.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">
              Bluetooth Car
            </h3>
            <p className="text-gray-300">
              Arduino Nano, Bluetooth module, N20 motors - Made a Bluetooth car which is completely controllable wirelessly from any smartphone.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">
              PennyFlow-Daily Expence tracking App
            </h3>
            <p className="text-gray-300">
              I built this personal expense tracking application to manage my finances more effectively. I implemented real-time balance updates and category-based spending visualization, creating a responsive UI that makes it easy for me to monitor my daily cash flow.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">
              MME Academic Archive Website
            </h3>
            <p className="text-gray-300">
              I developed this centralized academic portal to streamline resource sharing within the MME department. I curated and organized question banks, class notes, and essential learning materials for all eight terms, creating a clean, searchable, and accessible archive to help my peers succeed academically.
            </p>
          </div>

          <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-yellow-500/30 transition transform hover:-translate-y-2 hover:scale-105">
            <h3 className="text-xl font-bold mb-2 text-yellow-400">
              2D Game Development
            </h3>
            <p className="text-gray-300">
              On going project, Working to build a 2D Action Game. 
            </p>
          </div>
        </div>
      </section>

      {/* ------------------ CONTACT ------------------ */}
      <section
        id="contact"
        className="px-6 py-20 max-w-5xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-10 border-l-4 border-blue-400 pl-4">
          Contact
        </h2>
        <p className="text-lg mb-8">
          Open to collaborations, research opportunities, or projects. Let’s
          connect!
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {/* Email */}
          <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
            <Mail size={28} className="text-orange-400 mb-2" />
            <span className="font-medium">Email</span>
            <a
              href="mailto:rohansheikh2005@gmail.com"
              className="text-blue-300 hover:underline mt-1"
            >
              rohansheikh2005@gmail.com
            </a>
          </div>
          {/* Linkedin */}
          <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
            <Linkedin size={28} className="text-blue-400 mb-2" />
            <span className="font-medium">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/rohan-sheikh/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-300 hover:underline mt-1"
            >
              Rohan Sheikh
            </a>
          </div>
          {/* Google Scholar */}
          <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
            <GraduationCap size={28} className="text-blue-400 mb-2" />
            <span className="font-medium">Google Scholar</span>
            <a
              href="https://scholar.google.com/citations?user=ctab0L4AAAAJ&hl=en"
              target="_blank"
              rel="noreferrer"
              className="text-blue-300 hover:underline mt-1"
            >
              Rohan Sheikh
            </a>
          </div>
          {/* ResearchGate */}
          <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
            <Globe size={28} className="text-white-500 mb-2" />
            <span className="font-medium">ResearchGate</span>
            <a
              href="https://www.researchgate.net/profile/Rohan-Sheikh?ev=hdr_xprf"
              target="_blank"
              rel="noreferrer"
              className="text-blue-300 hover:underline mt-1"
            >
              Rohan Sheikh
            </a>
          </div>

          {/* Facebook */}
          <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
            <svg
              className="w-7 h-7 text-blue-600 mb-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12a10 10 0 1 0-11 9.95V15h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.3 3h-2v6.95A10.02 10.02 0 0 0 22 12" />
            </svg>
            <span className="font-medium">Facebook</span>
            <a
              href="https://www.facebook.com/rohan.sheikh.9085"
              target="_blank"
              rel="noreferrer"
              className="text-blue-300 hover:underline mt-1"
            >
              Rohan Sheikh
            </a>
          </div>

          {/* Phone
          <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
            <svg
              className="w-7 h-7 text-green-400 mb-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.11-.27c1.21.48 2.53.74 3.88.74a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1A18 18 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.35.26 2.67.74 3.88a1 1 0 0 1-.27 1.11l-2.35 2.35z" />
            </svg>
            <span className="font-medium">Phone</span>
            <a
              href="tel:+8801725577949"
              className="text-green-300 hover:underline mt-1"
            >
              +880 1725577949
            </a>
          </div> */}

          {/* Address */}
          <div className="flex flex-col items-center bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition transform">
            <svg
              className="w-7 h-7 text-yellow-400 mb-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
            </svg>
            <span className="font-medium">Address</span>
            <p className="text-yellow-300 mt-1">
              Titumir Hall, BUET, Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </section>

      {/* ------------------ FOOTER ------------------ */}
      <footer className="text-center py-6 border-t border-gray-700 text-sm text-gray-400">
        © {new Date().getFullYear()} Rohan Sheikh. All rights reserved.
      </footer>
    </div>
  );
}
