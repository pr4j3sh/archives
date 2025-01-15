# Express

This is an express js template, pre-integrated with Loki, Promtail and Grafana, so that you can focus on monitoring logs of API(s).

## Usage

```bash
cp .env.example .env
```

- Run loki

```bash
docker run --name loki -d -v $(pwd):/mnt/config -p 3100:3100 grafana/loki:3.2.1 -config.file=/mnt/config/loki-config.yaml
```

- Run server

```bash
npm run dev
```

- Run promtail

```bash
docker run --name promtail -d -v $(pwd):/mnt/config -v ./log/:/var/log --link loki grafana/promtail:3.2.1 -config.file=/mnt/config/promtail-config.yaml
```

- Run grafana

```bash
docker run -d --name=grafana -p 5002:3000 grafana/grafana
```

> Go to [http://localhost:5002](http://localhost:5002)
> username: admin
> password: admin

- `Home` > `Connections` > `Data Source` > `Add New Source` > `Loki`
- `Home` > `Explore` > `Loki` > `Label: job = Value: demo`

## References

- [ExpressJs Documentation](https://expressjs.com/en/starter/hello-world.html)
- [@pr4j3sh/frames](https://github.com/pr4j3sh/frames)
