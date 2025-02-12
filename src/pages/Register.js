import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Mendaftarkan...");

    try {
      await axios.post(
        "https://ktm-ticketing-backend-production.up.railway.app/auth/register",
        formData
      );
      setMessage("✅ Pendaftaran Berhasil! Silakan Login.");
    } catch (error) {
      setMessage("❌ Pendaftaran Gagal! Email mungkin sudah terdaftar.");
    }
  };

  return (
    <div className="register-container">
      <h2>📝 Daftar Akun</h2>
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
        <button type="submit">Daftar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Register;
