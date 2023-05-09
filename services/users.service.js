const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/users.repository");

class UserService {
  userRepository = new UserRepository();

  existUsers = async (nickname) => {
    const existUsers = await this.userRepository.existUsers(nickname);
    return existUsers;
  };

  existEmail = async (email) => {
    const existEmail = await this.userRepository.existEmail(email);
    return existEmail;
  };

  signup = async (email, nickname, password) => {
    const signup = await this.userRepository.signup(email, nickname, password);
    return signup;
  };

  login = async (email) => {
    const login = await this.userRepository.login(email);
    return login;
  };

  tokenmake = async (login) => {
    const token = jwt.sign({ userId: login.userId }, "clo_key");
    return token;
  };
}

module.exports = UserService;
