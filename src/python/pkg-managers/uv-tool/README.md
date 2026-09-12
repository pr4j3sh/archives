# uv

## dependencies

- initialize a project

```bash
uv init pkg
```

- add dependencies

```bash
uv add requests
```

> no need to create a `.venv`, simply add dependencies, `uv` creates a `.venv` itself

```bash
uv run <package>
uv lock
uv sync
```
> use `run` to use project deps, as they're stored in `uv` managed `.venv`

- add per file dependencies

```bash
uv add --script <path/to/script> requests
```

## tooling

- use `uv` as `pipx`

```bash
uvx pycowsay 'sup'
```

> creates a temp env and installs and runs pkg there

- install a tool using `uv tool`

```bash
uv tool install <tool>
uv tool run <tool>
```

> `uvx` is an alias for `uv tool run`

## manage python

```bash
uv python install <ver>
uv python pin 3.8 # use 3.8
uv python list    # list available
```

## reference

[documentation](https://docs.astral.sh/uv/)

## endnote

hence, all you need is `uv` - for everything python - such a great feat. should have done this earlier.
