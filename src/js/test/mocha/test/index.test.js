const assert = require("node:assert");
const add = require("../index.js");

for (let index = 0; index < 10; index++) {
  describe("add()", function () {
    it("should return 3 when args passed are 1 and 2", function () {
      const res = add(1, 2);
      assert.equal(res, 3);
    });
  });
}
