const jwt = require("jsonwebtoken");

const payload = {
  name: "pr4j3sh",
  email: "prajesh.eleven118@gmail.com",
};

const secret = "eleven";
console.log({ message: "current vars", payload, secret });

const token = jwt.sign(payload, secret);
console.log({ token });

jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log({ message: "resulting vars", decoded });
});
