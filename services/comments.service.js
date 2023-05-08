const CommentsRepository = require("../repositories/comments.repository");

class CommentsService {
  commentsRepository = new CommentsRepository();

  findOnePost = async (postId) => {
    const post = await this.commentsRepository.findOnePost(postId);

    return post;
  };

  createComment = async (userId, postId, comment) => {
    const createCommentData = await this.commentsRepository.createComment(
      userId,
      postId,
      comment,
    );

    return createCommentData;
  };

  commentsOfPost = async (postId) => {
    const commentsOfPostData = await this.commentsRepository.commentsOfPost(
      postId,
    );

    return commentsOfPostData.map((comment) => {
      return {
        commentId: comment.commentId,
        UserId: comment.UserId,
        comment: comment.comment,
        nickname: comment.User.nickname,
      };
    });
  };

  findOneComment = async (commentId) => {
    const commentOfPost = await this.commentsRepository.findOneComment(
      commentId,
    );
    return commentOfPost;
  };

  updateComment = async (comment, commentId) => {
    const updateCommentData = await this.commentsRepository.updateComment(
      comment,
      commentId,
    );

    return updateCommentData;
  };

  deleteComment = async (commentId) => {
    const deleteCommentData = await this.commentsRepository.deleteComment(
      commentId,
    );

    return deleteCommentData;
  };
}

module.exports = CommentsService;
