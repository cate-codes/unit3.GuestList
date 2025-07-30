import { useEffect, useState } from "react";

const COHORT = "2502-FTB-ET-WEB-PT"; // replace if needed
const BASE_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/guests`;

export function useGuestDetails(guestId) {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    async function fetchGuest() {
      try {
        const res = await fetch(`${BASE_URL}/${guestId}`);
        const json = await res.json();
        setGuest(json.data);
      } catch (err) {
        console.error("Failed to fetch guest details:", err);
      }
    }

    if (guestId) fetchGuest();
  }, [guestId]);

  return guest;
}
