const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) console.error(err);
  conn.createChannel((err, ch) => {
    if (err) console.error(err);
    const q = "msgs";

    ch.assertQueue(q, { durable: false });

    ch.consume(
      q,
      (msg) => {
        console.log(`recieved msg -> ${msg.content.toString()}`);
      },
      { noAck: true },
    );
  });
});
