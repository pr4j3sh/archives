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

- Generate certificate

```bash
openssl req -x509 -newkey rsa:4096 \
-keyout key.pem \
-out cert.pem \
-days 365 \
-nodes
```

- run as https

```bash
uvicorn main:app --ssl-keyfile=key.pem --ssl-certfile=cert.pem
```
