import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
  push,
  set,
  endBefore,
} from "firebase/database";
import { db } from "../firebase";
import Header from "../components/Header";
import "./ChatRoom.css";

export default function ChatRoom() {
  const { user } = useAuth();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef(null);
  const lastMessageTimestamp = useRef(null);

  // Calculate number of messages to fit in container
  const getMessagesToFit = () => {
    const avgMessageHeight = 80; // Approximate height per message (px)
    const containerHeight = window.innerHeight * 0.7; // 70vh for visibility
    return Math.floor(containerHeight / avgMessageHeight);
  };

  // Fetch initial messages to fit container
  useEffect(() => {
    const messagesToFit = getMessagesToFit();
    const messagesRef = query(
      ref(db, `chatrooms/${id}/messages`),
      orderByChild("timestamp"),
      limitToLast(messagesToFit)
    );

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data)
          .map((key) => ({
            ...data[key],
            id: key,
          }))
          .sort((a, b) => a.timestamp - b.timestamp);
        setMessages(messagesArray);
        lastMessageTimestamp.current = messagesArray[0]?.timestamp || null;
      } else {
        setMessages([]);
      }
    });

    return () => unsubscribe();
  }, [id]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Load older messages on scroll up
  const loadMoreMessages = () => {
    if (loading || !lastMessageTimestamp.current) return;

    setLoading(true);
    const messagesToFit = getMessagesToFit();
    const messagesRef = query(
      ref(db, `chatrooms/${id}/messages`),
      orderByChild("timestamp"),
      endBefore(lastMessageTimestamp.current),
      limitToLast(messagesToFit)
    );

    onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const newMessages = Object.keys(data)
            .map((key) => ({
              ...data[key],
              id: key,
            }))
            .sort((a, b) => a.timestamp - b.timestamp);

          if (newMessages.length > 0) {
            setMessages((prev) => [...newMessages, ...prev]);
            lastMessageTimestamp.current = newMessages[0]?.timestamp || null;
          }
        }
        setLoading(false);
      },
      { onlyOnce: true }
    );
  };

  // Handle container scroll to load older messages
  const handleScroll = () => {
    if (messagesContainerRef.current.scrollTop <= 0 && !loading) {
      loadMoreMessages();
    }
  };

  // Send a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const messagesRef = ref(db, `chatrooms/${id}/messages`);
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, {
      userId: user.uid,
      userName: user.displayName,
      userPhoto: user.photoURL || "https://via.placeholder.com/40",
      message: messageText,
      timestamp: Date.now(),
    });

    setMessageText("");
    setShowEmojiPicker(false);
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Add emoji to the input field
  const addEmoji = (emoji) => {
    setMessageText((prev) => prev + emoji);
  };

  // Emoji options for picker
  const emojis = ["😀", "😂", "😍", "👍", "🚀", "🌟", "💖"];

  return (
    <div className="chatroom">
      <Header user={user} onLogout={() => {}} />
      <main className="chatroom-body">
        <h2 className="chatroom-title">Chat Room {id}</h2>

        <div
          className="messages-container"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          {loading && <div className="loading">Loading...</div>}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${msg.userId === user.uid ? "message-right" : "message-left"}`}
            >
              <div className="message-content">
                <img
                  src={msg.userPhoto || "https://via.placeholder.com/40"}
                  alt={msg.userName}
                  className="user-photo"
                />
                <div
                  className={`message-bubble ${
                    msg.userId === user.uid ? "bubble-right" : "bubble-left"
                  }`}
                >
                  <div className="message-header">
                    <strong>{msg.userName}</strong>
                    <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
                  </div>
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form className="message-form" onSubmit={handleSendMessage}>
          <button
            type="button"
            className="emoji-button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            aria-label="Toggle emoji picker"
          >
            😊
          </button>
          {showEmojiPicker && (
            <div className="emoji-picker">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="emoji-option"
                  onClick={() => addEmoji(emoji)}
                  aria-label={`Add emoji ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
            aria-label="Message input"
          />
          <button type="submit" className="send-button" aria-label="Send message">
            Send
          </button>
        </form>
      </main>
    </div>
  );
}