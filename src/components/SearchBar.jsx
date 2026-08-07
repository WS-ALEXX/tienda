import "./SearchBar.css";

export default function SearchBar({ value, onChange, placeholder = "Buscar productos..." }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon">⌕</span>
      <input
        type="text"
        className="search-bar__input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Buscar productos"
      />
      {value && (
        <button className="search-bar__clear" onClick={() => onChange("")} aria-label="Limpiar búsqueda">
          ✕
        </button>
      )}
    </div>
  );
}
