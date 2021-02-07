/**
 * Указываем что конструктор это нечто созданное с new с любы числом аргументов
 */
type ClassConstructor<T> = new (...args: any[]) => T;

/**
 * Примесь - паттерн, позволяющий примешивать поведения и свойства в класс
 * * Имеет состояние
 * * Предоставляет только конкретные методы (не абстрактные)
 * * Имеет конструкторы, вызываются в том же порядке в котором их классы были примешанны
 */
function withEZDebug<C extends ClassConstructor<{ getDebugValue(): object }>>(Class: C) {
  // анонимный конструктор класса
  return class extends Class {
    constructor(...args: any[]) {
      super(...args);
    }
    degug() {
      const name = Class.constructor.name;
      const value = this.getDebugValue();
      return `${name} ( ${JSON.stringify(value)} )`;
    }
  };
}

let User = withEZDebug(HardToDebugUser);
let user = new User(3, "Emma", "Whatson");
user.degug();
