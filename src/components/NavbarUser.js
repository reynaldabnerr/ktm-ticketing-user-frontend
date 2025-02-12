import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // 🔥 Import AuthContext
import "./NavbarUser.css"; // 🔥 Import CSS

function NavbarUser() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 🔥 State untuk modal logout
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  // Fungsi Logout dengan Konfirmasi
  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false); // Tutup modal
    navigate("/login"); // 🔥 Redirect ke halaman login
  };

  return (
    <nav className="navbar">
      <h1 className="logo">🎟️ KTM Ticketing</h1>
      <div className="burger-menu" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <button onClick={() => handleNavigation("/my-ticket")}>
            🎫 My Ticket
          </button>
        </li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="logout-button"
            >
              🚪 Sign Out
            </button>
          ) : (
            <button onClick={() => handleNavigation("/login")}>🔑 Login</button>
          )}
        </li>
      </ul>

      {/* 🔥 MODAL KONFIRMASI LOGOUT */}
      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h3>⚠️ Konfirmasi Logout</h3>
            <p>Apakah Anda yakin ingin keluar?</p>
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={() => setShowLogoutModal(false)}
              >
                ❌ Batal
              </button>
              <button className="confirm-button" onClick={confirmLogout}>
                ✅ Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavbarUser;
