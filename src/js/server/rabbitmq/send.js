const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) console.error(err);
  conn.createChannel((err, ch) => {
    if (err) console.error(err);
    const q = "msgs";
    const msg = "hey";

    ch.assertQueue(q, { durable: false });

    for (let index = 0; index < 10; index++) {
      ch.sendToQueue(q, Buffer.from(`${msg} ${index}`));
    }
    console.log("sent msg");
  });

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
