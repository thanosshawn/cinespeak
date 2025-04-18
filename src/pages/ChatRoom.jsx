// src/pages/ChatRoom.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../firebase";
import Header from "../components/Header";
import "./ChatRoom.css";

export default function ChatRoom() {
  const { user } = useAuth();
  const { id } = useParams(); // Chat Room ID
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

 // src/pages/ChatRoom.jsx
useEffect(() => {
  const messagesRef = ref(db, "chatrooms/" + id + "/messages");
  onValue(messagesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const messagesArray = Object.keys(data).map(key => ({
        ...data[key],
        id: key
      }));

      // Sort messages by timestamp
      messagesArray.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(messagesArray);
    }
  });
}, [id]);


  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageText.trim()) return;

    const messagesRef = ref(db, "chatrooms/" + id + "/messages");
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      userId: user.uid,
      userName: user.displayName,
      message: messageText,
      timestamp: Date.now(),
    });

    setMessageText(""); // Clear input field
  };
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Customize as per your needs (e.g., "MM/DD/YYYY, HH:mm")
  };
  
  return (
    <div className="chatroom">
      <Header user={user} onLogout={() => {}} />

      <main className="chatroom-body">
        <h2>Chat Room {id}</h2>

        <div className="messages-container">
          {messages.map((msg) => (
            <div className="message" key={msg.id}>
              <strong>{msg.userName}:</strong> {msg.message}
              <span className="timestamp">({formatTimestamp(msg.timestamp)})</span>
            </div>
          ))}
        </div>

        <form className="message-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message"
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}
