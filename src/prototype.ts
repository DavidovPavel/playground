interface Array<T> {
  zip<U>(list: U[]): [T, U][];
}

Array.prototype.zip = function <T, U>(this: T[], list: U[]): [T, U][] {
  return this.map((v, k) => tuple(v, list[k]));
};

// type Exclusive1<T, U> = Pick<T | U, T>;


type Exclusive<T, U> = Exclude<T | U, T & U>;

type a = 1 | 2 | 3;
type b = 2 | 3 | 4;

let abbb: Exclusive<a, b>;
