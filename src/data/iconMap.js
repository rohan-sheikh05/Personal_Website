// src/data/iconMap.js
//
// Firestore can only store plain data, not React components. So skill cards
// (and anything else with a picker icon) store an icon NAME as a string,
// e.g. "Code" or "Cpu", and we look it up here at render time.
//
// To add a new icon option: import it from lucide-react below and add it
// to the map. It will automatically show up in the admin panel's icon picker.

import {
  Code,
  Cpu,
  Database,
  BookOpen,
  Microscope,
  Palette,
  Film,
  Briefcase,
  Users,
  Award,
  Rocket,
  Wrench,
  FlaskConical,
  PenTool,
  Globe,
} from "lucide-react";

const iconMap = {
  Code,
  Cpu,
  Database,
  BookOpen,
  Microscope,
  Palette,
  Film,
  Briefcase,
  Users,
  Award,
  Rocket,
  Wrench,
  FlaskConical,
  PenTool,
  Globe,
};

export default iconMap;
export const iconNames = Object.keys(iconMap);
