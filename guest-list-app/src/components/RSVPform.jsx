import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RSVPForm({ onSubmit, nextId }) {
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const id = typeof nextId === "function" ? nextId() : Date.now();
    const newGuest = {
      id,
      firstName,
      lastName,
      email,
      phone,
      checkedIn: false,
    };
    onSubmit?.(newGuest);
    navigate("/guests");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>RSVP</h2>

      <label className="label">
        First name
        <input
          className="input"
          value={firstName}
          onChange={(e) => setFirst(e.target.value)}
          required
        />
      </label>

      <label className="label">
        Last name
        <input
          className="input"
          value={lastName}
          onChange={(e) => setLast(e.target.value)}
          required
        />
      </label>

      <label className="label">
        Email
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="label">
        Phone (optional)
        <input
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <div className="actions">
        <button className="btn" type="submit">
          Submit RSVP
        </button>
      </div>
    </form>
  );
}
