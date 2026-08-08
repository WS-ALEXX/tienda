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

// Función auxiliar para formatear el nombre de la variante desde la URL de la imagen
function getVariantName(imgUrl) {
  if (!imgUrl) return "";
  
  // Extrae el nombre del archivo sin extensión (ej: "gancho-tropical-aqua-teal-green")
  const filename = imgUrl.split("/").pop().split(".")[0];
  const parts = filename.split("-");

  // Si es la foto principal sin sufijos de color
  if (parts.length <= 2) return "";

  // Toma las palabras de la variante y las capitaliza ("aqua", "teal", "green" -> "Aqua Teal Green")
  return parts
    .slice(2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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

  // 1. Cálculo dinámico de la variante y título
  const selectedImage = product.imagenes[activeImg];
  const variantName = getVariantName(selectedImage);
  const dynamicTitle = variantName
    ? `${product.nombre} ${variantName}`
    : product.nombre;

  // 2. Handler para agregar al carrito con la imagen y título seleccionados
  const handleAddToCart = () => {
    const productForCart = {
      ...product,
      id: `${product.id}-${activeImg}`, // ID único si quieres diferenciar variantes en el carrito
      nombre: dynamicTitle,
      // Se coloca la imagen seleccionada como la primera opción
      imagenes: [selectedImage, ...product.imagenes.filter((img) => img !== selectedImage)],
    };

    addItem(productForCart, qty);
  };

  const fav = isFavorite(product.id);

  return (
    <div className="container product-detail">
      <Breadcrumb
        items={[
          { label: "Inicio", to: "/" },
          { label: "Tienda", to: "/tienda" },
          { label: dynamicTitle },
        ]}
      />

      <div className="product-detail__layout">
        <div className="product-detail__gallery">
          <div className="product-detail__main-image">
            <img src={selectedImage} alt={dynamicTitle} />
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
          
          {/* Título dinámico que cambia al seleccionar una miniatura */}
          <h1>{dynamicTitle}</h1>
          
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
              onClick={handleAddToCart}
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