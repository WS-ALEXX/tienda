import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import ordersData from "../data/orders.json";
import Badge from "../components/Badge";
import Breadcrumb from "../components/Breadcrumb";
import Button from "../components/Button";
import { formatPrice, statusTone } from "../utils/format";
import "./Profile.css";

export default function Profile() {
  const { user, isAuthenticated, logout } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      setOrders(ordersData.filter((o) => o.usuarioId === user.id || user.id > 1000));
    }
  }, [user]);

  if (!isAuthenticated) return <Navigate to="/iniciar-sesion" replace />;

  return (
    <div className="container profile-page">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: "Mi perfil" }]} />

      <div className="profile-page__layout">
        <aside className="profile-card">
          <div className="profile-card__avatar">{user.nombre.charAt(0)}</div>
          <h2>{user.nombre}</h2>
          <dl className="profile-card__fields">
            <div>
              <dt>Correo</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Dirección</dt>
              <dd>{user.direccion || "No registrada"}</dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>{user.telefono || "No registrado"}</dd>
            </div>
          </dl>
          <Button variant="outline" fullWidth onClick={logout}>Cerrar sesión</Button>
        </aside>

        <section className="profile-orders">
          <h3>Historial de pedidos</h3>
          {orders.length === 0 ? (
            <p className="profile-orders__empty">Aún no tienes pedidos registrados.</p>
          ) : (
            <div className="profile-orders__list">
              {orders.map((order) => (
                <article key={order.id} className="order-card">
                  <div className="order-card__head">
                    <span className="order-card__id price-mono">{order.id}</span>
                    <Badge tone={statusTone(order.estado)}>{order.estado}</Badge>
                  </div>
                  <div className="order-card__body">
                    <ul className="order-card__items">
                      {order.items.map((item) => (
                        <li key={item.productoId}>
                          {item.cantidad} × {item.nombre}
                        </li>
                      ))}
                    </ul>
                    <div className="order-card__meta">
                      <span>{order.fecha}</span>
                      <span className="price-mono">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
