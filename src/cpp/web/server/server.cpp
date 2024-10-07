#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include <iostream>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;

void handler_get(http_request req) {
  json::value res;

  if (req.request_uri().path() == U("/api/read")) {
    res[U("message")] = json::value::string(U("server online"));
    req.reply(status_codes::OK, res);
  } else {
    res[U("error")] =
        json::value::string(req.request_uri().path() + U(" not found"));
    req.reply(status_codes::NotFound, res);
  }
}

void handler_post(http_request req) {
  json::value res;

  if (req.request_uri().path() == U("/api/create")) {
    req.extract_json()
        .then([=](json::value body) {
          json::value res;
          res[U("body")] = body;
          req.reply(status_codes::OK, res);
        })
        .wait();
  } else {
    res[U("error")] =
        json::value::string(req.request_uri().path() + U(" not found"));
    req.reply(status_codes::NotFound, res);
  }
}

void handler_put(http_request req) {
  json::value res;
  auto path = req.request_uri().path();

  vector<utility::string_t> path_segments = uri::split_path(uri::decode(path));

  if (path_segments.size() == 3 && path_segments[0] == U("api") &&
      path_segments[1] == U("update")) {
    auto id = path_segments[2];

    req.extract_json()
        .then([=](json::value body) {
          json::value res;
          res[U("id")] = json::value::string(id);
          res[U("body")] = body;
          req.reply(status_codes::OK, res);
        })
        .wait();
  } else {
    res[U("error")] = json::value::string(path + U(" not found"));
    req.reply(status_codes::NotFound, res);
  }
}

void handler_del(http_request req) {
  json::value res;
  auto path = req.request_uri().path();

  vector<utility::string_t> path_segments = uri::split_path(uri::decode(path));

  if (path_segments.size() == 3 && path_segments[0] == U("api") &&
      path_segments[1] == U("delete")) {
    auto id = path_segments[2];
    res[U("id")] = json::value::string(id);
    req.reply(status_codes::OK, res);
  } else {
    res[U("error")] = json::value::string(path + U(" not found"));
    req.reply(status_codes::NotFound, res);
  }
}

int main(int argc, char *argv[]) {
  uri_builder uri(U("http://127.0.0.1:8000"));
  auto addr = uri.to_uri().to_string();
  http_listener listener(addr);

  listener.support(methods::GET, handler_get);
  listener.support(methods::POST, handler_post);
  listener.support(methods::PUT, handler_put);
  listener.support(methods::DEL, handler_del);

  try {
    listener.open()
        .then([&listener]() {
          cout << "server running @ " << listener.uri().to_string() << endl;
        })
        .wait();

    string line;
    getline(cin, line);
  } catch (const exception &e) {
    cerr << "server error: " << e.what() << endl;
  }
  return 0;
}
