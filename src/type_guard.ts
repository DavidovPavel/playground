// function isString(a: unknown): boolean {
//   return typeof a === 'string';
// }

/**
 * Исправленно, добавленно в return {a is string}
 *
 * @param {unknown} a
 * @returns {a is string}
 */
function isString(a: unknown): a is string {
    return typeof a === 'string';
  }

function parseInput(input: string | number) {
  let formatedInput: string;
  if (isString(input)) {
    formatedInput = input.toUpperCase();
    // Property 'toUpperCase' does not exist on type 'string | number'.
    // Property 'toUpperCase' does not exist on type 'number'.ts(2339)
  }
}
