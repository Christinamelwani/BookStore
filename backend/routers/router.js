const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const bookRouter = require("./book");
const categoryRouter = require("./category");
const cartRouter = require("./cart");

router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/category", categoryRouter);
router.use("/cart", cartRouter);

module.exports = router;
