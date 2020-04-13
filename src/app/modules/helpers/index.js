import chi from 'chi-squared';

export const sum = arr => arr.reduce((acc, el) => acc + el, 0);

export const calcMean = (values, repeats) =>
  values.reduce((acc, el, i) => acc + el * repeats[i], 0) / sum(repeats);

export const calcMedian = (values, repeats) => {
  const accumulates = repeats.reduce(
    (acc, el, i) => [...acc, i > 0 ? acc[i - 1] + el : el],
    [],
  );
  const place = (sum(repeats) + 1) / 2;
  return values.find((el, i) => {
    return i < values.length - 1 && accumulates[i] > place;
  });
};

export const calcDeviation = (values, repeats, mean, pow = 2) =>
  values.reduce((acc, el, i) => acc + repeats[i] * (el - mean) ** pow, 0);

export const range = (from, to, step = 1) =>
  Array(~~((to - from) / step) + 1)
    .fill(0)
    .map((v, i) => from + i * step);

export const randInt = (min = 1, max = 10) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const gaussian = x => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x ** 2 / 2));

export const calcTheoreticalFrequency = (
  el,
  i,
  values,
  totalN,
  mean,
  stdev,
) => {
  const step = values[1] - values[0];
  const z = (values[i] - mean) / stdev;
  return ((step * totalN) / stdev) * gaussian(z);
};

export const calcFunctionInv = (p, df) => {
  let x = chi.pdf(p, df);
  if (x < 0) x = NaN;
  return x.toFixed(5);
};
