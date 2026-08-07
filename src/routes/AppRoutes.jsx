import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Profile from "../pages/Profile";
import Offers from "../pages/Offers";
import Favorites from "../pages/Favorites";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tienda" element={<Shop />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/ofertas" element={<Offers />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/recuperar-contrasena" element={<ForgotPassword />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
