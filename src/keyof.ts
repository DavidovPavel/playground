function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
  return o[k];
}

type WeekDay = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = WeekDay | 'Sat' | 'Sun';

// let nextDay: Record<WeekDay, Day> = {
//   Mon: 'Tue',
// };

// let nextDay: { [K in WeekDay]: Day } = {
//   Mon: 'Tue',
// };

type myRecord<K extends keyof any, T> = {
  [P in K]: T;
};

type Example = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

type OptionalExample = {
  [K in keyof Example]?: Example[K];
};

type NullableExample = {
  [K in keyof Example]: Example[K] | null;
};

type ReadonlyExample = {
  readonly [K in keyof Example]: Example[K];
};

type NoReadonlyExample = {
  -readonly [K in keyof Example]: Example[K];
};

type RequireExample = {
  [K in keyof Example]-?: Example[K];
};
