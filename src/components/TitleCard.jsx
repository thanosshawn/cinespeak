// src/components/TitleCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TitleCard.css"; // Assuming you have a CSS file for styling

export default function TitleCard({ title }) {
  const navigate = useNavigate();

  const handleJoinChat = () => {
    // Navigate to the chatroom page for the selected title
    navigate(`/chat/${title.id}`);
  };

  return (
    <div
      className="title-card"
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
       <img
       // src="/img2.jpeg"
       src={title.poster} // make sure img2.jpeg is in the public folder
        alt={`${title.name} poster`}
        style={{
          width: "100%",
          borderRadius: "12px",
          marginBottom: "12px",
          objectFit: "cover",
          maxHeight: "200px",
        }}
      />
      <h3 style={{ color: "#e91e63", marginBottom: "8px" }}>{title.name}</h3>
      <p style={{ margin: 0 }}>{title.genre} ({title.year})  {title.director}</p>
      <button
        onClick={handleJoinChat}
        style={{
          marginTop: "12px",
          padding: "8px 16px",
          backgroundColor: "#3f51b5",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Join Chat
      </button>
    </div>
  );
}
