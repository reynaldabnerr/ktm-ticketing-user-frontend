import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function InputData() {
  const [nama, setNama] = useState("");
  const [noHp, setNoHp] = useState("");
  const [buktiTransfer, setBuktiTransfer] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Memproses...");

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("noHp", noHp);
    formData.append("buktiTransfer", buktiTransfer);

    console.log("📤 Data yang dikirim:", {
      nama,
      noHp,
      buktiTransfer,
      token: localStorage.getItem("token"),
    });

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

      console.log("✅ Respon backend:", response.data);
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
    <div>
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
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setBuktiTransfer(e.target.files[0])}
          required
        />
        <button type="submit">✅ Simpan Data</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default InputData;
