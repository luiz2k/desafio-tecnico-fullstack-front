export const abbreviateNumber = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  compactDisplay: "short",
});

export const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
});
