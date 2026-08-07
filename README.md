# Nórdico — Tienda Virtual (Frontend)

Tienda virtual construida solo en el Frontend con React + Vite. Todos los datos
(productos, usuarios, pedidos, categorías) son simulados con archivos JSON en
`src/data/` y el carrito/favoritos/sesión se persisten en `localStorage`.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Cuenta de prueba

- Correo: `camila.torres@correo.com`
- Contraseña: `demo1234`

## Estructura

```
src/
├── assets/
├── components/   # Navbar, Footer, ProductCard, FilterPanel, etc.
├── pages/        # Home, Shop, ProductDetail, Cart, Login, Register, Profile...
├── layouts/      # MainLayout (navbar + outlet + footer)
├── routes/       # AppRoutes.jsx
├── hooks/        # useLocalStorage
├── services/     # productService.js (capa simulada, lista para reemplazar por fetch a una API)
├── data/         # products.json, users.json, orders.json, categories.json
├── context/      # CartContext, UserContext, FavoritesContext
├── styles/       # tokens.css (variables de diseño)
└── utils/        # format.js
```

## Conectar un backend más adelante

Toda la obtención de datos pasa por `src/services/productService.js`. Para
conectar una API real, basta con reemplazar las funciones de ese archivo por
llamadas fetch/axios que devuelvan las mismas formas de datos — el resto de
la app no necesita cambios.

Lo mismo aplica a `UserContext.jsx` (login/registro) una vez que exista un
endpoint de autenticación real.
