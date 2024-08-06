export default function currencyFormat(value: number, symbol: string = 'L.') {
  const numberFormatter = new Intl.NumberFormat('es-HN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
  return `${symbol} ${numberFormatter.format(value)}`;
}
