const { test, describe } = require('node:test');
const assert = require('node:assert');
const calc = require('../src/index.js');

describe('Calculator Functions', () => {
  test('add: 2 + 3 = 5', () => {
    assert.strictEqual(calc.add(2, 3), 5);
  });

  test('add: negative numbers', () => {
    assert.strictEqual(calc.add(-2, -3), -5);
  });

  test('subtract: 5 - 2 = 3', () => {
    assert.strictEqual(calc.subtract(5, 2), 3);
  });

  test('subtract: with negatives', () => {
    assert.strictEqual(calc.subtract(2, 5), -3);
  });

  test('multiply: 3 * 4 = 12', () => {
    assert.strictEqual(calc.multiply(3, 4), 12);
  });

  test('multiply: with zero', () => {
    assert.strictEqual(calc.multiply(5, 0), 0);
  });

  test('divide: 10 / 2 = 5', () => {
    assert.strictEqual(calc.divide(10, 2), 5);
  });

  test('divide: by zero throws error', () => {
    assert.throws(() => calc.divide(10, 0), /Division by zero/);
  });

  test('divide: decimal result', () => {
    assert.strictEqual(calc.divide(5, 2), 2.5);
  });
});
