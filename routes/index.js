const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const postsRouter = require("./posts.routes");
const commentsRouter = require("./comments.routes");
const likesRouter = require("./likes.routes");

module.exports = router;
