import "./Loader.css";

export function CardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__image shimmer" />
      <div className="skeleton-card__line shimmer" style={{ width: "70%" }} />
      <div className="skeleton-card__line shimmer" style={{ width: "40%" }} />
    </div>
  );
}

export default function Loader({ label = "Cargando..." }) {
  return (
    <div className="loader">
      <span className="loader__spinner" />
      <span className="loader__label">{label}</span>
    </div>
  );
}
