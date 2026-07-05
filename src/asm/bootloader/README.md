# bootloader

experimenting and writing a bootloader to know how it works

- compile

```bash
nasm -f bin ./boot.asm -o ./boot.bin
```

- run with qemu

```bash
qemu-system-x86_64 -hda ./boot.bin
```
