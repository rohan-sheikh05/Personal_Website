// src/admin/ManageClubAffiliations.jsx
//
// This one isn't driven by adminConfig.js like the other sections, because
// its data isn't a flat list - it's organizations, each holding an ordered
// list of positions (LinkedIn-style: multiple roles at the same club over
// time, grouped under one logo). That nesting needs its own add/edit/
// reorder flow, so this is a standalone component instead.
//
// Firestore shape: one doc per organization in the "clubRoles" collection.
// { organization, logoUrl, storagePath, order, positions: [{ id, role, startDate, endDate, description }] }
// positions[0] should always be the most recent role at that org.

import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Pencil, Trash2, Plus, X, Upload, ChevronUp, ChevronDown, ChevronRight, Users } from "lucide-react";
import { db } from "../firebase";
import { uploadFile } from "../utils/uploadImage";

const COLLECTION = "clubRoles";

function newPositionId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `pos-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const emptyOrgForm = { organization: "" };
const emptyPositionForm = { role: "", startDate: "", endDate: "", description: "" };

export default function ManageClubAffiliations() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({});

  // Org add/edit form state
  const [editingOrgId, setEditingOrgId] = useState(null); // null = closed, "new" = adding
  const [orgForm, setOrgForm] = useState(emptyOrgForm);
  const [logoFile, setLogoFile] = useState(null);
  const [savingOrg, setSavingOrg] = useState(false);

  // Position add/edit form state: { orgId, positionId | "new" }
  const [positionTarget, setPositionTarget] = useState(null);
  const [positionForm, setPositionForm] = useState(emptyPositionForm);
  const [savingPosition, setSavingPosition] = useState(false);

  useEffect(() => {
    const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setOrgs(snap.docs.map((d) => ({ id: d.id, ...d.data(), positions: d.data().positions || [] })));
        setLoading(false);
      },
      (err) => {
        setError(`Couldn't load Club Affiliations: ${err.message}`);
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  function toggleExpanded(orgId) {
    setExpanded((prev) => ({ ...prev, [orgId]: !prev[orgId] }));
  }

  // ---------- Organization CRUD ----------

  function startAddOrg() {
    setEditingOrgId("new");
    setOrgForm(emptyOrgForm);
    setLogoFile(null);
    setError("");
  }

  function startEditOrg(org) {
    setEditingOrgId(org.id);
    setOrgForm({ organization: org.organization || "" });
    setLogoFile(null);
    setError("");
  }

  function cancelOrgEdit() {
    setEditingOrgId(null);
    setLogoFile(null);
    setError("");
  }

  async function handleSaveOrg(e) {
    e.preventDefault();
    setSavingOrg(true);
    setError("");
    try {
      const payload = { organization: orgForm.organization.trim() };

      if (logoFile) {
        payload.logoUrl = await uploadFile(logoFile);
      }

      if (editingOrgId === "new") {
        payload.order = orgs.length;
        payload.positions = [];
        await addDoc(collection(db, COLLECTION), payload);
      } else {
        await updateDoc(doc(db, COLLECTION, editingOrgId), payload);
      }

      setEditingOrgId(null);
      setLogoFile(null);
    } catch (err) {
      setError(`Couldn't save organization: ${err.message}`);
    } finally {
      setSavingOrg(false);
    }
  }

  async function handleDeleteOrg(org) {
    if (
      !window.confirm(
        `Delete "${org.organization}" and all ${org.positions.length} position(s) under it? This can't be undone.`
      )
    )
      return;
    try {
      await deleteDoc(doc(db, COLLECTION, org.id));
    } catch (err) {
      setError(`Couldn't delete: ${err.message}`);
    }
  }

  async function moveOrg(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= orgs.length) return;
    const a = orgs[index];
    const b = orgs[target];
    try {
      await updateDoc(doc(db, COLLECTION, a.id), { order: b.order ?? target });
      await updateDoc(doc(db, COLLECTION, b.id), { order: a.order ?? index });
    } catch (err) {
      setError(`Couldn't reorder: ${err.message}`);
    }
  }

  // ---------- Position CRUD (nested inside an org doc) ----------

  function startAddPosition(org) {
    setPositionTarget({ orgId: org.id, positionId: "new" });
    setPositionForm(emptyPositionForm);
    setError("");
    setExpanded((prev) => ({ ...prev, [org.id]: true }));
  }

  function startEditPosition(org, position) {
    setPositionTarget({ orgId: org.id, positionId: position.id });
    setPositionForm({
      role: position.role || "",
      startDate: position.startDate || "",
      endDate: position.endDate || "",
      description: position.description || "",
    });
    setError("");
  }

  function cancelPositionEdit() {
    setPositionTarget(null);
    setError("");
  }

  async function handleSavePosition(e) {
    e.preventDefault();
    if (!positionTarget) return;
    setSavingPosition(true);
    setError("");
    try {
      const org = orgs.find((o) => o.id === positionTarget.orgId);
      if (!org) throw new Error("Organization not found");

      const cleanPosition = {
        role: positionForm.role.trim(),
        startDate: positionForm.startDate.trim(),
        endDate: positionForm.endDate.trim(),
        description: positionForm.description.trim(),
      };

      let nextPositions;
      if (positionTarget.positionId === "new") {
        // New positions go to the front (most recent), matching the
        // "positions[0] = most recent" convention used for display.
        nextPositions = [{ id: newPositionId(), ...cleanPosition }, ...org.positions];
      } else {
        nextPositions = org.positions.map((p) =>
          p.id === positionTarget.positionId ? { ...p, ...cleanPosition } : p
        );
      }

      await updateDoc(doc(db, COLLECTION, org.id), { positions: nextPositions });
      setPositionTarget(null);
    } catch (err) {
      setError(`Couldn't save position: ${err.message}`);
    } finally {
      setSavingPosition(false);
    }
  }

  async function handleDeletePosition(org, position) {
    if (!window.confirm(`Delete the "${position.role}" position at ${org.organization}?`)) return;
    try {
      const nextPositions = org.positions.filter((p) => p.id !== position.id);
      await updateDoc(doc(db, COLLECTION, org.id), { positions: nextPositions });
    } catch (err) {
      setError(`Couldn't delete position: ${err.message}`);
    }
  }

  async function movePosition(org, index, direction) {
    const target = index + direction;
    if (target < 0 || target >= org.positions.length) return;
    const next = [...org.positions];
    [next[index], next[target]] = [next[target], next[index]];
    try {
      await updateDoc(doc(db, COLLECTION, org.id), { positions: next });
    } catch (err) {
      setError(`Couldn't reorder positions: ${err.message}`);
    }
  }

  // ---------- Render ----------

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold">Club Affiliations</h2>
        {editingOrgId === null && (
          <button
            onClick={startAddOrg}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg font-semibold"
          >
            <Plus size={18} /> Add organization
          </button>
        )}
      </div>
      <p className="text-sm text-gray-400 mb-6">
        Add one entry per club/organization. If you've held more than one role there over time (e.g. Member →
        Executive → Director), add each as a separate position under that same organization — they'll show as a
        connected timeline, most recent first.
      </p>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>}

      {/* Add / edit organization form */}
      {editingOrgId !== null && (
        <form onSubmit={handleSaveOrg} className="bg-gray-800 rounded-2xl p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{editingOrgId === "new" ? "Add organization" : "Edit organization"}</h3>
            <button type="button" onClick={cancelOrgEdit} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Club / organization name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="RoboTronics"
              value={orgForm.organization}
              onChange={(e) => setOrgForm({ organization: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Logo / photo (optional)</label>
            <label className="flex items-center gap-2 cursor-pointer bg-gray-900 border border-dashed border-gray-600 rounded-lg px-4 py-3 hover:border-blue-500 transition w-fit">
              <Upload size={18} />
              <span className="text-sm">{logoFile ? logoFile.name : "Choose a file…"}</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setLogoFile(e.target.files[0] || null)} />
            </label>
          </div>

          <button
            type="submit"
            disabled={savingOrg}
            className="bg-green-600 hover:bg-green-500 transition px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {savingOrg ? "Saving…" : "Save"}
          </button>

          {editingOrgId === "new" && (
            <p className="text-xs text-gray-500">
              After saving, click into this organization below to add its first position.
            </p>
          )}
        </form>
      )}

      {/* Organization list */}
      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : orgs.length === 0 ? (
        <p className="text-gray-400">No organizations yet. Click "Add organization" to create the first one.</p>
      ) : (
        <div className="space-y-4">
          {orgs.map((org, index) => (
            <div key={org.id} className="bg-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <button
                  onClick={() => toggleExpanded(org.id)}
                  className="flex items-center gap-3 min-w-0 text-left flex-1"
                >
                  <ChevronRight size={18} className={`flex-shrink-0 transition-transform ${expanded[org.id] ? "rotate-90" : ""}`} />
                  <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {org.logoUrl ? (
                      <img src={org.logoUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Users size={16} className="text-teal-300" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{org.organization}</p>
                    <p className="text-sm text-gray-400">
                      {org.positions.length} position{org.positions.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => moveOrg(index, -1)} disabled={index === 0} className="p-2 hover:bg-gray-700 rounded-lg transition disabled:opacity-30" aria-label="Move up">
                    <ChevronUp size={16} />
                  </button>
                  <button onClick={() => moveOrg(index, 1)} disabled={index === orgs.length - 1} className="p-2 hover:bg-gray-700 rounded-lg transition disabled:opacity-30" aria-label="Move down">
                    <ChevronDown size={16} />
                  </button>
                  <button onClick={() => startEditOrg(org)} className="p-2 hover:bg-gray-700 rounded-lg transition" aria-label="Edit organization">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDeleteOrg(org)} className="p-2 hover:bg-red-900/50 rounded-lg transition text-red-300" aria-label="Delete organization">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {expanded[org.id] && (
                <div className="border-t border-gray-700 px-5 py-4 bg-gray-900/40">
                  {org.positions.length === 0 && positionTarget?.orgId !== org.id && (
                    <p className="text-sm text-gray-400 mb-3">No positions added yet.</p>
                  )}

                  <div className="space-y-2 mb-3">
                    {org.positions.map((pos, pIndex) => (
                      <div key={pos.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
                        <div className="min-w-0">
                          <p className="font-medium truncate">{pos.role}</p>
                          <p className="text-xs text-gray-400">
                            {pos.startDate} – {pos.endDate || "Present"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button onClick={() => movePosition(org, pIndex, -1)} disabled={pIndex === 0} className="p-1.5 hover:bg-gray-700 rounded-lg transition disabled:opacity-30" aria-label="Move up">
                            <ChevronUp size={14} />
                          </button>
                          <button onClick={() => movePosition(org, pIndex, 1)} disabled={pIndex === org.positions.length - 1} className="p-1.5 hover:bg-gray-700 rounded-lg transition disabled:opacity-30" aria-label="Move down">
                            <ChevronDown size={14} />
                          </button>
                          <button onClick={() => startEditPosition(org, pos)} className="p-1.5 hover:bg-gray-700 rounded-lg transition" aria-label="Edit position">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => handleDeletePosition(org, pos)} className="p-1.5 hover:bg-red-900/50 rounded-lg transition text-red-300" aria-label="Delete position">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {positionTarget?.orgId === org.id ? (
                    <form onSubmit={handleSavePosition} className="bg-gray-800 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                          {positionTarget.positionId === "new" ? "Add position" : "Edit position"}
                        </h4>
                        <button type="button" onClick={cancelPositionEdit} className="text-gray-400 hover:text-white">
                          <X size={16} />
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Role / title <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Director"
                          value={positionForm.role}
                          onChange={(e) => setPositionForm({ ...positionForm, role: e.target.value })}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Start date <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Jan 2026"
                            value={positionForm.startDate}
                            onChange={(e) => setPositionForm({ ...positionForm, startDate: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-gray-300 mb-1">End date (blank = Present)</label>
                          <input
                            type="text"
                            placeholder="Dec 2026"
                            value={positionForm.endDate}
                            onChange={(e) => setPositionForm({ ...positionForm, endDate: e.target.value })}
                            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Description</label>
                        <textarea
                          rows={3}
                          value={positionForm.description}
                          onChange={(e) => setPositionForm({ ...positionForm, description: e.target.value })}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={savingPosition}
                        className="bg-green-600 hover:bg-green-500 transition px-4 py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
                      >
                        {savingPosition ? "Saving…" : "Save position"}
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => startAddPosition(org)}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition"
                    >
                      <Plus size={16} /> Add position
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
