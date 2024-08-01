const calc = {
  a: 2,
  b: 3,
  add: function () {
    return this.a + this.b;
  },
  subtract: function () {
    return this.a - this.b;
  },
  multiply: function () {
    return this.a * this.b;
  },
  divide: function () {
    return this.a / this.b;
  },
  update_a: function (a) {
    this.a = a;
  },
  update_b: function (b) {
    this.b = b;
  },
};

module.exports = calc;
