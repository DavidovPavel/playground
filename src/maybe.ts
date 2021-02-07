interface Maybe<T> {
  map<U>(f: (value: T) => None): None;
  map<U>(f: (value: T) => Maybe<U>): Maybe<U>;
  get(value: T): T;
}

class Some<T> implements Maybe<T> {
  constructor(private value: T) {}
  map<U>(f: (value: T) => None): None;
  map<U>(f: (value: T) => Some<U>): Some<U>;
  map<U>(f: (value: T) => Maybe<U>): Maybe<U> {
    return f(this.value);
  }
  get(): T {
    return this.value;
  }
}

// tslint:disable-next-line: max-classes-per-file
class None implements Maybe<never> {
  map(): None {
    return this;
  }
  get<U>(value: U): U {
    return value;
  }
}

function Maybe<T>(value: null | undefined): None;
function Maybe<T>(value: T): Some<T>;
function Maybe<T>(value: T): Maybe<T> {
  if (value == null) {
    return new None();
  }
  return new Some(value);
}

let result = Maybe(6)
  .map((n) => Maybe(n * 3))
  .map((n) => new None())
  .get(7);
