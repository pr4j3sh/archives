memory = {
  100: null,
  101: null,
  102: null,
  103: null,
  104: null,
  105: null,
  106: null,
  107: null,
  108: null,
  109: null,
};

class Arr {
  constructor(baseAddress) {
    this.baseAddress = baseAddress;
  }

  add(elements) {
    for (let i = 0; i < elements.length; i++) {
      memory[this.baseAddress + i] = elements[i];
    }
    return this;
  }

  grab(index) {
    let element = memory[this.baseAddress + index];
    console.log(`a[${index}] = ${element}`);
    return element;
  }

  replace(index, element) {
    console.log(`a[${index}] = ${element}`);
    memory[this.baseAddress + index] = element;
  }
}

console.log(memory);

a = new Arr(103);
a.add([1, 2, 3, 4, 5]);
console.log(memory);

a.grab(0);

a.replace(2, 10);
console.log(memory);
