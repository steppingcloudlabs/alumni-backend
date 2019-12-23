const masterdata = require("../models/admin/masterdata");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const users = require("../models/user/auth");
const decodetoken = require("../utils/jwt.decode")();
const { JWT_SECRET } = require("../config");
const config = require("../config");
const AWS = require("aws-sdk");
module.exports = {
  username: async userid => {
    return new Promise(async (resolve, reject) => {
      try {
        if (await users.findOne({ userid: userid })) {
          resolve("founduser");
        } else {
          const response = await masterdata.findOne({ user_id: userid });
          resolve(response);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  usersignin: async userid => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await masterdata.findOne({ user_id: userid });

        // console.log(response);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  },
  forgetpassword: async ({ payload }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { email } = payload;
        const finduser = await users.findOne({ email });
        if (finduser) {
          // creating a token for password reset based on its email
          const token = JWT.sign(
            {
              iss: "steppingcloudforpasswordreset",
              sub: payload.email,
              jwtKey: "steppingcloudsecret",
              algorithm: "HS256",
              iat: new Date().getTime(),
              exp: new Date().setDate(new Date().getDate() + 1)
            },
            JWT_SECRET
          );
          // email sent and sending the token to reset the token
          const params = {
            Source: config["from_adderess"],
            Destination: {
              ToAddresses: [email]
            },
            ReplyToAddresses: [config["from_adderess"]],
            Message: {
              Body: {
                Text: {
                  Charset: "UTF-8",
                  Data:
                    "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
                    "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
                    "http://18.190.14.5:4000/user/reset/" +
                    token +
                    "\n\n" +
                    "If you did not request this, please ignore this email and your password will remain unchanged.\n" +
                    "Please note that the token will get expired in 24hrs"
                }
              },
              Subject: {
                Charset: "UTF-8",
                Data: "Password Reset"
              }
            }
          };
          // Create the promise and SES service object
          const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
            .sendEmail(params)
            .promise();
          // Handle promise's fulfilled/rejected states
          sendPromise
            .then(function(data) {
              resolve("tokensent");
            })
            .catch(function(err) {
              reject(err.stack);
            });
        } else {
          resolve("notfounduser");
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  resetpassword: async ({ payload, resettoken }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { newpassword } = payload;
        // console.log(resettoken);
        // the payload contains the reset token; and the other payloadbody contains the new password
        const decoderesettoken = JWT.verify(resettoken, JWT_SECRET);
        // console.log(decoderesettoken);
        if (Date.now() > decoderesettoken.exp) {
          resolve("ResetTokenExpired");
        } else {
          // the payload body contains new password to be reset
          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(newpassword, salt);
          let [finduser] = await users.find({
            email: decoderesettoken.sub
          });
          if (finduser) {
            finduser = await finduser.updateOne(
              {
                password: passwordHash,
                passwordupdatedAt: Date(Date.now()).toString()
              },
              {
                new: true
              }
            );
          }
          if (finduser.ok === 1) {
            // trigger mail to user about successful resetting of password
            const params = {
              Source: config["from_adderess"],
              Destination: {
                ToAddresses: [decoderesettoken.sub]
              },
              ReplyToAddresses: [config["from_adderess"]],
              Message: {
                Body: {
                  Text: {
                    Charset: "UTF-8",
                    Data:
                      "This is a confirmation that the password for your account " +
                      decoderesettoken.sub +
                      " has just been changed.\n"
                  }
                },
                Subject: {
                  Charset: "UTF-8",
                  Data: "Password Changed Successfully"
                }
              }
            };
            // Create the promise and SES service object
            const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
              .sendEmail(params)
              .promise();
            // Handle promise's fulfilled/rejected states
            sendPromise
              .then(function(data) {
                resolve("updated");
              })
              .catch(function(err) {
                reject(err.stack);
              });
          } else {
            resolve("Updation Failed, Please Check");
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }
};
