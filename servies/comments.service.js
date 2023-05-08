const CommentsRepository = require("../repositories/comments.repository");

class CommentsService {
  commentsRepository = new CommentsRepository();

  //
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
}

module.exports = CommentsService;
