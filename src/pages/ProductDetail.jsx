import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { formatPrice } from "../utils/format";
import Breadcrumb from "../components/Breadcrumb";
import StarRating from "../components/StarRating";
import Badge from "../components/Badge";
import Loader from "../components/Loader";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(undefined);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setProduct(undefined);
    setActiveImg(0);
    setQty(1);
    getProductById(id).then(setProduct);
  }, [id]);

  if (product === undefined) return <Loader label="Cargando producto..." />;
  if (product === null) {
    return (
      <div className="container product-detail__notfound">
        <p>No encontramos este producto.</p>
        <Link to="/tienda">Volver a la tienda</Link>
      </div>
    );
  }

  const fav = isFavorite(product.id);

  return (
    <div className="container product-detail">
      <Breadcrumb
        items={[
          { label: "Inicio", to: "/" },
          { label: "Tienda", to: "/tienda" },
          { label: product.nombre },
        ]}
      />

      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <div className="product-detail__main-image">
            <img src={product.imagenes[activeImg]} alt={product.nombre} />
          </div>
          <div className="product-detail__thumbs">
            {product.imagenes.map((img, i) => (
              <button
                key={i}
                className={`product-detail__thumb ${i === activeImg ? "is-active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`${product.nombre} vista ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail__info">
          <span className="product-detail__sku">{product.sku}</span>
          <h1>{product.nombre}</h1>
          <StarRating rating={product.rating} reviews={product.numResenas} />

          <div className="product-detail__price price-mono">
            {formatPrice(product.precio)}
            {product.precioAnterior && (
              <>
                <span className="product-detail__price-old price-mono">
                  {formatPrice(product.precioAnterior)}
                </span>
                <Badge tone="danger">-{product.descuento}%</Badge>
              </>
            )}
          </div>

          <p className="product-detail__desc">{product.descripcion}</p>

          <dl className="product-detail__meta">
            <div>
              <dt>Categoría</dt>
              <dd>{product.categoria}</dd>
            </div>
            <div>
              <dt>Disponibilidad</dt>
              <dd>{product.stock > 0 ? `${product.stock} unidades` : "Agotado"}</dd>
            </div>
          </dl>

          <div className="product-detail__actions">
            <div className="product-detail__qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
            </div>
            <button
              className="product-detail__add"
              disabled={product.stock === 0}
              onClick={() => addItem(product, qty)}
            >
              {product.stock === 0 ? "Agotado" : "Agregar al carrito"}
            </button>
            <button
              className={`product-detail__fav ${fav ? "is-active" : ""}`}
              onClick={() => toggleFavorite(product.id)}
              aria-label="Agregar a favoritos"
            >
              {fav ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
