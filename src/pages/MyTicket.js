import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import "./MyTicket.css"; // Pastikan CSS telah diperbarui

function MyTicket() {
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");
  const ticketRef = useRef(null); // 🔥 Referensi untuk elemen yang akan diambil gambarnya

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ktm-ticketing-backend-production.up.railway.app/tickets/my-tickets",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.tickets.length > 0) {
          setTicket(response.data.tickets[0]);
        } else {
          setMessage("⚠️ Anda belum memiliki tiket.");
        }
      } catch (error) {
        setMessage("❌ Gagal mengambil tiket.");
      }
    };

    fetchTicket();
  }, []);

  // 🔥 Fungsi untuk menangkap tiket sebagai gambar & mengunduhnya
  const handleDownloadTicket = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      scale: 3, // ✅ Meningkatkan kualitas gambar
      useCORS: true, // ✅ Memastikan font & gambar bisa ditampilkan
      backgroundColor: null, // ✅ Agar transparan & tidak mengganggu desain
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `Tiket-${ticket.ticketId}.png`;
    link.click();
  };

  return (
    <div className="my-ticket-container">
      <h2>🎟️ My Ticket</h2>
      {message && <p>{message}</p>}
      {ticket && (
        <div ref={ticketRef} className="ticket-content">
          <div className="ticket-info">
            <p>
              <strong>Nama:</strong> {ticket.nama}
            </p>
            <p>
              <strong>Email:</strong> {ticket.email}
            </p>
            <p>
              <strong>No HP:</strong> {ticket.noHp}
            </p>
            <p>
              <strong>Ticket ID:</strong> {ticket.ticketId}
            </p>
            <p
              className={`ticket-status ${
                ticket.hadir ? "status-hadir" : "status-belum"
              }`}
            >
              {ticket.hadir ? "✅ Sudah Check-in" : "❌ Belum Check-in"}
            </p>
            <img src={ticket.qrCode} alt="QR Code" className="qr-code" />
          </div>
        </div>
      )}

      {/* 🔥 Tombol Download Tiket */}
      {ticket && (
        <button className="download-button" onClick={handleDownloadTicket}>
          📥 Download Tiket
        </button>
      )}
    </div>
  );
}

export default MyTicket;
