type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

type ToArray<T> = T[];
type D = ToArray<number>;
type E = ToArray<number | string>; // (number | string)[]

type ToArray2<T> = T extends unknown ? T[] : T[];
type F = ToArray2<number>;
type G = ToArray2<number | string>; // number[] | string[]

// вычисление: какие типы есть в T но нет в U
type Without<T, U> = T extends U ? never : T;

type H = Without<boolean | number | string, boolean>; // string | number

type H2 = Without<boolean, boolean> | Without<number, boolean> | Without<string, boolean>;

type H3 =
  | (boolean extends boolean ? never : boolean)
  | (number extends boolean ? never : number)
  | (string extends boolean ? never : string);

type H4 = never | number | string;
type H5 = number | string;

// объявление обобщенных типов как часть условия

type ElementType<T> = T extends unknown[] ? T[number] : T;
type K = ElementType<number[]>; // number
type K2 = ElementType<string[]>; // string
type K4 = ElementType<{ a: 1; b: 2 }[]>; // {a: 1, b: 2}

type ElementType2<T> = T extends (infer U)[] ? U : T;
type K3 = ElementType2<number[]>; // number

// without infer
type ElementUgly<T, U> = T extends U[] ? U : T;

type SecondArg<T> = T extends (a: any, b: infer U) => any ? U : never;

// Array.slice type !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
type M = typeof Array['prototype']['slice'];
type N = SecondArg<M>; // number | undefined

// Exclude<T, U> analog Without
type O = number | string;
type O2 = string;
type O3 = Exclude<O, O2>; // number

// Extract<T, U>
type P = number | string;
type P2 = string;
type P3 = Extract<P, P2>; // string

// NonNullable<T>
type R = { a?: number | null };
type R2 = NonNullable<R['a']>; // number

// ReturnType<F>
type Q = (a: number) => string;
type Q2 = ReturnType<Q>; // string

// InstanceType<C>
type Z = new () => Y;
type Y = { b: number };
type X = InstanceType<Z>; // {b: number}
