const express = require("express");
const { CartController } = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.get("/", CartController.GetAllBooksInCart);
cartRouter.post("/", CartController.addBookToCart);
cartRouter.delete("/:id", CartController.RemoveBookFromCart);

module.exports = cartRouter;
