class Queue {
  constructor() {
    this.structure = [];
  }
  empty() {
    return this.structure.length === 0 ? true : false;
  }
  size() {
    return this.structure.length;
  }
  front() {
    return this.structure[0];
  }
  back() {
    return this.structure[this.size() - 1];
  }
  push(val) {
    this.structure.push(val);
    return;
  }
  pop() {
    this.structure.shift();
  }
}

let s = new Queue();
console.log({ s });
console.log({ isEmpty: s.empty() });
s.push(1);
s.push(2);
s.push(3);
s.push(4);
s.push(5);
console.log({ s });
while (!s.empty()) {
  console.log(s.front());
  s.pop();
}
console.log({ s });
