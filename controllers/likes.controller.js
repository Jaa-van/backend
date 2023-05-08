const LikesService = require("../services/likes.service");

class LikesController {
  likesService = new LikesService();
  putLikes = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { userId } = res.locals.user;

      const like = await this.likesService.putlike(postId, userId);

      res.status(200).json({ message: like });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "400/좋아요 등록에 실패했습니다.");
    }
  };

  getLikes = async (req, res, next) => {
    try {
      const likesList = await this.likesService.getlikes();
      res.status(200).json({ data: likesList });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "400/좋아요 조회에 실패했습니다.");
    }
  };
}

module.exports = LikesController;
