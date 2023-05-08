const CommentsService = require("../services/comments.service");

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

  getComments = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.commentsService.findOnePost(postId);

    if (!post) {
      throw new Error("404/게시글이 존재하지 않습니다.");
    }

    try {
      const result = await this.commentsService.commentsOfPost(postId);
      return res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      throw new Error("400/댓글 조회에 실패하였습니다.");
    }
  };

  // 댓글 수정

  updateComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { comment } = req.body;
    const post = await this.commentsService.findOnePost(postId);
    const commentOfPost = await this.commentsService.findOneComment(commentId);

    try {
      if (!post) {
        throw new Error("404/게시글이 존재하지 않습니다.");
      }

      if (userId !== post.UserId) {
        throw new Error("403/댓글의 수정 권한이 존재하지 않습니다.");
      }
      if (!commentOfPost) {
        throw new Error("404/댓글이 존재하지 않습니다.");
      }

      if (!comment) {
        throw new Error("412/데이터 형식이 올바르지 않습니다.");
      }

      await this.commentService.updateComment(comment, commentId);
      return res.status(200).json({ message: "댓글을 수정하였습니다." });
    } catch (error) {
      console.error(error);
      throw new Error("404/댓글이 존재하지 않습니다.");
    }
  };

  // 댓글 삭제

  deleteComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const post = await this.commentService.findOnePost(postId);
    const commentOfPost = await this.commentService.findOneComment(commentId);
    try {
      if (!post) {
        throw new Error("404/게시글이 존재하지 않습니다.");
      }

      if (userId !== post.UserId) {
        throw new Error("403/댓글의 삭제 권한이 존재하지 않습니다.");
      }
      if (!commentOfPost) {
        throw new Error("404/댓글이 존재하지 않습니다.");
      }

      await this.commentService.deleteComment(commentId);
      return res.status(200).json({ message: "댓글을 삭제하였습니다." });
    } catch (error) {
      console.error(error);
      throw new Error("400/댓글 삭제에 실패하였습니다.");
    }
  };
}

module.exports = CommentsController;
