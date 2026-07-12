// src/components/ClubAffiliations.jsx
//
// LinkedIn "experience" style: one card per ORGANIZATION (with its logo),
// and if you've held multiple roles at that same organization over time
// (e.g. Member -> Executive -> Manager -> Director), those positions are
// nested inside that one card as a mini sub-timeline, most recent first -
// exactly like LinkedIn groups multiple positions under one company.
//
// Data shape (Firestore collection "clubRoles", one doc per organization):
// {
//   organization: "RoboTronics",
//   logoUrl: "https://...",       (optional)
//   order: 0,                      (lower = shown first / most recent org)
//   positions: [
//     { id, role: "Director", startDate: "2026", endDate: "", description: "..." },
//     { id, role: "Manager", startDate: "2025", endDate: "2026", description: "..." },
//     ...positions[0] should be the most recent position, same convention
//     as "order" elsewhere on this site.
//   ]
// }
//
// If you haven't added any organizations yet, this section simply doesn't
// render rather than showing an empty gap on the live site.

import React from "react";
import { Users } from "lucide-react";
import useCollection from "../hooks/useCollection";
import { fallbackClubRoles } from "../data/fallbackData";

function formatRange(startDate, endDate) {
  const end = endDate && endDate.trim() ? endDate : "Present";
  return `${startDate} – ${end}`;
}

export default function ClubAffiliations() {
  const { data: organizations } = useCollection("clubRoles", fallbackClubRoles);

  if (!organizations || organizations.length === 0) return null;

  return (
    <section id="club" className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-12 border-l-4 border-teal-400 pl-4">Club Affiliations</h2>

      <div className="space-y-8">
        {organizations.map((org) => {
          const positions = org.positions || [];
          const hasMultiple = positions.length > 1;

          return (
            <div key={org.id} className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-teal-500/20 transition">
              {/* Organization header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gray-900 border-2 border-teal-400 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {org.logoUrl ? (
                    <img src={org.logoUrl} alt={org.organization} className="w-full h-full object-cover" loading="lazy" />
                  ) : (
                    <Users size={22} className="text-teal-300" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl font-bold text-white truncate">{org.organization}</h3>
                  {!hasMultiple && positions[0] && (
                    <>
                      <p className="text-teal-300 font-medium">{positions[0].role}</p>
                      <p className="text-sm text-gray-400">{formatRange(positions[0].startDate, positions[0].endDate)}</p>
                    </>
                  )}
                  {hasMultiple && (
                    <p className="text-sm text-gray-400">
                      {positions.length} roles · {formatRange(positions[positions.length - 1].startDate, positions[0].endDate)}
                    </p>
                  )}
                </div>
              </div>

              {/* Single position: just show the description under the header */}
              {!hasMultiple && positions[0]?.description && (
                <p className="text-gray-300 mt-4">{positions[0].description}</p>
              )}

              {/* Multiple positions at this org: nested sub-timeline, most recent first */}
              {hasMultiple && (
                <div className="relative mt-6 pl-8 ml-7">
                  <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-700" aria-hidden="true" />
                  <div className="space-y-6">
                    {positions.map((pos) => (
                      <div key={pos.id} className="relative">
                        <div className="absolute -left-8 top-1.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-gray-800" aria-hidden="true" />
                        <h4 className="font-semibold text-teal-300">{pos.role}</h4>
                        <p className="text-sm text-gray-400">{formatRange(pos.startDate, pos.endDate)}</p>
                        {pos.description && <p className="text-gray-300 mt-1">{pos.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
