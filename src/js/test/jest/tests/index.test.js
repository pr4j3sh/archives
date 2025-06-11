const add = require("../index.js");

test("add 1+2 to equal 3", () => {
  const res = add(1, 2);
  expect(res).toBe(3);
});
