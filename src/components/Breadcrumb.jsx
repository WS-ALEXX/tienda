import { Link } from "react-router-dom";
import "./Breadcrumb.css";

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Ruta de navegación">
      {items.map((item, i) => (
        <span key={i} className="breadcrumb__item">
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
          {i < items.length - 1 && <span className="breadcrumb__sep">/</span>}
        </span>
      ))}
    </nav>
  );
}
