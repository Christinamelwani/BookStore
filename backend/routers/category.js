const express = require("express");
const { CategoryController } = require("../controllers/category");
const categoryRouter = express.Router();

categoryRouter.post("/", CategoryController.add);
categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getBooks);
categoryRouter.post(
  "/:categoryId/book/:bookId",
  CategoryController.addBookToCategory
);

module.exports = categoryRouter;
