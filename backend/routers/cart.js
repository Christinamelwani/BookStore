const express = require("express");
const { CartController } = require("../controllers/cart");
const cartRouter = express.Router();

cartRouter.get("/", CartController.getAllBooksInCart);
cartRouter.post("/", CartController.addBookToCart);
cartRouter.delete("/", CartController.emptyCart);
cartRouter.delete("/:id", CartController.removeBookFromCart);

module.exports = cartRouter;
