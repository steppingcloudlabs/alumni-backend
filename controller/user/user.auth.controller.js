const JWT = require('jsonwebtoken');
const User = require('../../models/user/auth');
const userServices = require('../../services/user.services.auth');
require('../../validator/passport');
const {JWT_SECRET} = require('../../config');
module.exports = {
  // SIGN UP
  signup: async (req, res, next) => {
    const {email, password, companyname, userid} = req.value.body;
    const foundUser = await User.findOne({email});
    if (foundUser) {
      res.status(200).send({
        status: '200 OK',
        result: 'email is already in use',
      });
    }
    const response = await userServices.username(userid);
    if (response == null) {
      res.status(200).send({
        status: 400,
        result: 'User is not an Alumni',
      });
    }
    else if (response == 'founduser') {
      res.status(200).send({
        status: 400,
        result: 'UserId already Exists',
      });
    }
    else {
      const newUser = new User({email, password, companyname, userid});
      await newUser.save();
      const token = JWT.sign({
        iss: 'steppingcloud',
        sub: newUser._id,
        jwtKey: 'mysecret',
        algorithm: 'HS256',
        iat: new Date().getTime(),
        exp: new Date().setTime(new Date().getTime() + 900000),
      },
      JWT_SECRET);
      res.status(200).send({
        status: 200,
        result: {
          'token': token,
          'firstName': response.first_name_personal_information,
          'lastName': response.last_name_personal_information,
        },
      });
    }
  },

  // SIGN IN
  signin: async (req, res, next) => {
    if (req.user.message == 'Incorrect username') {
      res.status(200).send({
        status: '401',
        result: 'User doesn\'t Exist',
      });
    } else if (req.user.message == 'Incorrect password') {
      res.status(200).send({
        status: 401,
        result: 'Incorrect Password',
      });
    } else {
      const response = await userServices.usersignin(req.user.userid);
      res.status(200).send({
        status: 200,
        result: response,

      });
    }
    // console.log('req.user:',req.user);

  },
};
