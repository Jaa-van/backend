const { Users, Comments, Posts } = require("../models");

class CommentsRepository {
  // postId에 해당하는 게시물 찾기
  findOnePost = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  // 댓글 생성
  createComment = async (userId, postId, comment) => {
    const createCommentData = await Comments.create({
      UserId: userId,
      PostId: postId,
      comment,
    });
    return createCommentData;
  };

  // 댓글 조회
  commentsOfPost = async (postId) => {
    const commentsOfPostData = await Comments.findAll({
      attributes: ["comment"],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      where: { postId },
    });
    return commentsOfPostData;
  };
  // 게시글 댓글
  findOneComment = async (commentId) => {
    const commentOfPost = await Comments.findOne({ where: { commentId } });

    return commentOfPost;
  };
  // 댓글 수정
  updateComment = async (comment, commentId) => {
    const updateCommentData = await this.commentRepository.updateComment(
      comment,
      commentId,
    );

    return updateCommentData;
  };
}

module.exports = CommentsRepository;
