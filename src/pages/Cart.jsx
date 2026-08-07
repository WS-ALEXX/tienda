import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import Breadcrumb from "../components/Breadcrumb";
import { formatPrice } from "../utils/format";

import { useUser } from "../context/UserContext";

import "./Cart.css";

import { useState } from "react";

export default function Cart() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useUser();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  var envio = items.length > 0 ? 5 : 0;

  if (subtotal >= 10) {
    envio = 0;
  }

  const total = subtotal + envio;

  const descargarQR = () => {
    const link = document.createElement("a");
    link.href = "/qr-pay/qr.jpg";
    link.download = "QR-Pago.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmarPago = async () => {
    try {
      setLoading(true);

      // Estructura adaptada a lo que espera Flask backend
      const venta = {
        dni: user.dni,
        nombre: user.nombre,
        email: user.email || user.correo,
        direccion: user.direccion,
        telefono: user.telefono,

        total,
        estado: "PENDIENTE",
        productos: items.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
        })),
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/pedido/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
          body: JSON.stringify(venta),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.log("Error del servidor:", errorData || response.statusText);
        throw new Error(errorData?.message || "Error al registrar la venta");
      }

      const data = await response.json();

      alert("Pago confirmado: " + data.message);

      clearCart();
      setShowModal(false);

      console.log("Respuesta de la API:", data);
    } catch (error) {
      console.error(error);
      alert(error.message || "Ocurrió un error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container cart-page">
      <Breadcrumb
        items={[{ label: "Inicio", to: "/" }, { label: "Carrito" }]}
      />
      <h1>Tu carrito</h1>

      {items.length === 0 ? (
        <div className="cart-page__empty">
          <p>Tu carrito está vacío.</p>
          <Link to="/tienda" className="cart-page__cta">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="cart-page__layout">
          <div className="cart-page__list">
            <div className="cart-page__list-head">
              <span>
                {items.length} producto{items.length !== 1 ? "s" : ""}
              </span>
              <button onClick={clearCart} className="cart-page__clear">
                Vaciar carrito
              </button>
            </div>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <aside className="cart-page__summary">
            <h3>Resumen</h3>
            <div className="cart-page__row">
              <span>Subtotal</span>
              <span className="price-mono">{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-page__row">
              <span>Envío</span>
              <span className="price-mono">{formatPrice(envio)}</span>
            </div>
            <div className="cart-page__row cart-page__row--total">
              <span>Total</span>
              <span className="price-mono">{formatPrice(total)}</span>
            </div>
            <button
              className="cart-page__checkout"
              onClick={() => setShowModal(true)}
            >
              Proceder al pago
            </button>
            <Link to="/tienda" className="cart-page__continue">
              Seguir comprando
            </Link>
          </aside>
        </div>
      )}

      {showModal && (
        <div className="payment-modal">
          <div className="payment-modal__content">
            <h2>Escanea el QR</h2>

            <img
              src="/qr-pay/qr.jpg"
              alt="QR de pago"
              className="payment-modal__qr"
            />
            
            <button onClick={descargarQR} className="payment-modal__download">
              Descargar QR
            </button>

            <p>Escanea el código QR y realiza el pago.</p>

            <div className="payment-modal__buttons">
              <button
                onClick={() => setShowModal(false)}
                className="payment-modal__cancel"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarPago}
                disabled={loading}
                className="payment-modal__confirm"
              >
                {loading ? "Enviando..." : "Confirmar pago"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
