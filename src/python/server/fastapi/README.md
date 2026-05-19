# http

- view http message

```bash
curl -v http://127.0.0.1:8000
```

- view request body as well

```bash
curl --trace -   -H "Content-Type: application/json"   -d '{"username":"4j3.dev"}'   http://127.0.0.1:8000/
```

- view tcp handshake message

```bash
sudo tcpdump -i lo -nnvvXSs 0 tcp port 8000
```
