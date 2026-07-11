// src/admin/AdminRoute.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import AdminLogin from "./AdminLogin";

export default function AdminRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return children;
}
