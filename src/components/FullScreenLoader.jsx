// src/components/FullScreenLoader.jsx
import React from "react";

const FullScreenLoader = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner} />
      <p style={styles.text}>Loading CineSpeak ✨</p>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fefefe",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "6px solid #eee",
    borderTop: "6px solid #ff4081",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "16px",
    color: "#444",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "1.1rem",
  },
};

// Inject keyframes into page manually (since not using CSS files or styled-components)
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default FullScreenLoader;
