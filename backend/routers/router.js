const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const bookRouter = require("./book");
const categoryRouter = require("./category");

router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/category", categoryRouter);

module.exports = router;
