const { User } = require("../models");
const { hashPassword, compareHash } = require("../helpers/bcrypt");
const { createToken, unloadToken } = require("../helpers/jwt");

class UserController {
  static async sendData(req, res, next) {
    try {
      const { access_token } = req.headers;

      const payload = unloadToken(access_token);

      const user = await User.findByPk(payload.id);

      if (!user) {
        throw { message: "User not found!" };
      }

      res.status(200).json({ status: 200, data: user });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, password, email, isAdmin } = req.body;
      const hash = hashPassword(password);

      const newUser = await User.create({
        username,
        password: hash,
        email,
        isAdmin,
      });

      res.status(201).json({ status: 201, data: newUser });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Email or password is incorrect" };
      }

      const passwordMatches = compareHash(password, user.password);

      if (!passwordMatches) {
        throw { name: "Email or password is incorrect" };
      }

      const token = createToken({
        id: user.id,
        username: user.username,
        email: user.email,
      });

      res.status(200).json({ status: 200, access_token: token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { UserController };
