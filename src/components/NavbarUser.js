import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarUser.css"; // Styling

function NavbarUser() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi manual

  const handleNavigation = (path) => {
    setIsOpen(false); // Tutup menu
    navigate(path); // Navigasi ke halaman yang dipilih
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🎟️ KTM Ticketing</h1>
      <div className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <button onClick={() => handleNavigation("/register")}>
            📝 Daftar
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/my-ticket")}>
            🎫 Tiket Saya
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigation("/login")}>🔑 Login</button>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarUser;
