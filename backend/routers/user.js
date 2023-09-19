const express = require("express");
const { UserController } = require("../controllers/user");
const userRouter = express.Router();

// define the home page route

//Validate user and return user data:
userRouter.get("/", UserController.sendData);

//Login and register:
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

module.exports = userRouter;
