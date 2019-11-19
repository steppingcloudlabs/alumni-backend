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
      res.status(200).send({
        status: 200,
        result: {
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
      const token = JWT.sign({
        iss: 'steppingcloudforuser',
        sub: req.user.userid,
        jwtKey: 'steppingcloudsecret',
        algorithm: 'HS256',
        iat: new Date().getTime(),
        exp: new Date().setTime(new Date().getTime() + 900000),
      },
      JWT_SECRET);

      res.status(200).send({
        status: 200,
        result: response,
        token: token,

      });
    }
  },

  forgetpassword: async (req, res, next) => {
    try {
      const {payload, token} = req.body;
      if (token) {
        const response = await userServices.forgetpassword({payload, token});
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        }
        else {
          if (response == 'tokensent') {
            res.status(200).send({
              status: 200,
              result: 'Reset Token sent to your email',
            });
          }
        }
      }
      else {
        res.status(200).json({
          status: 400,
          result: 'Rejected Request, Token Required',
        });
      }
    } catch (error) {
      next(error);
    }
  },
  resetpassword: async (req, res, next) => {
    try {
      const {token, payloadbody} = req.body;
      const payload = req.params;

      if (token) {
        const response = await userServices.resetpassword({payload, token, payloadbody});
        if (response == 'tokenexpired') {
          res.status(200).send({
            status: '400',
            result: 'Token expired, Please Login Again',
          });
        }
        else {
          if (response == 'ResetTokenExpired') {
            res.status(200).send({
              status: 400,
              result: 'Reset Token Expired',
            });
          }
          else if ('updated') {
            res.status(200).send({
              status: 200,
              result: 'New password updated successfully',
            });
          }
          else {
            res.status(200).send({
              status: 200,
              result: 'Error while updating',
            });
          }
        }
      }
      else {
        res.status(200).json({
          status: 400,
          result: 'Rejected Request, Token Required',
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
