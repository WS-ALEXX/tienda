import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.4rem", marginBottom: 12 }}>404</h1>
      <p style={{ color: "var(--gray-600)", marginBottom: 20 }}>
        No encontramos la página que buscas.
      </p>
      <Link to="/" style={{ color: "var(--accent)", fontWeight: 600 }}>Volver al inicio</Link>
    </div>
  );
}
