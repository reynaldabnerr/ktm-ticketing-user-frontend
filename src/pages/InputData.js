import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./InputData.css"; // Pastikan ada file styling

function InputData() {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [selectedEvents, setSelectedEvents] = useState([]); // 🔥 Event yang dipilih
  const [buktiTransfer, setBuktiTransfer] = useState(null); // 🔥 1 bukti untuk semua event
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // 🔥 Fungsi untuk memilih event
  const handleEventChange = (event) => {
    const { value, checked } = event.target;
    setSelectedEvents((prev) =>
      checked ? [...prev, value] : prev.filter((e) => e !== value)
    );
  };

  // 🔥 Fungsi untuk menyimpan bukti transfer
  const handleFileChange = (event) => {
    setBuktiTransfer(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Memproses...");

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("noHp", noHp);
    formData.append("events", JSON.stringify(selectedEvents)); // ✅ Pastikan ini JSON String
    formData.append("buktiTransfer", buktiTransfer);

    console.log(
      "📤 Data yang dikirim ke backend:",
      Object.fromEntries(formData)
    );

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://ktm-ticketing-backend-production.up.railway.app/tickets/input-data",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/my-ticket"), 3000);
    } catch (error) {
      console.error(
        "❌ Error input data:",
        error.response?.data || error.message
      );
      setMessage(error.response?.data?.message || "❌ Gagal menyimpan data!");
    }
  };

  return (
    <div className="input-container">
      <h2>📝 Input Data & Bukti Transfer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nomor HP"
          value={noHp}
          onChange={(e) => setNoHp(e.target.value)}
          required
        />

        <h3>Pilih Event:</h3>
        <label>
          <input type="checkbox" value="Event 1" onChange={handleEventChange} />
          Event 1
        </label>
        <label>
          <input type="checkbox" value="Event 2" onChange={handleEventChange} />
          Event 2
        </label>
        <label>
          <input type="checkbox" value="Event 3" onChange={handleEventChange} />
          Event 3
        </label>
        <label>
          <input type="checkbox" value="Event 4" onChange={handleEventChange} />
          Event 4
        </label>

        {/* 🔥 Input file hanya 1 untuk semua event */}
        <h4>Bukti Transfer</h4>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit">✅ Simpan Data</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default InputData;
