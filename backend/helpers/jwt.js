const jwt = require("jsonwebtoken");

function createToken(payload) {
  return jwt.sign(payload, "shhhhh");
}

module.exports = { createToken };
