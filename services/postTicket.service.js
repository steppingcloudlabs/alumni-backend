/* eslint-disable max-len */
const decodetoken = require('../utils/jwt.decode')();
module.exports = () => {
  const postTicket = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else resolve('Fuck that shit');
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    postTicket,
  };
};
