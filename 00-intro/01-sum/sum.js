/**
 * Функция, возвращающая сумму двух чисел
 *
 * @param {Number} a - первое число
 * @param {Number} b - второе целое
 * @return {Number} сумма чисел a и b
 */
export function sum(a, b) {
  const saveA = isNaN(parseFloat(a)) ? 0 : parseFloat(a);
  const saveB = isNaN(parseInt(b)) ? 0 : parseInt(b);

  return saveA + saveB;
}
