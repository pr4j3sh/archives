function TestFunction<T, U>(array: T[], fn: (elem: T) => U): U[] {
  const output: U[] = [];

  for (const arr of array) {
    output.push(fn(arr));
  }
  return output;
}

const arr = [1, 2];

const a = TestFunction(arr, (T) => {
  // this is a problem
  console.log(`blah: ${a}`);
  return T;
});

console.log(`blah: ${a}`);

// case 1 - detects error
const lol = (() => lol)();
