const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const userController = require("./controllers/user.controller");
const profilepicController = require("./controllers/profilepic.controller");
const postController = require("./controllers/post.controller");
const reactionController = require("./controllers/reaction.controller");
const commentController = require("./controllers/comment.controller");



app.use("/users", userController);
app.use("/profilepic", profilepicController);
app.use("/post", postController);
app.use("/reaction", reactionController);
app.use("/comment", commentController);

module.exports = app;