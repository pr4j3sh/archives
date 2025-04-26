# backgroud job for sending emails

## usage

- run server

```bash
npm run serve
```

- create an `.env` file with resend api key in it

```.env

API_KEY=resend_api_key

```

- run worker

```bash
npm run work
```

- make a registration request

```bash
curl -X POST localhost:5000/api/auth/register -H 'Content-Type: application/json' -d '{"email":"test@example.com","password":"123456"}'
```
