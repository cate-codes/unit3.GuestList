import { useEffect, useState } from "react";

const DEMO_GUESTS = [
  {
    id: 1,
    firstName: "Avery",
    lastName: "Nguyen",
    email: "avery@example.com",
    phone: "555-1001",
    checkedIn: true,
  },
  {
    id: 2,
    firstName: "Maya",
    lastName: "Lopez",
    email: "maya@example.com",
    phone: "555-1002",
    checkedIn: false,
  },
  {
    id: 3,
    firstName: "Noah",
    lastName: "Patel",
    email: "noah@example.com",
    phone: "555-1003",
    checkedIn: false,
  },
  {
    id: 4,
    firstName: "Leo",
    lastName: "Kim",
    email: "leo@example.com",
    phone: "555-1004",
    checkedIn: true,
  },
  {
    id: 5,
    firstName: "Zoe",
    lastName: "Hernandez",
    email: "zoe@example.com",
    phone: "555-1005",
    checkedIn: false,
  },
  {
    id: 6,
    firstName: "Ivy",
    lastName: "Johnson",
    email: "ivy@example.com",
    phone: "555-1006",
    checkedIn: false,
  },
  {
    id: 7,
    firstName: "Eli",
    lastName: "Chen",
    email: "eli@example.com",
    phone: "555-1007",
    checkedIn: true,
  },
  {
    id: 8,
    firstName: "Rae",
    lastName: "Bennett",
    email: "rae@example.com",
    phone: "555-1008",
    checkedIn: false,
  },
];

export function useGuests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: swap this block to your real API call when ready:
        // const res = await fetch("/api/guests");
        // if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // const data = await res.json();

        await new Promise((r) => setTimeout(r, 400)); // small skeleton demo
        const data = DEMO_GUESTS;

        if (alive) setGuests(Array.isArray(data) ? data : []);
      } catch (e) {
        if (alive) setError(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { guests, setGuests, loading, error };
}
