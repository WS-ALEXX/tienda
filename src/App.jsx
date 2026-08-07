import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <FavoritesProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </FavoritesProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
