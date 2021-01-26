function declOfNum(number) {
  const cases = [2, 0, 1, 1, 1, 2];
  return ['символ', 'символа', 'символов'][(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function min(x) {
  return [`${x}`, `введите минимум ${x} ${declOfNum(x)}`];
}

function max(y) {
  return [`${y}`, `здесь должно быть не более ${y} ${declOfNum(y)}`];
}

module.exports = {
  requiredTrue: [true, 'обязательное поле для заполнения'],
  min,
  max,
};
