// src/pages/ChatRoom.jsx
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import "./ChatRoom.css";

export default function ChatRoom() {
  const { user, logout } = useAuth();
  const { id } = useParams();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="chatroom">
      <Header user={user} onLogout={handleLogout} />
      <main className="chatroom-body">
        <h2>You're now in Chat Room #{id} 🎤</h2>
        <p>Live chat for your chosen title goes here 🚀</p>
        {/* Chat messages and input go here later */}
      </main>
    </div>
  );
}
