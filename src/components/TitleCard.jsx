// src/components/TitleCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TitleCard({ title }) {
  const navigate = useNavigate();

  const handleJoinChat = () => {
    // Navigate to the chatroom page for the selected title
    navigate(`/chat/${title.id}`);
  };

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '15px', // Reduced padding for smaller screens
        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <h3 style={{ color: "#e91e63", marginBottom: "8px" }}>{title.name}</h3>
      <p style={{ margin: 0 }}>{title.genre} ({title.year})</p>
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
