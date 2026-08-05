class Stack {
  constructor() {
    this.structure = [];
  }
  empty() {
    return this.structure.length === 0 ? true : false;
  }
  size() {
    return this.structure.length;
  }
  top() {
    return this.structure[this.size() - 1];
  }
  push(val) {
    this.structure.push(val);
    return;
  }
  pop() {
    this.structure.pop();
  }
}

let s = new Stack();
console.log({ s });
console.log({ isEmpty: s.empty() });
s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.push(5);
console.log({ s });
while (!s.empty()) {
  console.log(s.top());
  s.pop();
}
console.log({ s });
