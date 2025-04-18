// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TitleCard from "../components/TitleCard";
import "./Dashboard.css";

const mockTitles = [
  { id: 1, name: "Attack on Titan", genre: "Anime", year: 2023 },
  { id: 2, name: "Oppenheimer", genre: "Movie", year: 2023 },
  { id: 3, name: "Demon Slayer", genre: "Anime", year: 2024 },
  { id: 4, name: "Jujutsu Kaisen", genre: "Anime", year: 2023 },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <Header user={user} onLogout={handleLogout} />

      <main className="dashboard-main">
        <h2 className="section-title">Trending Titles</h2>
        <div className="title-grid-container">
          {mockTitles.map((title) => (
            <TitleCard key={title.id} title={title} />
          ))}
        </div>
      </main>
    </div>
  );
}
