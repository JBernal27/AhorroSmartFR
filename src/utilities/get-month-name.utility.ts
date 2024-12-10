export function getMonthName(date: Date): string {
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  if (!(date instanceof Date)) {
    throw new Error('El parámetro debe ser una instancia de Date.');
  }

  return meses[date.getMonth()];
}
