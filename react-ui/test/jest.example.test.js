/* global expect, test */


test('expected to pass', () => {
  expect(3).toBe(3);
});

test('expected to fail', () => {
  expect(3).toBe(2);
});
