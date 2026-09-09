# mongo

- Run non-stopping persistent mongo db via docker

```bash
docker run -d --name mongo --restart unless-stopped -p 27017:27017 -v mongo-db:/data/db mongo:latest
```

- Use client

```bash
docker exec -it mongo mongosh
```
