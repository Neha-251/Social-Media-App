const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const userController = require("./controllers/user.controller");

app.use("/users", userController);


module.exports = app;