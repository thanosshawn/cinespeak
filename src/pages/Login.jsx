// src/pages/Login.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="title">Cine<span>Speak</span></h1>
        <p className="subtitle">Anime meets Cinema — let's chat!</p>
        <button className="google-btn" onClick={handleLogin}>
  <img src="/google-icon.svg" alt="Google logo" />
  Sign in with Google
</button>

      </div>
    </div>
  );
}
