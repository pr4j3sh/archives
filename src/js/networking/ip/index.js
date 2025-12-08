// setting ip address size to be of 4 bits
const ADDRESS_SIZE = 4;

// device
class Device {
  constructor(address) {
    this.address = new Address(address).validate();
    this.messages = [];
  }

  add(msg) {
    this.messages.push(msg);
  }
}

// address
class Address {
  constructor(value) {
    this.value = value;
  }

  // makes sure the address is 4 bits
  validate() {
    if (this.value < 0 || this.value > 9) {
      console.error(`invalid address: ${this.value}`);
      process.exit(1);
    } else {
      return this;
    }
  }

  // converts and resizes address to 4 bits
  toBinary() {
    let bin = this.value.toString(2);
    let l = bin.length;
    if (l < ADDRESS_SIZE) {
      for (let index = l; index < ADDRESS_SIZE; index++) {
        bin = "0" + bin;
      }
    }
    return bin;
  }
}

// payload - assuming to be a number only
class Payload {
  constructor(data) {
    this.value = data;
  }

  toBinary() {
    return this.value.toString(2);
  }
}

// packet
class Packet {
  constructor(src, dst, payload) {
    this.src = src;
    this.dst = dst;
    this.payload = payload;
  }
}

// device a
a = new Device(2);
console.log({ a });

// device b
b = new Device(5);
console.log({ b });

// payload to send
data = new Payload(11);
console.log({ data });

// packet to transfer
p = new Packet(a, b, data);
console.log({ p });

// communication channel
class Comm {
  constructor(pkts) {
    this.pkts = pkts;
  }

  // sends messages based on pkt information
  send() {
    this.pkts.forEach((pkt) => {
      pkt.dst.add(pkt.payload);
    });
  }

  // shows the packet string
  show() {
    let s = "";
    this.pkts.forEach((pkt) => {
      s +=
        pkt.src.address.toBinary() +
        pkt.dst.address.toBinary() +
        pkt.payload.toBinary();
    });
    return s;
  }
}

// creating a channel
conn = new Comm([p]);
console.log({ conn });

// sending messages
conn.send();

console.log({ a });
console.log({ b });

// displaying the bits transferred
console.log(conn.show());
