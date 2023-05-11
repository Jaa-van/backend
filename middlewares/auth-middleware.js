const jwt = require("jsonwebtoken");
const { Users } = require("../models");
require("dotenv").config();
const env = process.env;

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization ?? "").split(" ");
  console.log(authType, authToken);
  if (authType !== "Bearer" || !authToken) {
    res.status(403).json({ errorMessage: "로그인이 필요한 기능입니다." });
    return;
  }

  try {
    const { userId } = jwt.verify(authToken, env.DB_KEY);
    const user = await Users.findOne({
      where: { userId: userId },
    });
    res.locals.user = user;

    next();
  } catch (error) {
    console.error(error);
    res
      .status(403)
      .json({ errorMessage: "전달된 쿠키에서 오류가 발생하였습니다." });
    return;
  }
};
