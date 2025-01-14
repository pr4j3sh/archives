# Express

This is an express js server, pre-integrated with Elasticsearch, Logstash, Kibana, for monitoring logs

## Usage

- Create a network

```bash
docker network create elastic
```

- Run Elasticsearch

```bash
docker run --name elasticsearch -e "discovery.type=single-node" --network elastic -m 1GB -p 9200:9200 docker.elastic.co/elasticsearch/elasticsearch:8.17.0
```

- Get the user password

```
docker exec -it elasticsearch /usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic
```

> Copy and paste the password in `logstash.conf`

```conf
input {
  tcp {
    port => 5044
    codec => json
  }
}

filter {
  json {
    source => "message"
    target => "parsed"
  }
}

output {
  elasticsearch {
    hosts => ["https://elasticsearch:9200"]
    ssl => true
    ssl_certificate_verification => false
    user => "elastic"
    password => "<password>"
    index => "winston-logs"
  }
}
```

- Run Logstash

```bash
docker run --name logstash -v ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf --network elastic -p 5044:5044 docker.elastic.co/logstash/logstash:8.17.0
```

- Start server using `dev`

```bash
npm run dev
```

- Create service token

```bash
docker exec elasticsearch /usr/share/elasticsearch/bin/elasticsearch-service-tokens create elastic/kibana kibana
```

- Copy and paste the token in `kibana.yml`

```yml
server.host: "0.0.0.0"
elasticsearch.hosts: ["https://elasticsearch:9200"]
elasticsearch.ssl.verificationMode: "none"
elasticsearch.serviceAccountToken: "<token>"
```

```bash
docker run --name kibana -v ./kibana.yml:/usr/share/kibana/config/kibana.yml --network elastic -p 5601:5601 docker.elastic.co/kibana/kibana:8.17.0
```

> Go to [http://localhost:5601](http://localhost:5601)

`Home` > `Management` > `Stack Management` > `Kibana` > `Data Views`
`Home` > `Discover`

## References

- [ExpressJs Documentation](https://expressjs.com/en/starter/hello-world.html)
- [@pr4j3sh/frames](https://github.com/pr4j3sh/frames)
