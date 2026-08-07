import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useFavorites } from "../context/FavoritesContext";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import "./Shop.css";

export default function Favorites() {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const favoriteProducts = products ? products.filter((p) => favorites.includes(p.id)) : [];

  return (
    <div className="container shop">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: "Favoritos" }]} />
      <div className="shop__head">
        <h1>Mis favoritos</h1>
      </div>

      {!products ? null : favoriteProducts.length === 0 ? (
        <div className="shop__empty">
          <p>Aún no guardaste productos favoritos.</p>
        </div>
      ) : (
        <div className="shop__grid">
          {favoriteProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
