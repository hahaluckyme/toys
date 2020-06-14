export default function pearsonCorrelation(xs, ys) {
  if (!Array.isArray(xs)) {
    throw new Error(`xs is not array`);
  }
  if (!Array.isArray(ys)) {
    throw new Error(`ys is not array`);
  }
  if (xs.length !== ys.length) {
    throw new Error(`arr len ${xs.length} mismatch len ${ys.length}`);
  }

  let sx = 0.0;
  let sy = 0.0;
  let sxx = 0.0;
  let syy = 0.0;
  let sxy = 0.0;

  let n = xs.length;

  for (let i = 0; i < n; i++) {
    const x = xs[i];
    const y = ys[i];

    sx += x; // sum
    sy += y; // sum
    sxx += x * x; // sum
    syy += y * y; // sum
    sxy += x * y; // and
  }

  // covariation
  const cov = sxy / n - sx * sy / n / n;
  // standard error of x
  const sigmax = Math.sqrt(sxx / n -  sx * sx / n / n);
  // standard error of y
  const sigmay = Math.sqrt(syy / n -  sy * sy / n / n);

  // correlation is just a normalized covariation
  return cov / sigmax / sigmay;
}
