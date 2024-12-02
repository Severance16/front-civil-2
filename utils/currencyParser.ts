export function formatCurrency(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0, // Opcional: elimina decimales si no son necesarios
  }).format(valor);
}
