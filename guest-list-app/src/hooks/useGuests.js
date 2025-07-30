import { useEffect, useState } from "react";

const COHORT = "2502-FTB-ET-WEB-PT"; // replace if needed
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/guests`;

export function useGuests() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuests() {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setGuests(json.data);
      } catch (err) {
        console.error("Failed to fetch guests:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGuests();
  }, []);

  return { guests, loading };
}
