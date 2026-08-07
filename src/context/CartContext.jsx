import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUser } from "./UserContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("tienda:cart", []);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  function addItem(product, cantidad = 1) {
    // Si NO está registrado/logueado, redirige directo al formulario Register.jsx
    if (!isAuthenticated) {
      navigate("/registrarse");
      return;
    }

    // Si ya está autenticado, agrega el producto al carrito normalmente
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          imagen: product.imagenes?.[0],
          cantidad,
        },
      ];
    });
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateQuantity(id, cantidad) {
    if (cantidad < 1) return;
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)));
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(
    () => items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((acc, i) => acc + i.cantidad, 0), [items]);

  const value = { items, addItem, removeItem, updateQuantity, clearCart, subtotal, count };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}