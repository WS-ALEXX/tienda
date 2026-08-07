import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("tienda:favorites", []);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function isFavorite(id) {
    return favorites.includes(id);
  }

  const value = { favorites, toggleFavorite, isFavorite };
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return ctx;
}
