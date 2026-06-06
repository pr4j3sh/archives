from config import HOST, PORT
from r import Redis


def main():
    r = Redis(HOST, PORT)
    red = r.connect()

    r.set_value(red, "foo", "bar")
    r.get_value(red, "foo")
    r.delete_value(red, "foo")


if __name__ == "__main__":
    main()
