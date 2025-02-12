import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import InputData from "./pages/InputData";
import MyTicket from "./pages/MyTicket";
import NavbarUser from "./components/NavbarUser";
import Register from "./pages/Register"; // Import navbar

function App() {
  return (
    <>
      <NavbarUser /> {/* Navbar selalu ada di atas */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/input-data" element={<InputData />} />
        <Route path="/my-ticket" element={<MyTicket />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
