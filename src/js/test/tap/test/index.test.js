const t = require("tap");
const add = require("../index.js");

for (let index = 0; index < 1000; index++) {
  t.test("adds two numbers", (t) => {
    const res = add(1, 2);
    t.equal(res, 3, "this passes");
    t.end();
  });
}
