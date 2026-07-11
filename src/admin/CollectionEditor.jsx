// src/admin/CollectionEditor.jsx
//
// One generic list + form component, configured per-collection by
// adminConfig.js. This is what keeps the admin panel from becoming 5
// nearly-identical copy-pasted CRUD screens (the same mistake the old
// public site made with its hardcoded cards).

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
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Pencil, Trash2, Plus, X, Upload } from "lucide-react";
import { db, storage } from "../firebase";
import iconMap, { iconNames } from "../data/iconMap";

const emptyFormFor = (fields) => {
  const base = { order: 0 };
  fields.forEach((f) => {
    base[f.name] = f.type === "list" ? "" : "";
  });
  return base;
};

export default function CollectionEditor({ config }) {
  const { collection: collectionName, fields, hasImage, imageFieldName = "url", label } = config;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyFormFor(fields));
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("order", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        setError(`Couldn't load ${label}: ${err.message}`);
        setLoading(false);
      }
    );
    return unsub;
  }, [collectionName, label, fields]);

  function startAdd() {
    setEditingId("new");
    setForm({ ...emptyFormFor(fields), order: items.length });
    setImageFile(null);
    setError("");
  }

  function startEdit(item) {
    setEditingId(item.id);
    const next = { order: item.order ?? 0 };
    fields.forEach((f) => {
      next[f.name] = f.type === "list" ? (item[f.name] || []).join(", ") : item[f.name] ?? "";
    });
    setForm(next);
    setImageFile(null);
    setError("");
  }

  function cancelEdit() {
    setEditingId(null);
    setImageFile(null);
    setError("");
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete this ${label.toLowerCase()} entry? This can't be undone.`)) return;
    try {
      if (item.storagePath) {
        await deleteObject(ref(storage, item.storagePath)).catch(() => {});
      }
      await deleteDoc(doc(db, collectionName, item.id));
    } catch (err) {
      setError(`Couldn't delete: ${err.message}`);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { order: Number(form.order) || 0 };
      fields.forEach((f) => {
        if (f.type === "list") {
          payload[f.name] = form[f.name]
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        } else {
          payload[f.name] = form[f.name] || "";
        }
      });

      // Image upload, if this collection type has one and a new file was picked
      if (hasImage && imageFile) {
        const storagePath = `${collectionName}/${Date.now()}-${imageFile.name}`;
        const storageRef = ref(storage, storagePath);
        await uploadBytes(storageRef, imageFile);
        payload[imageFieldName] = await getDownloadURL(storageRef);
        payload.storagePath = storagePath;
      }

      if (editingId === "new") {
        await addDoc(collection(db, collectionName), payload);
      } else {
        await updateDoc(doc(db, collectionName, editingId), payload);
      }

      setEditingId(null);
      setImageFile(null);
    } catch (err) {
      setError(`Couldn't save: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{label}</h2>
        {editingId === null && (
          <button
            onClick={startAdd}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg font-semibold"
          >
            <Plus size={18} /> Add new
          </button>
        )}
      </div>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>}

      {editingId !== null && (
        <form onSubmit={handleSave} className="bg-gray-800 rounded-2xl p-6 mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{editingId === "new" ? "Add new entry" : "Edit entry"}</h3>
            <button type="button" onClick={cancelEdit} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {fields.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {f.label}
                {f.required && <span className="text-red-400"> *</span>}
              </label>

              {f.type === "textarea" && (
                <textarea
                  required={f.required}
                  value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  rows={4}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              {f.type === "icon" && (
                <select
                  required={f.required}
                  value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an icon…</option>
                  {iconNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              )}

              {(f.type === "text" || f.type === "date" || f.type === "list") && (
                <input
                  type="text"
                  required={f.required}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}

          {hasImage && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {collectionName === "clubRoles" ? "Logo / photo (optional)" : "Image"}
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-gray-900 border border-dashed border-gray-600 rounded-lg px-4 py-3 hover:border-blue-500 transition w-fit">
                <Upload size={18} />
                <span className="text-sm">{imageFile ? imageFile.name : "Choose a file…"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files[0] || null)} />
              </label>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Display order (lower shows first)</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
              className="w-32 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-500 transition px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-gray-400">Nothing here yet. Click "Add new" to create the first entry.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const previewIcon = item.icon && iconMap[item.icon];
            const PreviewIcon = previewIcon || null;
            return (
              <div key={item.id} className="flex items-center justify-between bg-gray-800 rounded-xl px-5 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  {(item.url || item.imageUrl) && (
                    <img src={item.url || item.imageUrl} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                  )}
                  {PreviewIcon && <PreviewIcon size={20} className="flex-shrink-0" style={{ color: item.color }} />}
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{item.title || item.role || item.alt || "Untitled"}</p>
                    {item.organization && <p className="text-sm text-gray-400 truncate">{item.organization}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => startEdit(item)} className="p-2 hover:bg-gray-700 rounded-lg transition" aria-label="Edit">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item)} className="p-2 hover:bg-red-900/50 rounded-lg transition text-red-300" aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
