import products from "../data/products.json";
import categories from "../data/categories.json";


export function getProducts() {
  return Promise.resolve(products);
}

export function getCategories() {
  return Promise.resolve(categories);
}

export function getProductById(id) {
  const product = products.find((p) => String(p.id) === String(id));
  return Promise.resolve(product || null);
}

export function getOffers() {
  return Promise.resolve(products.filter((p) => p.oferta));
}

export function getFeatured() {
  return Promise.resolve(products.filter((p) => p.masVendido));
}
