import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getCategories } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { CardSkeleton } from "../components/Loader";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import Breadcrumb from "../components/Breadcrumb";
import "./Shop.css";

const PAGE_SIZE = 12;

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(params.get("q") || "");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    categoria: params.get("categoria") || "",
    precioMin: "",
    precioMax: "",
    soloOfertas: false,
    orden: "relevancia",
  });

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, filters]);

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = products.filter((p) => {
      const matchesSearch =
        !search ||
        p.nombre.toLowerCase().includes(search.toLowerCase()) ||
        p.categoria.toLowerCase().includes(search.toLowerCase());
      const matchesCategoria = !filters.categoria || p.categoria === filters.categoria;
      const matchesMin = !filters.precioMin || p.precio >= Number(filters.precioMin);
      const matchesMax = !filters.precioMax || p.precio <= Number(filters.precioMax);
      const matchesOferta = !filters.soloOfertas || p.oferta;
      return matchesSearch && matchesCategoria && matchesMin && matchesMax && matchesOferta;
    });

    switch (filters.orden) {
      case "precio-asc":
        list = [...list].sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        list = [...list].sort((a, b) => b.precio - a.precio);
        break;
      case "vendidos":
        list = [...list].sort((a, b) => Number(b.masVendido) - Number(a.masVendido));
        break;
      case "calificacion":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [products, search, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleFilterChange(next) {
    setFilters(next);
    const nextParams = new URLSearchParams(params);
    if (next.categoria) nextParams.set("categoria", next.categoria);
    else nextParams.delete("categoria");
    setParams(nextParams, { replace: true });
  }

  return (
    <div className="container shop">
      <Breadcrumb items={[{ label: "Inicio", to: "/" }, { label: "Tienda" }]} />

      <div className="shop__head">
        <h1>Tienda</h1>
        <div className="shop__search-mobile">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="shop__layout">
        <FilterPanel categories={categories} filters={filters} onChange={handleFilterChange} />

        <div className="shop__results">
          <div className="shop__results-head">
            <span className="shop__count">
              {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {!products ? (
            <div className="shop__grid">
              {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="shop__empty">
              <p>No encontramos productos con esos filtros.</p>
            </div>
          ) : (
            <div className="shop__grid">
              {paginated.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}
