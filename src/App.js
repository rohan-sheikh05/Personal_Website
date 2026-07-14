// src/App.js
//
// Was 846 lines of hardcoded markup in one function. Now it's routing +
// composition: "/" renders the public site as a sequence of components,
// "/admin" renders the protected admin panel. Each section owns its own
// data-fetching (via useCollection), so this file's only job is layout.

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Certificates from "./components/Certificates";
import ClubAffiliations from "./components/ClubAffiliations";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminRoute from "./admin/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";

function MainSite() {
  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen font-sans relative">
      <Background />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Achievements />
      <Certificates />
      <ClubAffiliations />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainSite />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
