import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔥 Import untuk navigasi
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // 🔥 Untuk redirect setelah register

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Mendaftarkan...");

    try {

      setMessage("✅ Pendaftaran Berhasil! Mengalihkan ke Input Data...");

      // 🔥 Langsung login setelah register
      const loginResponse = await axios.post(
        "https://ktm-ticketing-backend-production.up.railway.app/auth/register",
        formData
      );

      // 🔥 Simpan token ke localStorage
      localStorage.setItem("token", loginResponse.data.token);

      // 🔥 Alihkan ke halaman Input Data
      setTimeout(() => navigate("/input-data"), 2000);
    } catch (error) {
      setMessage("❌ Pendaftaran Gagal! Email mungkin sudah terdaftar.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Daftar Akun</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-button">
            Daftar
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p className="login-link">
          Sudah punya akun?{" "}
          <span onClick={() => navigate("/login")}>Login di sini</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
