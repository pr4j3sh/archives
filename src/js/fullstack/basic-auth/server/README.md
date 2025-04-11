This is a demonstration showcasing why basic auth + http are a bad combo.

- register

```bash
curl -X POST localhost:5000/register -H 'Content-Type: application/json' -d '{"username":"john","password":"123456"}'
```

- profile

```bash
curl localhost:5000/profile -H 'Authorization: Basic john:123456'
```

Go open wireshark and check loopback packets. Can you sniff username and password.

> Use HTTPS, be safe.
