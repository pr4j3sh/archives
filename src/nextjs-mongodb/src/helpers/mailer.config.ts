import nodemailer from "nodemailer";

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5d6645c3bb483c",
        pass: "ce25e398c2c1b2",
      },
    });

    const mailOptions = {
      from: "prajesh.eleven118@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
      html: "<b>Hello world?</b>",
    };

    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
