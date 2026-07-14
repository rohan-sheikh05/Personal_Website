// src/data/fallbackData.js
//
// This is your CURRENT site content, transcribed from the old App.js.
// It serves two jobs:
//   1. Fallback: if Firestore is empty/unreachable, the site renders this
//      instead of a blank section, so nothing ever looks broken.
//   2. Seed source: scripts/seedFirestore.js uploads this exact data into
//      Firestore once, so you don't have to retype everything by hand in
//      the admin panel.
//
// A few obvious typos from the original copy were fixed here (Ledership ->
// Leadership, Perticipation -> Participation, Bussiness -> Business,
// scrach -> scratch, Breadborad -> Breadboard, Expence -> Expense).

export const fallbackAbout = [
  {
    heading: null,
    text: "Assalamualaikum! I'm Rohan, an undergraduate student in the Department of Materials and Metallurgical Engineering at the Bangladesh University of Engineering and Technology (BUET). My academic interests lie at the intersection of advanced materials, biomaterials, and sustainable engineering, with a long-term goal of translating research into practical technologies that improve lives.",
  },
  {
    heading: "Where Materials Meet Innovation",
    text: "Beyond materials science, I enjoy exploring emerging technologies such as artificial intelligence, robotics, and the Internet of Things (IoT). I believe that meaningful innovation happens when different disciplines come together, and I am constantly looking for opportunities to combine engineering, technology, and research to solve real-world problems.",
  },
  {
    heading: "Beyond the Classroom",
    text: "Alongside academics, I actively engage in leadership, entrepreneurship, and collaborative projects. Over the years, I have served in several student organizations, coordinated university events, represented my department as a class representative, and participated in business case competitions, research presentations, and national robotics competitions. These experiences have strengthened my communication, teamwork, and problem-solving skills while exposing me to diverse perspectives beyond the classroom.",
  },
  {
    heading: "Building Ideas Into Reality",
    text: "I am also passionate about building ideas into reality. From founding Spark Lifestyle, an e-commerce venture, to co-founding RoboTronics and contributing to research and innovation initiatives, I enjoy creating solutions that blend technology with practical impact. Whether working on engineering projects, startup ideas, or interdisciplinary collaborations, I am motivated by the challenge of turning concepts into meaningful outcomes.",
  },
  {
    heading: "Sharing the Journey",
    text: "Outside of academics and projects, I enjoy sharing my learning journey through content creation, writing, and community engagement. I believe that knowledge becomes more valuable when it is shared, and I hope to inspire others by documenting my experiences in engineering, research, innovation, and entrepreneurship. As I continue to grow, my aspiration is to bridge the worlds of science, technology, and business to develop solutions that create lasting value for society.",
  },
];

export const fallbackHeroImages = [
  "pic1.jpg",
  "pic2.jpeg",
  "pic19.jpg",
  "pic3.jpeg",
  "pic4.jpeg",
  "pic5.jpeg",
  "pic6.jpeg",
  "pic7.jpeg",
  "pic8.jpeg",
  "pic9.jpeg",
  "pic10.jpeg",
  "pic11.jpeg",
  "pic12.jpeg",
  "pic13.jpeg",
  "pic14.jpeg",
  "pic15.jpeg",
  "pic16.jpeg",
  "pic17.jpeg",
  "pic18.jpeg",
].map((file, i) => ({
  id: `fallback-hero-${i}`,
  url: `${process.env.PUBLIC_URL}/${file}`,
  alt: `Rohan Sheikh - photo ${i + 1}`,
  description: "",
  order: i,
}));

