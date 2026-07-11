// src/admin/AdminLogin.jsx
//
// No sign-up form here on purpose - the only way to get an admin account
// is for you to create it yourself in the Firebase console (Authentication
// -> Users -> Add user). That's what keeps this panel from being editable
// by anyone who finds the URL.

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError("Login failed - check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-8 w-full max-w-sm space-y-4 shadow-2xl">
        <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Login</h1>

        {error && <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">{error}</div>}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 transition py-2 rounded-lg font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>

        <a href="/" className="block text-center text-sm text-gray-400 hover:text-white transition">
          ← Back to site
        </a>
      </form>
    </div>
  );
}
