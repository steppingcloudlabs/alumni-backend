/* eslint-disable max-len */
const decodetoken = require('../utils/jwt.decode')();
module.exports = () => {
  const askhr = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else resolve('Fukc hat shit');
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    askhr,
  };
};
