const UserService = require("../services/users.service");

class UserController {
  userService = new UserService();

  // 회원가입
  signup = async (req, res, next) => {
    const { email, nickname, password } = req.body;

    try {
      // 닉네임 형식
      const nicknameFilter = /^[A-Za-z0-9]{3,}$/.test(nickname);
      if (!nicknameFilter)
        throw new Error("412/닉네임의 형식이 일치하지 않습니다.");
      // 패스워드 형식
      if (typeof password !== "string")
        throw new Error("412/패스워드 형식이 일치하지 않습니다.");
      // 닉네임 포함된 경우
      if (password.includes(nickname))
        throw new Error("412/패스워드에 닉네임이 포함되어 있습니다.");
      // 닉네임 중복
      const existUsers = await this.userService.existUsers(nickname);
      if (existUsers) throw new Error("412/중복된 닉네임입니다.");

      // 회원가입 성공
      const signup = await this.userService.signup(email, nickname, password);
      return res.status(200).json({ message: "회원 가입에 성공하였습니다." });
    } catch (error) {
      throw new Error(
        error.message || "400/요청한 데이터 형식이 올바르지 않습니다.",
      );
    }
  };

  // 로그인
  login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // 유저 존재하지 않는 경우
      const login = await this.userService.login(email);
      if (!login || password !== login.password)
        throw new Error("412/닉네임 또는 패스워드를 확인해주세요.");

      // 로그인 시 토큰생성
      const tokenmake = await this.userService.tokenmake(login);
      res.cookie("Authorization", `Bearer ${tokenmake}`); // JWT를 Cookie로 할당
      console.log(tokenmake);
      res.status(200).json({ tokenmake }); // JWT를 Body로 할당
      // return res.status(200).json({ message: "로그인에 성공하였습니다." });
    } catch (error) {
      throw new Error(error.message || "400/로그인에 실패하였습니다.");
    }
  };
}

module.exports = UserController;
