import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Auth.css";

export default function Login() {
  const { setUser } = useUser(); // Asumiendo que setUser guarda al usuario o se puede usar login/registro según la API
  const navigate = useNavigate();
  const [form, setForm] = useState({ correo: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      next.correo = "Ingresa un correo válido.";
    }
    if (form.password.length < 8) {
      next.password = "La contraseña debe tener al menos 8 caracteres.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhbmRyYWRlYkBhdXRvbm9tYS5lZHUucGUiLCJpYXQiOjE1MTYyMzkwMjJ9.DUkVzCHciwF_my2RfWEjZajRRKos5Kvfauufzi4rkIg";

      const response = await fetch("http://127.0.0.1:5500/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: form.correo,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al autenticar con el servidor.");
      }

      // Guardamos el usuario obtenido de la API en el contexto global
      if (setUser) {
        setUser(data.user);
      }

      navigate("/tienda"); // Redirige a la tienda o página principal
    } catch (err) {
      setFormError(err.message || "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>
        <p className="auth-hint">
          Ingresa tu correo electrónico y contraseña para acceder a tu cuenta.
        </p>
        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            id="correo"
            label="Correo electrónico"
            type="email"
            value={form.correo}
            error={errors.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
          <Input
            id="password"
            label="Contraseña"
            type="password"
            value={form.password}
            error={errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {formError && <p className="auth-error">{formError}</p>}
          <Button type="submit" variant="accent" fullWidth disabled={loading}>
            {loading ? "Cargando..." : "Ingresar"}
          </Button>
        </form>
        <div className="auth-links">
          <Link to="/recuperar-contrasena">¿Olvidaste tu contraseña?</Link>
          <Link to="/registrarse">Crear cuenta nueva</Link>
        </div>
      </div>
    </div>
  );
}