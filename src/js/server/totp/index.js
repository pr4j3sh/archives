import express from "express";
import * as OTPAuth from "otpauth";
import QRCode from "qrcode";

const server = express();

const totp = new OTPAuth.TOTP({
  issuer: "eleven",
  label: "pr4j3sh",
  algorithm: "SHA1",
  digits: 6,
  period: 30,
  secret: "secret",
});

function validate(token) {
  const res = totp.validate({ token, window: 1 });
  return res;
}

server.use(express.json());

server.get("/", (req, res) => {
  const uri = totp.toString();

  QRCode.toString(uri, { type: "terminal" }, function (err, url) {
    console.log(url);
  });
  res.json({ uri });
});

server.post("/validate", (req, res) => {
  const { token } = req.body;
  if (validate(token) !== null) res.json({ message: "logged in" });
  res.json({ message: "error" });
});

server.listen(5000, () => {
  console.log("server running @ 5000");
});
