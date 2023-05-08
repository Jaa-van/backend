const LikesRepository = require("../repositories/likes.repository");

class LikesService {
  likesRepository = new LikesRepository();
  putlike = async (postId, userId) => {
    const existsPost = await this.likesRepository.findOnePost(postId);
    if (!existsPost) throw new Error("404/게시글이 존재하지 않습니다.");
    const updatedLike = await this.likesRepository.updateLikeDb(postId, userId);
    if (updatedLike == "likesCreate") {
      await this.likesRepository.addLikesAtPost(postId);
      return "게시글의 좋아요를 등록하였습니다.";
    } else {
      await this.likesRepository.dropLikesAtPost(postId);
      return "게시글의 좋아요를 취소하였습니다.";
    }
  };

  getlikes = async () => {
    const allPostsLiked = await this.likesRepository.findAllPosts();

    allPostsLiked.sort((a, b) => {
      return b.likes - a.likes;
    });
    return allPostsLiked.map((post) => {
      return {
        postId: post.postId,
        title: post.title,
        likes: post.likes,
      };
    });
  };
}

module.exports = LikesService;
