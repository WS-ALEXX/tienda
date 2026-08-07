import { useEffect, useState } from "react";
import { getOffers } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { CardSkeleton } from "../components/Loader";
import Breadcrumb from "../components/Breadcrumb";
import "./Shop.css";

export default function Offers() {
  const [offers, setOffers] = useState(null);

  useEffect(() => {
    getOffers().then(setOffers);
  }, []);

  return (
    <div className="container shop">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: "Ofertas" }]} />
      <div className="shop__head">
        <h1>Ofertas</h1>
      </div>

      {!offers ? (
        <div className="shop__grid">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : offers.length === 0 ? (
        <div className="shop__empty">
          <p>No hay ofertas activas por el momento.</p>
        </div>
      ) : (
        <div className="shop__grid">
          {offers.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
