# TypeScript

**Тип** - набор значений и применимых к ним операций.

```scheme
                    Unknown
                        |
Undefined <-- Void <-- Any --> Null
                        |
Number  Bigint   Boolean    String  Symbol    Object
    |                         |       |         |
Number                      String  Unique    Array   Function    Constructor
Enum                        Enum    Symbol      |
                                              Tuple

                    Never

```

**Литерал типа** - тип, представляющий только одно значение и ничто другое

**Структурная типизация** - тип определяется набором конкретных свойств объекта.

`JavaScript-объекты изменяемы, т.е их поля можно изменить после создания, по-этому при объявление объекта как const не выведет более узкий тип`

```ts
const a: {b: number} = {b: 12} // {b: number}
```

**Пример объявления**:

```ts
let a: {
    a: number;
    b?: string;
    [key: number]: string;  // сигнатура индексов
    readonly e: { z: number };
}
```

**Присвоение для объектов** - ts будет ожидать тот тип который был объявлен, но:

```ts
let danger: {};     // стараться избегать такого объявления
danger = {};
danger = {x: 1};
danger = [];
danger = 2;
```

```ts
// пример для object, {}, Object

let a = 'a';
let b = 1;
let c = Symbol('a');

let a1 = a as object    // error
let a2 = a as {}        // valid!!!!
let a3 = a as Object    // valid!!!!

let b1 = b as object    // error
let b2 = b as {}        // valid!!!!
let b3 = b as Object    // valid!!!!

let c1 = c as object    // error
let c2 = c as {}        // valid!!!!
let c3 = c as Object    // valid!!!!

```

```ts
// перекрытие типов

type Color = 'red';

if(1) {
    type Color = 'blue';
}
```

***Типы перегруженных функций***

```ts

// сокращенная сигнатура вызова
type Log = (message: string, useId?: string) => void;

// полная сигнатура вызова
type Log = {
    (message: string, userId?: string): void
};

// пример перегрузки
type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
}

// тогда вызов будет
let reserve: Reserve = (from: Date, toOrDestination: Date | string, destination?: string) {
    ...
}

type CreateElement = {
    (tag: 'a'): HTMLAnchorElement
    (tag: 'canvas'): HTMLCanvasElement
    (tag: 'table'): HTMLTableElement
    (tag: string): HTMLElement
}

// функция как объект, тогда могут быть св-ва
type WarnUser = {
    (warning: string): void
    wasCalled: boolean
}

function warnUser(warning) {
    warnUser.wasCalled = true;
}

```

***Параметр обобщенного типа (параметр полиморфного типа)*** замещающий тип, используемый для применения ограничений на уровне типов в нескольких местах.

```ts
// T определяется типом аргумента, при вызове функции
type Filter = {
    <T>(array: T[], fn: (item: T) => boolean): T[]
}

// диапазон T ограничен псевдониом типа, при вызове функции нужно указать тип явно
type Filter<T> = {
    (array: T[], fn: (item: T) => boolean): T[]
}

type MyEvent<T> = {
    target: T
    type: string
}

```

***Псевдонимы типов, интерфейсы, абстрактные классы***

* Псевдоним типа - правая часть может быть любого типа, включая выражения типа и возможно & или |  
Интерфейс - должен быть формой, нельзя выразить с помощью интерфейсов:

```ts
type A = number;
type B = A | string;
```

* При расширении интерфейса TS проверяет совместимость с расширением:

```ts
interface A {
    good(x: number): string;
    bad(x: number): string;
}

interface B extends A {
    good(x: string | number): string;
    bad(x: string): string;             // Ошибка: тип 'number' несовместим с типом 'string'
}
```

но при пересечении подобных типов ошибки не будет, TS перегрузит сигнатуру для bad:

```ts
type A = {
    good(x: number): string;
    bad(x: number): string;
}

type B = A & {
    good(x: number | string): string;
    bag(x: string): string
}
```

* Несколько интерфейсов с одинаковым именем в одной области автоматически сливаюстя, а несколько псевдонимов с одинаковым именем вызовут ошибку компиляции

```ts
type User = {
    name: string;
}

// Ошибка: повторяющийся идентификатор User
type User = {
    age: number;
}

interface User {
    name: string;
}
...
interface User {
    age: number;
}

// User { name: string; age: number}

let a: User = {
    name: 'John';
    age: 30;
}
```

`При слиянии интерфейсов проверяются свойства! (проверяется не только совместимость типов но и их идентичность)`

```ts
interface User<Age extends string> {    // Error
    age: Age
}

interface User<Age extends number> {
    age: Age
}
```

***Interface and Abstract class***

Интерфейс - способ моделирования формы. На уровне значений это объект, массив, функция, класс или экз.класса. Он не формирует JS код.  
Абстрактынй класс - моделирует только класс. Формирует код среды выполнения, явлющиеся классом. Он имеет конструкторы, обеспечивает предустановленные реализации и устанавливать модификаторы св-в.

***Класс объявляет как значения так и типы***

```ts
type State = {
    [key: string]: string
}

class StringDB {
    state: State;
    constructor(/* ...args  */) {}
    get(key: string): string | null {
        ...
    }
    set(key: string, value: string): void {
        ...
    }
    static from (state: State) {
        let db = new StringDB;
        ...
        return db;
    }
}

// генерируемые типы:
// экземпляр класса
interface StringDB {
    state: State;
    get(key: string): string | null;
    set(key: string, value: string): void
}
// тип конструктора
interface StringDBConstructor {
    new(/* ...args  */): StrinigDB;
    from(state: State): StringDB;
}


```