export const fallbackSkills = [
  {
    id: "fallback-skill-0",
    title: "Programming & Software Development",
    icon: "Code",
    color: "#60a5fa",
    items: ["C", "C++", "Python", "HTML", "CSS", "JavaScript", "React", "Git"],
    order: 0,
  },
  {
    id: "fallback-skill-1",
    title: "Robotics & Embedded Systems",
    icon: "Cpu",
    color: "#9b53e2",
    items: ["Micro Controllers", "Sensors", "Actuators", "Electronics", "Automation", "IoT Prototyping"],
    order: 1,
  },
  {
    id: "fallback-skill-2",
    title: "Microsoft Office",
    icon: "Database",
    color: "#4ade80",
    items: [],
    order: 2,
  },
  {
    id: "fallback-skill-3",
    title: "Research & Technical Writing",
    icon: "BookOpen",
    color: "#fad960",
    items: ["Academic Writing", "Literature Review", "Scientific Presentations", "3MT", "Reference Management"],
    order: 3,
  },
  {
    id: "fallback-skill-4",
    title: "Materials Engineering",
    icon: "Microscope",
    color: "#f43487",
    items: ["Metallography", "Materials Characterization", "Biomaterials"],
    order: 4,
  },
  {
    id: "fallback-skill-5",
    title: "Design & Content Creation",
    icon: "Palette",
    color: "#42749b",
    items: ["Adobe Illustrator", "Canva", "Video Editing", "Brand Identity", "Presentation Design"],
    order: 5,
  },
  {
    id: "fallback-skill-6",
    title: "CAD & PCB Design",
    icon: "Film",
    color: "#f87171",
    items: [],
    order: 6,
  },
  {
    id: "fallback-skill-7",
    title: "Entrepreneurship",
    icon: "Briefcase",
    color: "#ff8120",
    items: ["Business Development", "Startup Ideation", "Case Analysis", "Pitch Decks", "Market Validation"],
    order: 7,
  },
  {
    id: "fallback-skill-8",
    title: "Leadership",
    icon: "Users",
    color: "#28eee8",
    items: ["Event Coordination", "Team Management", "Public Speaking", "Project Planning", "Community Building"],
    order: 8,
  },
];

export const fallbackAchievements = [
  {
    id: "fallback-ach-0",
    title: "National Recognition",
    points: ["3rd Place – Robolution 2025", "2nd Place – DRMC Science Festival", "Multiple national robotics competitions"],
    order: 0,
  },
  {
    id: "fallback-ach-1",
    title: "Research",
    points: ["Literature Review on Biomaterials", "IEEE CUET & IEOM BUET 3MT", "Research Symposium Presenter", "Research Team Member"],
    order: 1,
  },
  {
    id: "fallback-ach-2",
    title: "Entrepreneurship",
    points: ["Founder – Spark Lifestyle", "Co-founder – RoboTronics", "Founder – RAN Academy", "Startup & Ideation Competitions"],
    order: 2,
  },
  {
    id: "fallback-ach-3",
    title: "Leadership",
    points: ["Executive Member of multiple BUET clubs", "Event Coordinator – TEDx BUET", "Department CR & TR", "Organizer of departmental festivals"],
    order: 3,
  },
  {
    id: "fallback-ach-4",
    title: "Competitive Excellence",
    points: ["Business Case Competitions", "Hult Prize", "CADQuest", "Engineering Challenges"],
    order: 4,
  },
  {
    id: "fallback-ach-5",
    title: "Professional Development",
    points: ["Campus Ambassador (5 organizations)", "International Conferences", "Mock Interview with CEO @NextJobz", "Volunteer across university initiatives"],
    order: 5,
  },
];

