import React, { createContext, useState, useEffect } from "react";

// Buat Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Saat pertama kali aplikasi dibuka, cek apakah token ada di localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Konversi ke Boolean
  }, []);

  // Fungsi untuk login
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true); // 🔥 Navbar akan update
  };

  // Fungsi untuk logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // 🔥 Navbar langsung berubah ke Login
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
