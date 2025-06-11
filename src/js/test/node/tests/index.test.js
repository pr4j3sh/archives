const { test } = require("node:test");
const assert = require("node:assert");
const greet = require("../index.js");

test("greet", () => {
  const res = greet("nathe");
  assert.equal(res, "Hello nathe");
});
