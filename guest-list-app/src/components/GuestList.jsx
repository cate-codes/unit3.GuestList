export default function GuestList({ guests, onSelect }) {
  return (
    <ul>
      {guests.map((guest) => (
        <li key={guest.id} onClick={() => onSelect(guest.id)}>
          <strong>{guest.name}</strong> - {guest.email}
        </li>
      ))}
    </ul>
  );
}
