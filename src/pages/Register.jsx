import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Auth.css";

export default function Register() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    dni: "",
    nombre: "",
    correo: "",
    password: "",
    direccion: "",
    telefono: "",
  });

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const next = {};
    if (form.nombre.trim().length < 2) next.nombre = "Ingresa tu nombre completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) next.correo = "Ingresa un correo válido.";
    if (form.password.length < 8) next.password = "Mínimo 8 caracteres.";
    
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
        body: JSON.stringify({
          dni: form.dni.trim(),
          nombre: form.nombre.trim(),
          email: form.correo.trim(),
          password: form.password, 
          direccion: form.direccion.trim(),
          telefono: form.telefono.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Error al registrar el usuario.");
      }

      if (setUser) {
        const { password: _pw, ...safeUser } = form;
        setUser(data.user || safeUser);
      }

      navigate("/tienda");

    } catch (err) {
      setFormError(err.message || "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="auth-hint">Regístrate para guardar tus pedidos y favoritos.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            id="dni"
            label="DNI"
            value={form.dni}
            onChange={(e) => setForm({ ...form, dni: e.target.value })}
          />
          <Input
            id="nombre"
            label="Nombre completo"
            value={form.nombre}
            error={errors.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <Input
            id="correo"
            label="Correo electrónico"
            type="email"
            value={form.correo}
            error={errors.correo}
            onChange={(e) => setForm({ ...form, correo: e.target.value })}
          />
          <Input
            id="direccion"
            label="Dirección"
            value={form.direccion}
            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          />
          <Input
            id="telefono"
            label="Teléfono"
            value={form.telefono}
            type="number"
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
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
            {loading ? "Registrando..." : "Crear cuenta"}
          </Button>
        </form>

        <div className="auth-links">
          <Link to="/iniciar-sesion">Ya tengo una cuenta</Link>
        </div>
      </div>
    </div>
  );
}