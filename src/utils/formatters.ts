/**
 * Função para abreviar um número em uma string.
 * Ex: 1000 -> "1 mil"
 * Ex: 1000000 -> "1 mi"
 */
export const abbreviateNumber = new Intl.NumberFormat("pt-BR", {
  notation: "compact", // Abrevia o número em uma string
  compactDisplay: "short", // Mostra a abreviação mais curta possível
});

/**
 * Função para formatar uma data em uma string.
 * Ex: new Date(2022, 0, 1) -> "1/1/2022"
 */
export const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric", // Mostra o dia da semana
  month: "numeric", // Mostra o mês
  year: "numeric", // Mostra o ano
});
