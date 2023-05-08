const { Users } = require("../models");

class UserRepository {

    existUsers = async ( nickname ) => {
        const existUsers = await Users.findOne( {where : {nickname}} );
    }

    signup = async ( email, nickname, password ) => { 
        const signup = await Users.create({ email, nickname, password }); 
        return signup;
    };

    login = async ( email ) => {
        const login = await Users.findOne({ where: { email } });
        return login;
    };

};

module.exports = UserRepository;