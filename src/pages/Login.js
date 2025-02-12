import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 🔥 Import Context
import "./Login.css"; // 🔥 Import CSS

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 🔥 Ambil fungsi login dari context

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("⏳ Memproses login...");

    try {
      const response = await axios.post(
        "https://ktm-ticketing-backend-production.up.railway.app/auth/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      login(response.data.token); // 🔥 Perbarui state global

      setMessage("✅ Login berhasil!");

      // 🔥 Cek apakah user sudah punya tiket
      const checkTicket = await axios.get(
        "https://ktm-ticketing-backend-production.up.railway.app/tickets/check-user-ticket",
        {
          headers: { Authorization: `Bearer ${response.data.token}` },
        }
      );

      if (checkTicket.data.hasTicket) {
        navigate("/my-ticket"); // 🔥 Jika sudah punya tiket, langsung ke My Ticket
      } else {
        navigate("/input-data"); // 🔥 Jika belum, ke halaman input data
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Gagal login!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔑 Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="📩 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            ✅ Login
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="register-link">
          Belum punya akun?{" "}
          <span onClick={() => navigate("/register")}>Daftar di sini</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
