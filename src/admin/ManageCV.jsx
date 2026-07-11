// src/admin/ManageCV.jsx
//
// Unlike everything else in the admin panel, there's only ever one CV, so
// this isn't a list - it reads/writes a single doc: siteConfig/main.

import React, { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FileText, Upload, Trash2 } from "lucide-react";
import { db, storage } from "../firebase";

export default function ManageCV() {
  const [cvUrl, setCvUrl] = useState(null);
  const [cvPath, setCvPath] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "siteConfig", "main"), (snap) => {
      const data = snap.exists() ? snap.data() : {};
      setCvUrl(data.cvUrl || null);
      setCvPath(data.cvStoragePath || null);
      setFileName(data.cvFileName || null);
    });
    return unsub;
  }, []);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setSaving(true);
    setError("");
    try {
      // remove the old file first so Storage doesn't accumulate old CVs
      if (cvPath) {
        await deleteObject(ref(storage, cvPath)).catch(() => {});
      }
      const storagePath = `cv/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, storagePath);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await setDoc(doc(db, "siteConfig", "main"), {
        cvUrl: url,
        cvStoragePath: storagePath,
        cvFileName: file.name,
      }, { merge: true });

      setFile(null);
    } catch (err) {
      setError(`Couldn't upload: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    if (!window.confirm("Remove the current CV from the site?")) return;
    try {
      if (cvPath) {
        await deleteObject(ref(storage, cvPath)).catch(() => {});
      }
      await setDoc(doc(db, "siteConfig", "main"), { cvUrl: null, cvStoragePath: null, cvFileName: null }, { merge: true });
    } catch (err) {
      setError(`Couldn't remove: ${err.message}`);
    }
  }

  return (
    <div className="text-white max-w-xl">
      <h2 className="text-2xl font-bold mb-6">CV / Resume</h2>

      {error && <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4">{error}</div>}

      <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <FileText size={24} className="text-blue-400" />
          <div>
            <p className="font-medium">{fileName || "No CV uploaded yet"}</p>
            {cvUrl && (
              <a href={cvUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-300 hover:underline">
                View current CV
              </a>
            )}
          </div>
        </div>

        <form onSubmit={handleUpload} className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer bg-gray-900 border border-dashed border-gray-600 rounded-lg px-4 py-3 hover:border-blue-500 transition w-fit">
            <Upload size={18} />
            <span className="text-sm">{file ? file.name : "Choose a PDF…"}</span>
            <input type="file" accept="application/pdf" className="hidden" onChange={(e) => setFile(e.target.files[0] || null)} />
          </label>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!file || saving}
              className="bg-green-600 hover:bg-green-500 transition px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {saving ? "Uploading…" : cvUrl ? "Replace CV" : "Upload CV"}
            </button>
            {cvUrl && (
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-2 text-red-300 hover:bg-red-900/50 transition px-4 py-2 rounded-lg"
              >
                <Trash2 size={16} /> Remove
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
