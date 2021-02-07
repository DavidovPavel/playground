let t = [1, true]; // (number | boolean)[]

function tuple<T extends unknown[]>(...ts: T): T {
  return ts;
}

let a = tuple(1, true); // [number, boolean]
let b = tuple('zero', [1, 2]); // [string, number[]]
