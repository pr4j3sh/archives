const { Worker } = require("bullmq");
const Redis = require("ioredis");
const { Resend } = require("resend");

const conn = new Redis({ maxRetriesPerRequest: null });
const resend = new Resend(`${process.env.API_KEY}`);

const worker = new Worker(
  "emailQueue",
  async (job) => {
    try {
      const { email } = job.data;
      const data = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: [`${email}`],
        subject: "Verify your email, mate",
        html: "This is your chance to verify your email!!",
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  },
  {
    connection: conn,
  },
);
