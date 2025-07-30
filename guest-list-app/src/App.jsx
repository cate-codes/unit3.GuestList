import { useState } from "react";
import GuestList from "./components/GuestList";
import GuestDetails from "./components/GuestDetails";
import { useGuests } from "./hooks/useGuests";
import { useGuestDetails } from "./hooks/useGuestDetails";

export default function App() {
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const { guests, loading } = useGuests();
  const selectedGuest = useGuestDetails(selectedGuestId);

  if (loading) return <p>Loading guests...</p>;

  return (
    <div className="App">
      <h1>Guest List</h1>
      {selectedGuest ? (
        <GuestDetails
          guest={selectedGuest}
          onBack={() => setSelectedGuestId(null)}
        />
      ) : (
        <GuestList guests={guests} onSelect={setSelectedGuestId} />
      )}
    </div>
  );
}
