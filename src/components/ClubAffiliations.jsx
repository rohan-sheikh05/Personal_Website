// src/components/ClubAffiliations.jsx
//
// New section, LinkedIn "experience" style: a vertical timeline of club
// roles, each with an optional logo/photo, role title, organization,
// date range, and description. Order matters here (it's a real
// chronology), so entries are sorted by `order` - set the most recent
// role to order 0 in the admin panel, same convention LinkedIn uses
// (newest first).
//
// If you haven't added any roles yet, this section simply doesn't render
// rather than showing an empty gap on the live site.

import React from "react";
import { Users } from "lucide-react";
import useCollection from "../hooks/useCollection";
import { fallbackClubRoles } from "../data/fallbackData";

function formatRange(startDate, endDate) {
  const end = endDate && endDate.trim() ? endDate : "Present";
  return `${startDate} – ${end}`;
}

export default function ClubAffiliations() {
  const { data: roles } = useCollection("clubRoles", fallbackClubRoles);

  if (!roles || roles.length === 0) return null;

  return (
    <section id="club" className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 border-l-4 border-teal-400 pl-4">Club Affiliations</h2>

      <div className="relative pl-10">
        {/* vertical timeline line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-700" aria-hidden="true" />

        <div className="space-y-10">
          {roles.map((role) => (
            <div key={role.id} className="relative">
              {/* marker */}
              <div className="absolute -left-10 top-0 w-10 h-10 rounded-full bg-gray-800 border-2 border-teal-400 flex items-center justify-center overflow-hidden shadow-lg">
                {role.imageUrl ? (
                  <img src={role.imageUrl} alt={role.organization} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <Users size={18} className="text-teal-300" />
                )}
              </div>

              <div className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-teal-500/20 transition transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-teal-300">{role.role}</h3>
                <p className="text-gray-200 font-medium">{role.organization}</p>
                <p className="text-sm text-gray-400 mt-1">{formatRange(role.startDate, role.endDate)}</p>
                {role.description && <p className="text-gray-300 mt-3">{role.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
