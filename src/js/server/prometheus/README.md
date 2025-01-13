# Express

This is an express js server with prometheus for monitoring.

## Usage

- Run using `dev`

```bash
npm run dev
```

- config file for the prometheus server

```bash
docker run -d --name=prometheus -v ./prometheus.yml:/etc/prometheus/prometheus.yml -p 5001:9090 prom/prometheus
```

> Go to [http://localhost:5001](http://localhost:5001)

- run grafana

```bash
docker run -d --name=grafana -p 5002:3000 grafana/grafana
```

> Go to [http://localhost:5002](http://localhost:5002)
> username: admin
> password: admin

- load testing

```bash
docker run --name k6 -v ./tests:/scripts grafana/k6 run /scripts/loadtest.js
```

## References

- [ExpressJs Documentation](https://expressjs.com/en/starter/hello-world.html)
- [@pr4j3sh/frames](https://github.com/pr4j3sh/frames)
