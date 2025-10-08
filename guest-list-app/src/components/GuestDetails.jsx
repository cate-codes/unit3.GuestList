export default function GuestDetails({ guest, onBack, onToggleCheckIn }) {
  if (!guest) return null;
  const name =
    [guest.firstName, guest.lastName].filter(Boolean).join(" ") || "Unnamed";

  return (
    <div className="details">
      <button className="link" onClick={onBack} aria-label="Back to list">
        ← Back
      </button>
      <h2>{name}</h2>
      <div className="pillrow">
        <span className={`pill ${guest.checkedIn ? "ok" : ""}`}>
          {guest.checkedIn ? "Checked in" : "Not checked in"}
        </span>
      </div>
      {guest.email && (
        <p>
          <strong>Email:</strong> {guest.email}
        </p>
      )}
      {guest.phone && (
        <p>
          <strong>Phone:</strong> {guest.phone}
        </p>
      )}

      <div className="actions">
        <button className="btn" onClick={() => onToggleCheckIn(guest)}>
          {guest.checkedIn ? "Mark Not Checked In" : "Mark Checked In"}
        </button>
      </div>
    </div>
  );
}
