- compile

```bash
nasm -f bin ./boot.asm -o ./boot.bin
```

- run with qemu

```bash
qemu-system-x86_64 -hda ./boot.bin
```
