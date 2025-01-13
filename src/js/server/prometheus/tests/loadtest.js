import http from "k6/http";
import { sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 50 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const url = "http://host.docker.internal:5000/api/check";

  const response = http.get(url);
  sleep(1);
}
