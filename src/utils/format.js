export function formatPrice(value) {
  return `S/ ${Number(value).toFixed(2)}`;
}

export function statusTone(estado) {
  const map = {
    Pendiente: "warning",
    Preparando: "info",
    Enviado: "accent",
    Entregado: "success",
    Cancelado: "danger",
  };
  return map[estado] || "info";
}
