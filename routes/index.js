//routes에 index.js가 갖는 의미가 뭔지?
const express = require("express");
const router = express.Router();

const likesRouter = require("./likes.routes");
const postsRouter = require("./posts.routes");
const commentsRouter = require("./comments.routes");
const userRouter = require("./users.routes");

router.use("/posts/", [postsRouter, likesRouter, commentsRouter]);
router.use("/like", likesRouter);
router.use("/", userRouter);

module.exports = router;
