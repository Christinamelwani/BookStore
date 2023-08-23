const express = require("express");
const { BookController } = require("../controllers/book");
const bookRouter = express.Router();

bookRouter.post("/", BookController.add);
bookRouter.get("/", BookController.getAll);
bookRouter.get("/:id", BookController.getOne);
bookRouter.put("/:id", BookController.update);
bookRouter.delete("/:id", BookController.delete);
bookRouter.post("/:id/restock", BookController.restock);

module.exports = bookRouter;
