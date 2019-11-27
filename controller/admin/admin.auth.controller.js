const JWT = require('jsonwebtoken');
const Users = require('../../models/user/auth');
const {JWT_SECRET} = require('../../config');
signToken = (user) => {
  return JWT.sign({
    iss: 'steppingcloudforadmin',
    sub: user,
    jwtKey: 'steppingcloudsecret',
    algorithm: 'HS256',
    iat: new Date().getTime(),
    exp: new Date().setTime(new Date().getTime() + 900000),
  },
  JWT_SECRET
  );
};
module.exports = {
  signup: async (req, res, next) => {
    let {email, password, userType, userid, companyname} = req.value.body;
    const foundUser = await Users.findOne({email});
    // check if there is a user with the same email
    if (foundUser) {
      res.status(200).send({
        status: 400,
        result: 'email is already in use',
      });
    }
    else {
      userid = userid + Date.now();
      const newUser = new Users({email, password, userType, userid, companyname});
      await newUser.save();
      res.status(200).json({
        status: '200',
        result: 'Signup Successful',
      });
    }
  },
  signin: async (req, res, next) => {
    if (req.user.message == 'Incorrect username') {
      res.status(200).send({
        status: 401,
        result: 'Admin doesn\'t Exist',
      });
    } else if (req.user.message == 'Incorrect password') {
      res.status(200).send({
        status: 401,
        result: 'Incorrect Password',
      });
    } else {
      const token = signToken(req.user.email);
      res.status(200).send({
        status: '200',
        result: 'Login Successful',
        usertype: req.user.userType,
        token: token,
      });
    }
  },
};
