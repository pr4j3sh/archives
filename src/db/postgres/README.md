# postgres

- Run non-stopping persistent postgres db via docker

```bash
docker run -d --name postgres --restart unless-stopped -p 5432:5432 -v postgres-db:/var/lib/postgresql -e POSTGRES_USER=test -e POSTGRES_PASSWORD=test -e POSTGRES_DB=test postgres:latest
```

- Use client

```bash
docker exec -it postgres psql -U test -d test
```
