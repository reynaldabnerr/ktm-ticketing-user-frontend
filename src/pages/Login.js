import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("⏳ Memproses login...");

    try {
      const response = await axios.post(
        "https://ktm-ticketing-backend-production.up.railway.app/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      setMessage("✅ Login sukses! Mengalihkan...");
      setTimeout(() => navigate("/input-data"), 2000); // Arahkan ke halaman input data
    } catch (error) {
      setMessage("❌ Login gagal! Periksa email & password.");
    }
  };

  return (
    <div>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">➡️ Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
