const bcrypt = require("bcrypt");

function hashPassword(password) {
  return bcrypt.hashSync(password, 7);
}

function compareHash(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = { hashPassword, compareHash };
