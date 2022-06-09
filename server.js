const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("./passport");
const { readFileSync } = require("fs");

const app = express();

app.get("/login", (req, res) => {
  const secret = readFileSync("./id_rsa_priv.pem", "utf-8");
  const token = jwt.sign({ foo: "bar" }, secret, {
    algorithm: "RS256",
    expiresIn: "1d",
  });
  res.status(200).send({
    your_token: token,
  });
});

app.get(
  "/protected-route",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send({
      status: "Protected API is live",
    });
  }
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
