// src/components/Header.jsx
import React from "react";
import "./Header.css";

export default function Header({ user, onLogout }) {
  return (
    <header className="dashboard-header">
      <div 
        className="welcome-text"
        style={{
          width: "100%",
        }}>
        <h1>Welcome back, <span>{user.displayName}</span> ✨</h1>
        <p>Let’s dive into the world of stories 🌸</p>
      </div>
      <button className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}
