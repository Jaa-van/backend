const CommentsService = require("../servies/comments.service");

class CommentsController {
  commentsService = new CommentsService();
}

module.exports = CommentsController;
