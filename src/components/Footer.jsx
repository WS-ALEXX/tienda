import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">SAICO</span>
          <p>
            Productos de belleza y accesorios,
            seleccionados para hacerte sentir y lucir increíble.
          </p>
          <div className="footer__social">
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="Facebook">▣</a>
            <a href="#" aria-label="TikTok">◐</a>
          </div>
        </div>

        <div className="footer__col">
          <h5>Tienda</h5>
          <ul>
            <li><Link to="/tienda">Todos los productos</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/favoritos">Favoritos</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h5>Contacto</h5>
          <ul>
            <li>Saico@beauty.tienda</li>
            <li>+51 917 375 057</li>
            <li>Lima, Perú</li>
          </ul>
        </div>

        <div className="footer__col">
          <h5>Políticas</h5>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Cambios y devoluciones</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Saico. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}
