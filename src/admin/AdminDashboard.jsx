// src/admin/AdminDashboard.jsx
import React, { useState } from "react";
import { LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import CollectionEditor from "./CollectionEditor";
import ManageCV from "./ManageCV";
import adminConfig from "./adminConfig";

const NAV_ITEMS = [
  { key: "heroImages", label: adminConfig.heroImages.label },
  { key: "skills", label: adminConfig.skills.label },
  { key: "achievements", label: adminConfig.achievements.label },
  { key: "certificates", label: adminConfig.certificates.label },
  { key: "projects", label: adminConfig.projects.label },
  { key: "clubRoles", label: adminConfig.clubRoles.label },
  { key: "cv", label: "CV / Resume" },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [active, setActive] = useState("heroImages");

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="md:w-64 bg-gray-950 border-b md:border-b-0 md:border-r border-gray-800 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        <h1 className="hidden md:block text-lg font-bold text-white mb-4 px-2">Admin Panel</h1>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`text-left px-3 py-2 rounded-lg whitespace-nowrap transition ${
              active === item.key ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            {item.label}
          </button>
        ))}

        <div className="md:mt-auto flex md:flex-col gap-2 flex-shrink-0">
          <a
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition whitespace-nowrap"
          >
            <ExternalLink size={16} /> View site
          </a>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-300 hover:bg-red-900/50 transition whitespace-nowrap"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 md:p-10 max-w-4xl">
        {active === "cv" ? <ManageCV /> : <CollectionEditor config={adminConfig[active]} />}
      </main>
    </div>
  );
}
