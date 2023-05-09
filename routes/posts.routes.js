const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const authMiddleware = require("../middlewares/auth-middleware");
const postsController = new PostsController();
//여기까지 쭉 파일을 다 읽어온 후에

//게시글 작성하기 api/posts
router.post("/", postsController.createPost); // remove authMiddleware for frontend test

//모든 게시물 가져오기 api/posts
router.get("/", postsController.getPosts); // authMiddleware 제거

//특정 게시물 가져오기
router.get("/:postId", postsController.getPost); // authMiddleware 제거

//게시물 수정하기
router.put("/:postId", postsController.putPost); // remove authMiddleware for frontend test

//게시물 삭제하기
router.delete("/:postId", postsController.deletePost); // remove authMiddleware for frontend test

module.exports = router;
