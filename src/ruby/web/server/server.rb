require 'webrick'
require 'json'

hostname = '127.0.0.1'
port = 8000

server = WEBrick::HTTPServer.new(Port: port, BindAddress: hostname)

server.mount_proc '/api/read' do |_req, res|
  res['Content-Type'] = 'application/json'
  res_body = { message: 'online' }.to_json
  res.body = res_body
end

server.mount_proc '/api/create' do |req, res|
  if req.request_method == 'POST'
    begin
      body = JSON.parse(req.body)
      res['Content-Type'] = 'application/json'
      res_body = { message: 'create', body: body }.to_json
      res.body = res_body
    rescue JSON::ParseError
      res['Content-Type'] = 'application/json'
      res_body = { error: 'invalid json' }.to_json
      res.body = res_body
      res.status = 400
    end
  else
    res['Content-Type'] = 'application/json'
    res_body = { error: 'only POST method allowed' }.to_json
    res.body = res_body
    res.status = 405
  end
end

server.mount_proc '/api/update' do |req, res|
  if req.request_method == 'PUT'
    id = req.path.split('/').last
    begin
      body = JSON.parse(req.body)
      res['Content-Type'] = 'application/json'
      res_body = { message: 'update', body: body, id: id }.to_json
      res.body = res_body
    rescue JSON::ParseError
      res['Content-Type'] = 'application/json'
      res_body = { error: 'invalid json' }.to_json
      res.body = res_body
      res.status = 400
    end
  else
    res['Content-Type'] = 'application/json'
    res_body = { error: 'only PUT method allowed' }.to_json
    res.body = res_body
    res.status = 405
  end
end

trap('INT') { server.shutdown }

puts "server running @ http://#{hostname}:#{port}"
server.start
