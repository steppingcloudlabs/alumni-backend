/* eslint-disable max-len */
module.exports = () => {
  const {getDataFromMaster, getDataFromPersonalStatus} = require('../models/user/action');
  const decodetoken = require('../utils/jwt.decode')();
  const getJobs = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          getDataFromMaster('jobs', {user_id: (payload.userid)}, (err, response) => {
            if (response) {
              resolve(response);
            } else if (err) {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({
                message: 'User doesn\'t exist',
                status: 400,
              });
            }
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const getRecommendedJobs = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          getDataFromPersonalStatus('personalinformation', {userId: (payload.userid)}, (err, response) => {
            if (response) {
              resolve(response);
            } else if (err) {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({
                message: 'User doesn\'t exist',
                status: 400,
              });
            }
          });
        }
        // const response = await Masterdata.findOne({ user_id: payload.userid});
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    getJobs,
    getRecommendedJobs,
  };
};
