import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import "./CartItem.css";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="cart-item">
      <img src={item.imagen} alt={item.nombre} className="cart-item__image" />
      <div className="cart-item__info">
        <span className="cart-item__name">{item.nombre}</span>
        <span className="cart-item__price price-mono">{formatPrice(item.precio)}</span>
      </div>
      <div className="cart-item__qty">
        <button onClick={() => updateQuantity(item.id, item.cantidad - 1)} aria-label="Disminuir cantidad">
          −
        </button>
        <span>{item.cantidad}</span>
        <button onClick={() => updateQuantity(item.id, item.cantidad + 1)} aria-label="Aumentar cantidad">
          +
        </button>
      </div>
      <div className="cart-item__total price-mono">{formatPrice(item.precio * item.cantidad)}</div>
      <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label="Eliminar producto">
        ✕
      </button>
    </div>
  );
}
