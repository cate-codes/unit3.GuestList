import { useEffect, useState } from "react";

export function useGuestDetails(id) {
  const [guest, setGuest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchGuest() {
      try {
        setLoading(true);
        setError(null);
        // Replace this URL with your real endpoint if you have one:
        // const res = await fetch(`/api/guests/${id}`);
        // const data = await res.json();
        // setGuest(data);

        // Temporary demo data:
        setGuest({
          id,
          firstName: "Guest",
          lastName: String(id),
          email: `guest${id}@example.com`,
          checkedIn: false,
        });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGuest();
  }, [id]);

  return guest;
}
