// let a = 1 + 2;
// let b = a + 3;
// let c = {
//     apple: a,
//     banana: b
// };
// let d = c.apple * 4;

// let a = 1024;
// let b = 'apples and oranges';
// const c = 'pineapples';
// let d = [true, true, false];
// let e = {type: 'focus'};
// let f = [1, false];
// const g = [3];
// let h = null;


interface Person {
    name: string;
}

interface Lifespan {
    birth: Date;
    death?: Date;
}

type PersonSpan = Person & Lifespan;

const ps: PersonSpan  = {
    name: 'Alan',
    birth: new Date('1921/06/23'),
}

type Kz = keyof PersonSpan;

type T = Exclude<string | Date, string | number>;