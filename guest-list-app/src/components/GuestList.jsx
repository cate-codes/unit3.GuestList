import GuestListItem from "./GuestListItem.jsx";

export default function GuestList({ guests, onSelect, loading, query, sort }) {
  if (loading) {
    return (
      <div className="grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card skeleton" aria-hidden />
        ))}
      </div>
    );
  }

  const q = query.trim().toLowerCase();
  let filtered =
    guests?.filter((g) => {
      const name = `${g.firstName ?? ""} ${g.lastName ?? ""}`.toLowerCase();
      const email = (g.email ?? "").toLowerCase();
      return !q || name.includes(q) || email.includes(q);
    }) ?? [];

  if (sort === "name-asc") {
    filtered.sort(
      (a, b) =>
        (a.lastName ?? "").localeCompare(b.lastName ?? "") ||
        (a.firstName ?? "").localeCompare(b.firstName ?? "")
    );
  } else if (sort === "name-desc") {
    filtered.sort(
      (a, b) =>
        (b.lastName ?? "").localeCompare(a.lastName ?? "") ||
        (b.firstName ?? "").localeCompare(a.firstName ?? "")
    );
  } else if (sort === "checked-first") {
    filtered.sort((a, b) => Number(b.checkedIn) - Number(a.checkedIn));
  }

  if (filtered.length === 0) {
    return (
      <div className="empty">
        <h3>No guests found</h3>
        <p>Try a different search or clear the filters.</p>
      </div>
    );
  }

  return (
    <div className="grid" role="list">
      {filtered.map((g) => (
        <GuestListItem key={g.id} guest={g} onClick={() => onSelect(g.id)} />
      ))}
    </div>
  );
}
