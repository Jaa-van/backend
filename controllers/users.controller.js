const CommentsService = require("../servies/comments.service");

class CommentsController {
  commentsService = new CommentsService();

  // 댓글 생성
  createComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { comment } = req.body;
    const post = await this.commentsService.findOnePost(postId);

    if (!post) {
      throw new Error("404/게시글이 존재하지 않습니다.");
    }

    if (!comment) {
      throw new Error("400/댓글 내용을 입력해주세요.");
    }

    try {
      await this.commentsService.createComment(userId, postId, comment);
      return res.status(200).json({ message: "댓글을 작성하였습니다." });
    } catch (error) {
      console.error(error);
      throw new Error("400/댓글 작성에 실패하였습니다.");
    }
  };
  // 댓글 조회
}

module.exports = CommentsController;
