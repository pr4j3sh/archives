# redis

- Run non-stopping persistent write to file redis db via docker

```bash
docker run -d --name redis --restart unless-stopped -p 6379:6379 -v redis-db:/data redis:latest redis-server --appendonly yes
```

- Use client

```bash
docker exec -it redis redis-cli
```
