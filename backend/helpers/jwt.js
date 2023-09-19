const jwt = require("jsonwebtoken");

function createToken(payload) {
  return jwt.sign(payload, "test");
}

function unloadToken(access_token) {
  return jwt.verify(access_token, "test");
}

module.exports = { createToken, unloadToken };
