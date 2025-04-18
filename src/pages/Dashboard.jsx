// src/pages/Dashboard.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TitleCard from "../components/TitleCard";
import "./Dashboard.css";

const mockTitles = [
  { id: 1, name: "The Shawshank Redemption", genre: "Drama", year: 1994 },
  { id: 2, name: "The Godfather", genre: "Crime", year: 1972 },
  { id: 3, name: "The Dark Knight", genre: "Action", year: 2008 },
  { id: 4, name: "Pulp Fiction", genre: "Crime", year: 1994 },
  { id: 5, name: "Forrest Gump", genre: "Drama", year: 1994 },
  { id: 6, name: "Inception", genre: "Action", year: 2010 },
  { id: 7, name: "Fight Club", genre: "Drama", year: 1999 },
  { id: 8, name: "The Matrix", genre: "Action", year: 1999 },
  { id: 9, name: "Goodfellas", genre: "Crime", year: 1990 },
  { id: 10, name: "The Lord of the Rings: The Fellowship of the Ring", genre: "Fantasy", year: 2001 },
  { id: 11, name: "The Silence of the Lambs", genre: "Thriller", year: 1991 },
  { id: 12, name: "Saving Private Ryan", genre: "War", year: 1998 },
  { id: 13, name: "Gladiator", genre: "Action", year: 2000 },
  { id: 14, name: "The Departed", genre: "Crime", year: 2006 },
  { id: 15, name: "The Prestige", genre: "Mystery", year: 2006 },
  { id: 16, name: "The Green Mile", genre: "Drama", year: 1999 },
  { id: 17, name: "Se7en", genre: "Thriller", year: 1995 },
  { id: 18, name: "The Usual Suspects", genre: "Crime", year: 1995 },
  { id: 19, name: "Life Is Beautiful", genre: "Comedy-Drama", year: 1997 },
  { id: 20, name: "The Lion King", genre: "Animation", year: 1994 },
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
        <h2 className="section-title"  style={{ marginTop: "1rem" }}>Trending Titles</h2>
        {/* <div className="title-grid-container">
          {mockTitles.map((title) => (
            <TitleCard key={title.id} title={title} />
          ))}
        </div> */}
        <div className="title-grid-container">
          {mockTitles.map((title) => (
            <TitleCard key={title.id} title={title} />
          ))}
        </div>
      </main>
    </div>
  );
}
