const {JWT_SECRET} = require('../config/index');
const JWT = require('jsonwebtoken');
module.exports = () => {
  const decodejwt = (token) => new Promise(async (resolve, reject) => {
    try {
      const decodedtoken = JWT.verify(token, JWT_SECRET);
      resolve(decodedtoken.exp);
    } catch (error) {
      reject(error);
    }
  });
  return {
    decodejwt,
  };
};
