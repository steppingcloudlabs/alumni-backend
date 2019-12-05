/* eslint-disable max-len */
const config = require('../config/index');
const jobs = require('../models/user/jobs');
module.exports = () => {
  const {
    getDataFromMaster,
    getDataFromPersonalStatus,
  } = require('../models/user/action');
  const decodetoken = require('../utils/jwt.decode')();
  const userinfo = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          getDataFromMaster(
              'masterdatas',
              {user_id: payload.userid},
              (err, response) => {
                if (response) {
                  resolve(response);
                } else if (err) {
                // eslint-disable-next-line prefer-promise-reject-errors
                  reject({
                    message: 'User doesn\'t exist',
                    status: 400,
                  });
                }
              }
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const userstatus = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          getDataFromPersonalStatus(
              'personalinformation',
              {userId: payload.userid},
              (err, response) => {
                if (response) {
                  resolve(response);
                } else if (err) {
                // eslint-disable-next-line prefer-promise-reject-errors
                  reject({
                    message: 'User doesn\'t exist',
                    status: 400,
                  });
                }
              }
          );
        }
        // const response = await Masterdata.findOne({ user_id: payload.userid});
      } catch (error) {
        reject(error);
      }
    });
  };
  const getJobs = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          const {country, skill} = payload;

          let result;
          if (skill == 'null' || !skill) {
            result = await jobs.find({
              country: country,
            });
          } else {
            result = await jobs.find({
              country: country,
              $text: {$search: skill},
            });
          }

          resolve(result);
        }
        // const response = await Masterdata.findOne({ user_id: payload.userid});
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    userinfo,
    userstatus,
    getJobs,
  };
};
