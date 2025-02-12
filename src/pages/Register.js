import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 🔥 Import Context
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // 🔥 Ambil fungsi login dari context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Mendaftarkan...");

    try {
      // 🔥 Kirim data pendaftaran ke server
      await axios.post(
        "https://ktm-ticketing-backend-production.up.railway.app/auth/register",
        formData
      );

      console.log("✅ Register sukses!");
      setMessage("✅ Pendaftaran Berhasil! Melakukan login otomatis...");

      // 🔥 Login otomatis setelah register
      const loginResponse = await axios.post(
        "https://ktm-ticketing-backend-production.up.railway.app/auth/login",
        formData
      );

      const token = loginResponse.data.token;
      login(token); // 🔥 Simpan token & update state tanpa refresh
      console.log("🔑 Token disimpan:", token);

      // 🔥 Redirect ke halaman Input Data
      setTimeout(() => navigate("/input-data"), 2000);
    } catch (error) {
      console.error(
        "❌ Error registrasi atau login:",
        error.response?.data || error.message
      );
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
