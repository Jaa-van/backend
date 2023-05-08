const PostsService = require("../services/posts.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postsService = new PostsService(); // Post 서비스 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  //게시글 작성
  createPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { title, subject, location, imageUrl, content } = req.body;

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createPostData = await this.postsService.createPost(
        userId,
        title,
        subject,
        location,
        imageUrl,
        content,
      );

      if (!title || !subject || !location || !imageUrl || !content) {
        throw new Error("412/모든 필드의 값은 필수 값 입니다.");
      }

      if (typeof title !== "string") {
        throw new Error("412/게시글 제목의 형식이 일치하지 않습니다.");
      }

      if (typeof subject !== "string") {
        throw new Error("412/게시글 소개의 형식이 올바르지 않습니다.");
      }

      if (typeof location !== "string") {
        throw new Error("412/게시글 위치의 형식이 올바르지 않습니다.");
      }

      if (typeof imageUrl !== "string") {
        throw new Error("412/이미지 파일 형식이 올바르지 않습니다.");
      }

      if (typeof content !== "string") {
        throw new Error("412/게시글 내용의 형식이 올바르지 않습니다.");
      }
      res
        .status(201)
        .json({ message: "게시글을 작성하였습니다.", createPostData });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "400/게시글작성에 실패하였습니다.");
    }
  };

  //게시글 전체 조회
  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postsService.findAllPost();

    res.status(200).json({ data: posts });
  };

  //게시글 상세 조회
  getPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postsService.findPostById(postId);

      res.status(200).json({ data: post });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "400/게시글작성에 실패했습니다.");
    }
  };

  //게시글 수정
  putPost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { title, subject, location, imageUrl, content } = req.body;

      const existsPost = await this.postsService.findPostById(postId);

      if (!title || !content) {
        throw new Error("412/데이터 형식이 올바르지 않습니다.");
      }

      if (typeof title !== "string") {
        throw new Error("412/게시글 제목의 형식이 올바르지 않습니다.");
      }

      if (typeof content !== "string") {
        throw new Error("412/게시글 내용의 형식이 올바르지 않습니다.");
      }

      if (userId !== existsPost.UserId) {
        console.log(userId, existsPost.UserId);
        throw new Error("403/게시글의 수정 권한이 존재하지 않습니다.");
      }

      //조건을 다 통과했으면 수정
      const putPost = await this.postsService.putPost(
        postId,
        title,
        subject,
        location,
        imageUrl,
        content,
      );
      console.log(putPost);
      return res
        .status(201)
        .json({ message: "게시글을 수정하였습니다.", putPost });
    } catch (error) {
      //여기서 catch 되는건 service에서 보낸거
      console.error(error);
      throw new Error(error.message || "400/게시글 수정에 실패했습니다.");
    }
  };

  //게시글 삭제
  deletePost = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const existsPost = await this.postsService.findPostById(postId);

      if (userId !== existsPost.UserId) {
        throw new Error("403, 게시글 삭제 권한이 없습니다.");
      }
      await this.postsService.deletePost(postId);
      return res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } catch (error) {
      console.error(error);
      throw new Error(error.message || "400/게시글 수정에 실패했습니다.");
    }
  };
}

module.exports = PostsController;
