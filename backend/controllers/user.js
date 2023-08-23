const { User } = require("../models");
const { hashPassword, compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class UserController {
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
        throw { message: "Email or password is incorrect!" };
      }

      const passwordMatches = compareHash(password, user.password);

      if (!passwordMatches) {
        throw { message: "Email or password is incorrect!" };
      }

      const token = createToken({ username: user.username, email: user.email });

      res.status(200).json({ status: 201, data: token });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { UserController };
