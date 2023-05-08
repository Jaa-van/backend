const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes.controller");
const authMiddleware = require("../middlewares/auth-middleware");
const likesController = new LikesController();

// 좋아요 수정하기
router.put("/:postId/like", authMiddleware, likesController.putLikes);
router.get("/", likesController.getLikes);

module.exports = router;
