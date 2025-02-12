import React, { useState, useEffect } from "react";
import axios from "axios";

function MyTicket() {
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");

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

  return (
    <div>
      <h2>🎟️ My Ticket</h2>
      {message && <p>{message}</p>}
      {ticket && (
        <div>
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
          <p>
            <strong>Hadir:</strong>{" "}
            {ticket.hadir ? "✅ Sudah Check-in" : "❌ Belum Check-in"}
          </p>
          <img src={ticket.qrCode} alt="QR Code" width="150" />
        </div>
      )}
    </div>
  );
}

export default MyTicket;
