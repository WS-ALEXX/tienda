import "./Pagination.css";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Paginación">
      <button
        className="pagination__nav"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Página anterior"
      >
        ←
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={`pagination__page ${p === page ? "pagination__page--active" : ""}`}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <button
        className="pagination__nav"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Página siguiente"
      >
        →
      </button>
    </nav>
  );
}
