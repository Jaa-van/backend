const { Posts, Users, Likes } = require("../models");
const { Op } = require("sequelize");

class LikesRepository {
  findOnePost = async (postId) => {
    const post = await Posts.findOne({
      where: { postId },
    });
    return post;
  };

  updateLikeDb = async (postId, userId) => {
    const existsLikesByUser = await Likes.findOne({
      where: {
        [Op.and]: [{ PostId: postId }, { UserId: userId }],
      },
    });
    if (existsLikesByUser) {
      await Likes.destroy({
        where: {
          [Op.and]: [{ PostId: postId }, { UserId: userId }],
        },
      });

      return "likesDestroy";
    } else {
      await Likes.create({
        PostId: postId,
        UserId: userId,
      });
      return "likesCreate";
    }
  };

  addLikesAtPost = async (postId) => {
    const incrementLikes = await Posts.increment("likes", {
      where: { postId },
    });
    return incrementLikes;
  };

  dropLikesAtPost = async (postId) => {
    const decrementLikes = await Posts.decrement("likes", {
      where: { postId },
    });
    return decrementLikes;
  };

  findAllPosts = async () => {
    const allLikes = await Posts.findAll({
      attributes: ["postId", "title", "likes"],
    });
    return allLikes;
  };
}
module.exports = LikesRepository;
