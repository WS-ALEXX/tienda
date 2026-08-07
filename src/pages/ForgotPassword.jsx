import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Auth.css";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError("Ingresa un correo válido.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Recuperar contraseña</h1>
        <p className="auth-hint">Te enviaremos un enlace para restablecer tu contraseña.</p>

        {sent ? (
          <p className="auth-success">
            Si el correo existe en nuestro sistema, recibirás instrucciones en breve.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              id="correo"
              label="Correo electrónico"
              type="email"
              value={correo}
              error={error}
              onChange={(e) => setCorreo(e.target.value)}
            />
            <Button type="submit" variant="accent" fullWidth>Enviar enlace</Button>
          </form>
        )}

        <div className="auth-links">
          <Link to="/iniciar-sesion">Volver a iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
}
