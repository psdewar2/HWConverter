export function inToM(inches: number) {
  return Number((0.0254 * inches).toFixed(2));
}

export function mToFtIn(meters: number) {
  let inches = 39.37 * meters;
  return [Math.floor(inches / 12), Number((inches % 12).toFixed(2))]; // feet, inches
}

export function lbToKg(pounds: number) {
  return Number((0.4536 * pounds).toFixed(2));
}

export function kgToLb(kilograms: number) {
  return Number((2.205 * kilograms).toFixed(2));
}
