export const differenceInDaysBetweenDates = (
  date1: Date,
  date2: Date
): number | null => {
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    return null;
  }

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Horas * Minutos * Segundos * Milisegundos
  const date1InMilliseconds = date1.getTime();
  const date2InMilliseconds = date2.getTime();
  const differenceInMilliseconds = Math.abs(
    date1InMilliseconds - date2InMilliseconds
  );
  return Math.round(differenceInMilliseconds / oneDayInMilliseconds);
};
