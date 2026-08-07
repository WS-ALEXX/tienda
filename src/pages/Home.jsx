import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeatured, getOffers, getCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { CardSkeleton } from "../components/Loader";
import "./Home.css";

export default function Home() {
  const [featured, setFeatured] = useState(null);
  const [offers, setOffers] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getFeatured().then(setFeatured);
    getOffers().then((data) => setOffers(data.slice(0, 4)));
    getCategories().then(setCategories);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero__inner">
          <span className="hero__eyebrow">COLECCIÓN 2026</span>
          <h1 className="hero__title">
            Resalta tu belleza,
            <br />
            con cada detalle.
          </h1>
          <p className="hero__subtitle">
            Descubre maquillaje, skincare y accesorios que realzan tu belleza todos los días.
          </p>
          <div className="hero__actions">
            <Link to="/tienda" className="hero__cta">Explorar tienda</Link>
            <Link to="/ofertas" className="hero__cta hero__cta--ghost">Ver ofertas</Link>
          </div>
        </div>
      </section>

      <section className="container home__categories">
        {categories.map((c) => (
          <Link key={c.id} to={`/tienda?categoria=${c.id}`} className="category-chip">
            {c.nombre}
          </Link>
        ))}
      </section>

      <section className="container home__section">
        <div className="home__section-head">
          <h2>Destacados</h2>
          <Link to="/tienda" className="home__section-link">Ver todo →</Link>
        </div>
        <div className="home__grid">
          {featured
            ? featured.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)
            : Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </section>

      <section className="container home__section">
        <div className="home__section-head">
          <h2>Ofertas activas</h2>
          <Link to="/ofertas" className="home__section-link">Ver todo →</Link>
        </div>
        <div className="home__grid home__grid--4">
          {offers
            ? offers.map((p) => <ProductCard key={p.id} product={p} />)
            : Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </section>
    </div>
  );
}
