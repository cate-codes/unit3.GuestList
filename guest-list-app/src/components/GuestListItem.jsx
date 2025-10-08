export default function GuestListItem({ guest, onClick }) {
  const name =
    [guest.firstName, guest.lastName].filter(Boolean).join(" ") || "Unnamed";
  return (
    <button className="card" onClick={onClick} role="listitem">
      <div className="card-header">
        <span className="dot" data-checked={guest.checkedIn} />
        <h3 className="title">{name}</h3>
      </div>
      {guest.email && <p className="subtle">{guest.email}</p>}
      {guest.phone && <p className="subtle">{guest.phone}</p>}
    </button>
  );
}
