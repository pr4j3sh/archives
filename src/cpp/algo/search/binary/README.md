# binary

Binary search experiment.

## Build

```sh
g++ -g -o main main.cpp
```

`-g` adds debugging symbols for gdb.

## Run

```sh
./main
```

## Debug with gdb

```sh
gdb ./main
```

Useful gdb commands:

```gdb
break bs
run
next
print i
print m
continue
```

Or run a batch session non-interactively:

```sh
gdb -batch -ex 'break bs' -ex 'run' -ex 'print i' -ex 'print m' ./main
```
