import socket

HOSTNAME = "127.0.0.1"
PORT = 8000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((HOSTNAME, PORT))

print(f"UDP sever running @ {HOSTNAME}:{PORT}")

while True:
    data, addr = sock.recvfrom(1024)
    print(f"{addr} > {data.decode()}")
