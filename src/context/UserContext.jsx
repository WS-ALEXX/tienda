import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import usersData from "../data/users.json";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage("tienda:user", null);

  function login(correo, password) {
    const found = usersData.find(
      (u) =>
        u.correo.toLowerCase() === correo.toLowerCase() &&
        u.password === password,
    );
    if (!found) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    return { ok: true };
  }

  function register(data) {
    // Simulado: no persiste en users.json, solo inicia sesión localmente.
    const { password: _pw, ...safeUser } = data;
    setUser({ id: Date.now(), ...safeUser });
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user),
  };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser debe usarse dentro de UserProvider");
  return ctx;
}
