# Express

This is an express js server, pre-integrated with Elasticsearch, Logstash, Kibana, for monitoring logs

## Usage

```bash
docker run -d --name elasticsearch -m 1GB -p 5003:9200 docker.elastic.co/elasticsearch/elasticsearch:8.17.0
```

```
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

> copy and save the token and password safely

```bash
docker run -d --name logstash -v ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf -p 5005:5044 docker.elastic.co/logstash/logstash:8.17.0
```

```bash
docker run -d --name kibana -e "ELASTICSEARCH_URL=http://host.docker.internal:5003" -p 5006:5601 docker.elastic.co/kibana/kibana:8.17.0
```

```
docker exec -it kibana /usr/share/kibana/bin/kibana-verification-code
```

> copy and save the code safely

- Run using `dev`

```bash
npm run dev
```

## References

- [ExpressJs Documentation](https://expressjs.com/en/starter/hello-world.html)
- [@pr4j3sh/frames](https://github.com/pr4j3sh/frames)
