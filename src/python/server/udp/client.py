import socket


HOSTNAME = "127.0.0.1"
PORT = 8000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

sock.sendto(b"hello world", (HOSTNAME, PORT))