export const fallbackCertificates = [
  { file: "cert1.png", title: "Intra-BUET Robo Challenge (LFR segment)", category: "Robotics", issuer: "BUET Robotics Society", year: "2025" },
  { file: "cert2.png", title: "CADQUEST 3.0 by BUET Automobile Club", category: "Engineering", issuer: "BUET Automobile Club", year: "2025" },
  { file: "cert3.png", title: "Faith and Fitness Run 5KM Marathon", category: "Other", issuer: "Faith and Fitness", year: "2025" },
  { file: "cert4.jpg", title: "SciBlitz 1.0 by IEEE CUET Student Branch", category: "Research", issuer: "IEEE CUET Student Branch", year: "2025" },
  { file: "cert5.png", title: "CAPITELIZER '25 by BUP Business Society", category: "Entrepreneurship", issuer: "BUP Business Society", year: "2025" },
  { file: "cert6.jpg", title: "ROBO Carnival 2026 by BUET Robotics Society", category: "Robotics", issuer: "BUET Robotics Society", year: "2026" },
  { file: "cert7.jpeg", title: "MIST Robolution 2025 - Participation", category: "Robotics", issuer: "MIST", year: "2025" },
  { file: "cert8.jpg", title: "MIST Robolution 2025 - 2nd Runners Up", category: "Awards", issuer: "MIST", year: "2025" },
  { file: "cert9.jpg", title: "Vitalizers 3.0 by BRAC BEF - Semifinalist", category: "Entrepreneurship", issuer: "BRAC BEF", year: "2025" },
  { file: "cert10.jpg", title: "TEDxBUET 2025 - Event Co-ordinator", category: "Leadership", issuer: "TEDxBUET", year: "2025" },
  { file: "cert11.jpg", title: "BEAR Summit 2025", category: "Research", issuer: "BEAR Summit", year: "2025" },
  { file: "cert12.jpg", title: "CaseSpecs 3.0 by KUET Spectrum", category: "Entrepreneurship", issuer: "KUET Spectrum", year: "2025" },
].map((c, i) => ({
  id: `fallback-cert-${i}`,
  url: `${process.env.PUBLIC_URL}/certificates/${c.file}`,
  title: c.title,
  category: c.category,
  issuer: c.issuer,
  year: c.year,
  credentialUrl: "",
  order: i,
}));

export const fallbackProjects = [
  {
    id: "fallback-proj-0",
    title: "Line Following Robot",
    description:
      "Arduino Nano, IR sensor array, N20 motors, L298N motor driver, buck & boost module, programmable switch, display, ultrasonic sensor – built and competed in multiple robotics challenges.",
    techStack: ["Arduino", "Embedded C", "Sensors"],
    link: "",
    order: 0,
  },
  {
    id: "fallback-proj-1",
    title: "Ammeter & Voltmeter",
    description:
      "Breadboard, Arduino Nano, jumper wires, resistors, potentiometer, display - built an ammeter & voltmeter from scratch based on core theory.",
    techStack: ["Arduino", "Circuit Design"],
    link: "",
    order: 1,
  },
  {
    id: "fallback-proj-2",
    title: "Emergency Delivery Drone",
    description:
      "Ongoing project. The goal is to make a modern, intelligent drone that can deliver emergency services in case of rescue, disaster, and in areas difficult to reach.",
    techStack: ["Drone Systems", "Automation"],
    link: "",
    order: 2,
  },
  {
    id: "fallback-proj-3",
    title: "Bluetooth Car",
    description:
      "Arduino Nano, Bluetooth module, N20 motors - built a Bluetooth car that is completely controllable wirelessly from any smartphone.",
    techStack: ["Arduino", "Bluetooth", "Embedded C"],
    link: "",
    order: 3,
  },
  {
    id: "fallback-proj-4",
    title: "PennyFlow – Daily Expense Tracking App",
    description:
      "Built this personal expense tracking application to manage finances more effectively, with real-time balance updates and category-based spending visualization in a responsive UI.",
    techStack: ["React", "Firebase", "Capacitor"],
    link: "",
    order: 4,
  },
  {
    id: "fallback-proj-5",
    title: "MME Academic Archive Website",
    description:
      "Developed this centralized academic portal to streamline resource sharing within the MME department - curated question banks, class notes, and learning materials for all eight terms into a clean, searchable archive.",
    techStack: ["JavaScript", "HTML", "CSS"],
    link: "",
    order: 5,
  },
  {
    id: "fallback-proj-6",
    title: "2D Game Development",
    description: "Ongoing project. Working to build a 2D action game.",
    techStack: ["Python", "Pygame"],
    link: "",
    order: 6,
  },
];

// No fallback club data yet — Rohan adds these himself via the admin panel
// (or the seed script, if he provides the role history up front).
// One entry per ORGANIZATION. If you've held multiple roles at the same
// club over time (Member -> Executive -> Director, etc.), list them all
// inside that organization's `positions` array, most recent first (index 0)
// — the site renders them as a connected timeline under one logo, the same
// way LinkedIn groups multiple positions under one company. Left empty here;
// add your real ones through the admin panel at /admin.
export const fallbackClubRoles = [];
