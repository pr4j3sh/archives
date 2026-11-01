this is regarding [issue](https://github.com/eslint/eslint/issues/20014)

- run

```bash
# cmd
npx eslint index.js
```

```bash
# output
/home/prajesh/Documents/archives/src/js/linter/eslint/index.js
  1:13  error  'var_name' was used before it was defined                              no-use-before-define
  3:5   error  The value assigned to 'var_name' is not used in subsequent statements  no-useless-assignment

✖ 2 problems (2 errors, 0 warnings)
```

```bash
# cmd
node index.js
```

```bash
# output
/home/prajesh/Documents/archives/src/js/linter/eslint/index.js:1
console.log(var_name);
            ^

ReferenceError: Cannot access 'var_name' before initialization
    at Object.<anonymous> (/home/prajesh/Documents/archives/src/js/linter/eslint/index.js:1:13)
    at Module._compile (node:internal/modules/cjs/loader:1934:14)
    at Object..js (node:internal/modules/cjs/loader:2074:10)
    at Module.load (node:internal/modules/cjs/loader:1656:32)
    at Module._load (node:internal/modules/cjs/loader:1448:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v26.7.0
```

```bash
npx eslint issue.ts
```

```bash
# output
```

```bash
node issue.md
```

```bash
# output
file:///home/prajesh/Documents/archives/src/js/linter/eslint/issue.ts:14
  console.log(`blah: ${a}`);
                       ^

ReferenceError: Cannot access 'a' before initialization
    at file:///home/prajesh/Documents/archives/src/js/linter/eslint/issue.ts:14:24
    at TestFunction (file:///home/prajesh/Documents/archives/src/js/linter/eslint/issue.ts:5:17)
    at Object.<anonymous> (file:///home/prajesh/Documents/archives/src/js/linter/eslint/issue.ts:12:11)
    at Module._compile (node:internal/modules/cjs/loader:1934:14)
    at Object..js (node:internal/modules/cjs/loader:2074:10)
    at Module.load (node:internal/modules/cjs/loader:1656:32)
    at Module._load (node:internal/modules/cjs/loader:1448:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47

Node.js v26.7.0
```
