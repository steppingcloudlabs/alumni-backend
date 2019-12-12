const AWS = require('aws-sdk');
const config = require('../config/index');
const options = {
  accessKeyId: config['aws_access_key'],
  secretAccessKey: config['aws_secret_key'],
  region: config['aws_region'],
};
module.exports = () => {
  const emailserivesfornotification = (email) =>
    new Promise(async (resolve, reject) => {
      try {
        const subject = 'Notification email';
        const body = 'This is the body of the notification';
        const params = {
          Source: config['from_adderess'],
          Destination: {
            ToAddresses: [email],
          },
          ReplyToAddresses: [config['from_adderess']],
          Message: {
            Body: {
              Text: {
                Charset: 'UTF-8',
                Data: body,
              },
            },
            Subject: {
              Charset: 'UTF-8',
              Data: subject,
            },
          },
        };

        // Create the promise and SES service object
        const sendPromise = new AWS.SES({apiVersion: '2010-12-01'})
            .sendEmail(params)
            .promise();

        // Handle promise's fulfilled/rejected states
        sendPromise
            .then(function(data) {
              resolve(data);
            })
            .catch(function(err) {
              reject(err.stack);
            });
      } catch (error) {
        reject(error);
      }
    });
  return {
    emailserivesfornotification,
  };
};
