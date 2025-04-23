import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {  ref, onValue } from "firebase/database";
import Header from "../components/Header";
import TitleCard from "../components/TitleCard";
import "./Dashboard.css";
import {db} from "../firebase"; // Import initialized Firebase app

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    // Initialize Firebase Realtime Database
    
    const trendingMoviesRef = ref(db, "trendingMovies");

    // Fetch data from trendingMovies
    const unsubscribe = onValue(
      trendingMoviesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert Firebase object to array and map to TitleCard format
          const movieArray = Object.keys(data).map((key) => ({
            id: data[key].imdbID,
            name: data[key].title,
            genre: data[key].genre,
            year: parseInt(data[key].year, 10),
            actors: data[key].actors,
            director: data[key].director,
            plot: data[key].plot,
            poster: data[key].poster,

          }));
          setTitles(movieArray);
        } else {
          setTitles([]);
          console.log("No trending movies found in database.");
        }
      },
      (error) => {
        console.error("Error fetching trending movies:", error.message);
        setTitles([]);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <Header user={user} onLogout={handleLogout} />

      <main className="dashboard-main">
        <h2 className="section-title" style={{ marginTop: "1rem" }}>
          Trending Titles
        </h2>

        <div className="title-grid-container">
          {titles.length > 0 ? (
            titles.map((title) => <TitleCard key={title.id} title={title} />)
          ) : (
            <p>No trending movies available.</p>
          )}
        </div>
      </main>
    </div>
  );
}