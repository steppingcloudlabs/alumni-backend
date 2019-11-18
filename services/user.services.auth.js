const masterdata = require('../models/admin/masterdata');
const JWT = require('jsonwebtoken');
const users = require('../models/user/auth');
const decodetoken = require('../utils/jwt.decode')();
const {JWT_SECRET} = require('../config');
const config = require('../config');
const AWS = require('aws-sdk');
module.exports = {

  username: async (userid) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (await users.findOne({userid: (userid)})) {
          resolve('founduser');
        }
        else {
          const response = await masterdata.findOne({user_id: (userid)});
          resolve(response);

        }


      } catch (error) {
        reject(error);
      }
    });
  },
  usersignin: async (userid) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await masterdata.findOne({user_id: (userid)});

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  forgetpassword: async ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const token = JWT.sign({
            iss: 'steppingcloudforpasswordreset',
            sub: payload.email,
            jwtKey: 'steppingcloudsecret',
            algorithm: 'HS256',
            iat: new Date().getTime(),
            exp: new Date().setTime(new Date().getTime() + 900000),
          },
          JWT_SECRET);
          const params = {
            Source: config['from_adderess'],
            Destination: {
              ToAddresses: [
                payload.email,
              ],
            },
            ReplyToAddresses: [
              config['from_adderess'],
            ],
            Message: {
              Body: {

                Text: {
                  Charset: 'UTF-8',
                  Data: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://localhost:4000/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                },
              },
              Subject: {
                Charset: 'UTF-8',
                Data: 'Password Reset',
              },
            },
          };
          // Create the promise and SES service object
          const sendPromise = new AWS.SES({apiVersion: '2010-12-01'})
              .sendEmail(params).promise();
          // Handle promise's fulfilled/rejected states
          sendPromise.then(
              function(data) {
                resolve(data);
              }).catch(
              function(err) {
                reject(err.stack);
              });
        }
      } catch (error) {
        reject(error);
      }
    });
  },



};
