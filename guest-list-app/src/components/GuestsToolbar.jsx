import { useState, useEffect } from "react";

export default function GuestsToolbar({ onQueryChange, onSortChange }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("name-asc");

  useEffect(() => {
    onQueryChange(q);
  }, [q, onQueryChange]);
  useEffect(() => {
    onSortChange(sort);
  }, [sort, onSortChange]);

  return (
    <div className="toolbar">
      <input
        className="input"
        type="search"
        placeholder="Search guests…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search guests"
      />
      <select
        className="select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        aria-label="Sort guests"
      >
        <option value="name-asc">Name (A→Z)</option>
        <option value="name-desc">Name (Z→A)</option>
        <option value="checked-first">Checked-in first</option>
      </select>
    </div>
  );
}
