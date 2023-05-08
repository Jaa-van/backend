const { Posts } = require("../models");

class PostsRepository {
  //게시글 작성
  createPost = async (userId, title, subject, location, imageUrl, content) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      subject,
      location,
      imageUrl,
      content,
    });

    return createPostData;
  };

  //게시글 전체조회
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll();

    return posts;
  };

  //게시글 상세 조회
  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);
    console.log(post, "repo 임");
    return post;
  };
  //게시글이 없으면 post=null

  //게시글 수정
  putPost = async (postId, title, subject, location, imageUrl, content) => {
    const existsPost = await Posts.findByPk(postId);
    console.log(existsPost);

    existsPost.title = title;
    existsPost.subject = subject;
    existsPost.location = location;
    existsPost.imageUrl = imageUrl;
    existsPost.content = content;

    await existsPost.save();
    return existsPost;
  };

  // const updatedPost = await Posts.update(
  //   { title, content },
  //   { where: { postId } }

  //게시글 삭제
  deletePost = async (postId) => {
    const existpost = await Posts.destroy({ where: { postId } });
    return existpost;
  };
}

module.exports = PostsRepository;
