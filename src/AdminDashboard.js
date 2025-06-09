import React from "react";

export default function AdminDashboard({ onLogout }) {
  // You can replace these with real stats or whatever you want
  const stats = {
    totalUsers: 10,
    activeSessions: 3,
    totalPokemons: 151,
    lastLogin: "2025-06-09 16:00",
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><strong>Total Users:</strong> {stats.totalUsers}</li>
        <li><strong>Active Sessions:</strong> {stats.activeSessions}</li>
        <li><strong>Total Pokémon:</strong> {stats.totalPokemons}</li>
        <li><strong>Last Login:</strong> {stats.lastLogin}</li>
      </ul>
      <button onClick={onLogout} style={{ marginTop: "1rem", padding: "0.5rem" }}>
        Logout
      </button>
    </div>
  );
}
