import { useState, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";

import GuestsToolbar from "./components/GuestsToolbar";
import GuestList from "./components/GuestList";
import GuestDetails from "./components/GuestDetails";
import RSVPForm from "./components/RSVPform";
import Home from "./pages/Home";

import { useGuests } from "./hooks/useGuests";
import { useGuestDetails } from "./hooks/useGuestDetails";

export default function App() {
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name-asc");

  const {
    guests = [],
    setGuests = () => {},
    loading = false,
    error = null,
  } = useGuests() || {};
  const selectedGuest = useGuestDetails(selectedGuestId);

  const guestsById = useMemo(() => {
    const map = new Map();
    guests.forEach((g) => map.set(g.id, g));
    return map;
  }, [guests]);

  const patchedSelected =
    selectedGuestId != null
      ? guestsById.get(selectedGuestId) ?? selectedGuest
      : null;

  function nextId() {
    return (guests.reduce((m, g) => (g.id > m ? g.id : m), 0) || 0) + 1;
  }

  function handleRSVPSubmit(newGuest) {
    setGuests([...guests, newGuest]); // optimistic local add
  }

  async function toggleCheckIn(guest) {
    if (!guest) return;
    const prev = guests;
    const next = guests.map((g) =>
      g.id === guest.id ? { ...g, checkedIn: !g.checkedIn } : g
    );
    setGuests(next);
    try {
      // await fetch(`/api/guests/${guest.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ checkedIn: !guest.checkedIn }) });
    } catch (e) {
      setGuests(prev);
      console.error(e);
      alert("Sorry, could not update check-in right now.");
    }
  }

  return (
    <>
      <header className="topnav">
        <nav className="container navrow">
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/rsvp">
            RSVP
          </Link>
          <Link className="navlink" to="/guests">
            Guests
          </Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/rsvp"
            element={<RSVPForm onSubmit={handleRSVPSubmit} nextId={nextId} />}
          />

          <Route
            path="/guests"
            element={
              <>
                <h1>Guest List</h1>
                <GuestsToolbar
                  onQueryChange={setQuery}
                  onSortChange={setSort}
                />
                {error ? (
                  <div className="error">
                    <h3>Something went wrong.</h3>
                    <p>{String(error)}</p>
                  </div>
                ) : selectedGuestId != null && patchedSelected ? (
                  <GuestDetails
                    guest={patchedSelected}
                    onBack={() => setSelectedGuestId(null)}
                    onToggleCheckIn={toggleCheckIn}
                  />
                ) : (
                  <GuestList
                    guests={guests}
                    loading={loading}
                    onSelect={setSelectedGuestId}
                    query={query}
                    sort={sort}
                  />
                )}
              </>
            }
          />
        </Routes>
      </main>
    </>
  );
}
