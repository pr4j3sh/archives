```bash
npm run dev
```

```bash
curl localhost:5000
```

> returns uri, and displays qr in terminal

- Scan QR with an authenticator app

```bash
curl -X POST http://localhost:5000/validate -H "Content-Type: application/json" -d '{"token":"<otp>"}'
```

> enter the otp as token payload
