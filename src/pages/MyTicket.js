import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import "./MyTicket.css"; // Pastikan CSS telah diperbarui

function MyTicket() {
  const [tickets, setTickets] = useState([]); // ✅ Ubah dari single ticket menjadi array
  const [message, setMessage] = useState("");
  const ticketRefs = useRef({}); // ✅ Simpan referensi untuk setiap tiket per event

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://ktm-ticketing-backend-production.up.railway.app/tickets/my-tickets",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.tickets.length > 0) {
          setTickets(response.data.tickets);
        } else {
          setMessage("⚠️ Anda belum memiliki tiket.");
        }
      } catch (error) {
        setMessage("❌ Gagal mengambil tiket.");
      }
    };

    fetchTickets();
  }, []);

  // 🔥 Fungsi untuk menangkap tiket sebagai gambar & mengunduhnya
  const handleDownloadTicket = async (ticketId) => {
    if (!ticketRefs.current[ticketId]) return;

    const canvas = await html2canvas(ticketRefs.current[ticketId], {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `Tiket-${ticketId}.png`;
    link.click();
  };

  return (
    <div className="my-ticket-container">
      <h2>🎟️ My Tickets</h2>
      {message && <p>{message}</p>}
      {tickets.length > 0 ? (
        tickets.map((ticket) =>
          ticket.events.map((event, index) => (
            <div
              key={event.ticketId}
              ref={(el) => (ticketRefs.current[event.ticketId] = el)}
              className="ticket-content"
            >
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

                {/* ✅ Tampilkan informasi event yang diikuti */}
                <p>
                  <strong>Event:</strong> {event.nama}
                </p>
                <p>
                  <strong>Ticket ID:</strong> {event.ticketId}
                </p>
                <img src={event.qrCode} alt="QR Code" className="qr-code" />

                <p
                  className={`ticket-status ${
                    event.hadir ? "status-hadir" : "status-belum"
                  }`}
                >
                  {event.hadir ? "✅ Sudah Check-in" : "❌ Belum Check-in"}
                </p>
              </div>

              {/* 🔥 Tombol Download Tiket */}
              <button
                className="download-button"
                onClick={() => handleDownloadTicket(event.ticketId)}
              >
                📥 Download Tiket
              </button>
            </div>
          ))
        )
      ) : (
        <p>⚠️ Tidak ada tiket yang ditemukan.</p>
      )}
    </div>
  );
}

export default MyTicket;
