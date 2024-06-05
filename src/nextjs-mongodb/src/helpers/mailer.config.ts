import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export async function sendMail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

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
      html: `<p>Click on the link below to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.<br><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</a></p>`,
    };

    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
