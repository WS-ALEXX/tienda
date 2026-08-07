import "./FilterPanel.css";

const SORT_OPTIONS = [
  { value: "relevancia", label: "Relevancia" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "vendidos", label: "Más vendidos" },
  { value: "calificacion", label: "Mejor calificados" },
];

export default function FilterPanel({ categories, filters, onChange }) {
  function update(patch) {
    onChange({ ...filters, ...patch });
  }

  return (
    <aside className="filter-panel">
      <div className="filter-panel__section">
        <h4>Categoría</h4>
        <ul className="filter-panel__list">
          <li>
            <button
              className={!filters.categoria ? "is-active" : ""}
              onClick={() => update({ categoria: "" })}
            >
              Todas
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                className={filters.categoria === c.id ? "is-active" : ""}
                onClick={() => update({ categoria: c.id })}
              >
                {c.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-panel__section">
        <h4>Precio (S/)</h4>
        <div className="filter-panel__range">
          <input
            type="number"
            min="0"
            placeholder="Mín"
            value={filters.precioMin}
            onChange={(e) => update({ precioMin: e.target.value })}
          />
          <span>—</span>
          <input
            type="number"
            min="0"
            placeholder="Máx"
            value={filters.precioMax}
            onChange={(e) => update({ precioMax: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-panel__section">
        <label className="filter-panel__checkbox">
          <input
            type="checkbox"
            checked={filters.soloOfertas}
            onChange={(e) => update({ soloOfertas: e.target.checked })}
          />
          Solo productos en oferta
        </label>
      </div>

      <div className="filter-panel__section">
        <h4>Ordenar por</h4>
        <select value={filters.orden} onChange={(e) => update({ orden: e.target.value })}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <button
        className="filter-panel__reset"
        onClick={() =>
          onChange({ categoria: "", precioMin: "", precioMax: "", soloOfertas: false, orden: "relevancia" })
        }
      >
        Limpiar filtros
      </button>
    </aside>
  );
}
