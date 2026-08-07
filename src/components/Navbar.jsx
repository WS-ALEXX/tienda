import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import categories from "../data/categories.json";
import "./Navbar.css";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { count } = useCart();
  const { user, isAuthenticated } = useUser();

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(`/tienda?q=${encodeURIComponent(search)}`);
  }

  return (
    <header className="navbar">
      <div className="navbar__top container">
        <button
          className="navbar__burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <Link to="/" className="navbar__logo">
          SAICO
        </Link>

        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <SearchBar value={search} onChange={setSearch} />
        </form>

        <div className="navbar__actions">
          <Link to={isAuthenticated ? "/perfil" : "/iniciar-sesion"} className="navbar__action">
            <span className="navbar__action-icon">◐</span>
            <span className="navbar__action-label">
              {isAuthenticated ? user.nombre.split(" ")[0] : "Ingresar"}
            </span>
          </Link>
          <Link to="/favoritos" className="navbar__action">
            <span className="navbar__action-icon">♡</span>
            <span className="navbar__action-label">Favoritos</span>
          </Link>
          <Link to="/carrito" className="navbar__action navbar__cart">
            <span className="navbar__action-icon">⛃</span>
            <span className="navbar__action-label">Carrito</span>
            {count > 0 && <span className="navbar__cart-count">{count}</span>}
          </Link>
        </div>
      </div>

      <nav className={`navbar__categories ${menuOpen ? "is-open" : ""}`}>
        <div className="container navbar__categories-inner">
          <Link to="/tienda" onClick={() => setMenuOpen(false)}>
            Tienda
          </Link>
          <Link to="/ofertas" onClick={() => setMenuOpen(false)}>
            Ofertas
          </Link>
          {categories.map((c) => (
            <Link key={c.id} to={`/tienda?categoria=${c.id}`} onClick={() => setMenuOpen(false)}>
              {c.nombre}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
