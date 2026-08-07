import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { formatPrice } from "../utils/format";
import Badge from "./Badge";
import StarRating from "./StarRating";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(product.id);

  return (
    <article className="product-card">
      <Link to={`/producto/${product.id}`} className="product-card__media">
        <img src={product.imagenes[0]} alt={product.nombre} loading="lazy" />
        <div className="product-card__tags">
          {product.oferta && <Badge tone="danger">-{product.descuento}%</Badge>}
          {product.masVendido && <Badge tone="accent">Más vendido</Badge>}
        </div>
        <button
          className={`product-card__fav ${fav ? "is-active" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
          }}
          aria-label="Agregar a favoritos"
        >
          {fav ? "♥" : "♡"}
        </button>
      </Link>

      <div className="product-card__body">
        <span className="product-card__sku">{product.sku}</span>
        <Link to={`/producto/${product.id}`} className="product-card__name">
          {product.nombre}
        </Link>
        <StarRating rating={product.rating} reviews={product.numResenas} />

        <div className="product-card__price-row">
          <div className="product-card__price price-mono">
            {formatPrice(product.precio)}
            {product.precioAnterior && (
              <span className="product-card__price-old price-mono">
                {formatPrice(product.precioAnterior)}
              </span>
            )}
          </div>
        </div>

        <div className="product-card__actions">
          <Link to={`/producto/${product.id}`} className="product-card__detail">
            Ver detalle
          </Link>
          <button
            className="product-card__add"
            onClick={() => addItem(product, 1)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Agotado" : "Agregar"}
          </button>
        </div>
      </div>
    </article>
  );
}
