/* eslint-disable max-len */

const config = require('../config/index');

module.exports = () => {
  const { getDataFromMaster, getDataFromPersonalStatus } = require('../models/user/action');
  const userinfo = (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        getDataFromMaster('masterdatas', { user_id: (payload.userid) }, (err, response) => {
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
      } catch (error) {
        reject(error);
      }
    });
  };
  const userstatus = ({ payload }) => {
    return new Promise(async (resolve, reject) => {
      try {
        getDataFromPersonalStatus('personalinformation', { userId: (payload.userid) }, (err, response) => {
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
        // const response = await Masterdata.findOne({ user_id: payload.userid});
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    userinfo,
    userstatus,
  };
};
