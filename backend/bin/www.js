const express = require("express");
const cors = require("cors");
const { errorHandler } = require("../middlewares/errorhandler");
const router = require("../routers/router");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

module.exports = { app };
