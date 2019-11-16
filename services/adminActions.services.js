module.exports = () => {
  const decodetoken = require('../utils/jwt.decode')();
  const path = require('path');
  const eventSchema = require('../models/admin/event');
  const newsSchema = require('../models/admin/news');
  const config = require('../config/index');
  const personalinformation = require('../models/user/personal');
  const faqSchema = require('../models/admin/faq');
  const masterdata = require('../models/admin/masterdata');
  const { getDataFromMaster } = require('../models/user/action');
  const fs = require('fs');
  const util = require('../utils/index');
  const AWS = require('aws-sdk');
  const options = {
    accessKeyId: config['aws_access_key'],
    secretAccessKey: config['aws_secret_key'],
    region: config['aws_region'],
  };
  AWS.config.update(config);
  // Create S3 service object
  s3 = new AWS.S3();

  const viewNews = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const _id = payload.id;
          const foundNews = await newsSchema.findOne({ _id });
          resolve(foundNews);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const viewallNews = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const { skip, limit } = payload;
          const foundNews = await newsSchema.find().sort({ date: -1 }).skip(skip).limit(limit);
          // console.log(foundNews)
          resolve(foundNews);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  // update news and post if new id is given
  const updateNews = ({ payload, token }) => {
    return new Promise(async (resolve, reject, error) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const _id = payload.id;
          // if id present, update news section
          if (_id) {

            await newsSchema.findOneAndUpdate({ _id }, { $set: payload }, { multi: true });
            const fileName = payload.photo;
            const ext = path.extname(fileName);
            const uploadFile = () => {
              const buf = Buffer.from((fileName).toString('base64'), 'base64');
              const params = {
                Bucket: config['aws_bucket_name2'],
                Key: `news/${payload.id}${ext}`,
                Body: buf,
                ContentType: 'image/jpeg',
                ContentEncoding: 'base64',
              };
              s3.upload(params, async (s3Err, data) => {
                if (s3Err) throw s3Err;
                // console.log(data.Location)
                let [user] = await newsSchema.find({
                  '_id': payload.id,
                });

                if (user) {
                  user = await user.updateOne({
                    photo: data.Location,
                  },
                    {
                      new: true,
                    });
                  user.ok === 1
                    ? resolve(await newsSchema.findOne({ _id }))
                    : resolve('Updation Failed, Please Check');
                }
              });

            };
            uploadFile();

          }

          // if id not present, save the data to news section
          else {
            const { title, content, tags, date, author, photo } = payload;
            const news = new newsSchema({ title, content, tags, date, author, photo });
            const response = await news.save();
            const fileName = payload.photo;
            const ext = path.extname(fileName);
            const uploadFile = () => {
              const buf = Buffer.from((fileName).toString('base64'), 'base64');
              const params = {
                Bucket: config['aws_bucket_name2'],
                Key: `news/${response._id}${ext}`,
                Body: buf,
                ContentType: 'image/jpeg',
                ContentEncoding: 'base64',
              };
              s3.upload(params, async (s3Err, data) => {
                if (s3Err) throw s3Err;
                //  console.log(data.Location)
                let [user] = await newsSchema.find({
                  '_id': response._id,
                });

                if (user) {
                  user = await user.updateOne({
                    photo: data.Location,
                  },
                    {
                      new: true,
                    });
                  user.ok === 1
                    ? resolve(await newsSchema.findOne({ _id: response._id }))
                    : resolve('Updation Failed, Please Check');
                }
              });


            };
            uploadFile();

          }
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const deleteNews = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const deletedNews = await newsSchema.deleteOne({ _id: payload.id });
          resolve(deletedNews);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const viewEvents = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const { title, content, tags, date, author } = payload;
          const _id = payload.id;
          const foundevent = await eventSchema.findOne({ _id });
          resolve(foundevent);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const viewallEvents = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const { skip, limit } = payload;
          const foundNews = await eventSchema.find({}).sort({ date: -1 }).skip(skip).limit(limit);
          resolve(foundNews);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const updateEvents = ({ payload, token }) => {
    return new Promise(async (resolve, reject, error) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const _id = payload.id;
          // if id present, update events section
          if (_id) {

            await eventSchema.findOneAndUpdate({ _id }, { $set: payload }, { multi: true });
            const fileName = payload.photo;
            const ext = path.extname(fileName);
            const uploadFile = () => {
              const buf = Buffer.from((fileName).toString('base64'), 'base64');
              const params = {
                Bucket: config['aws_bucket_name2'],
                Key: `events/${payload.id}${ext}`,
                Body: buf,
                ContentType: 'image/jpeg',
                ContentEncoding: 'base64',
              };
              s3.upload(params, async (s3Err, data) => {
                if (s3Err) throw s3Err;
                let [user] = await eventSchema.find({
                  '_id': payload.id,
                });

                if (user) {
                  user = await user.updateOne({
                    photo: data.Location,
                  },
                    {
                      new: true,
                    });
                  user.ok === 1
                    ? resolve(await eventSchema.findOne({ _id }))
                    : resolve('Updation Failed, Please Check');
                }
              });

            };
            uploadFile();
          }

          // if id not present, save the data to news section
          else {
            const { title, content, tags, date, author, photo } = payload;
            const events = new eventSchema({ title, content, tags, date, author, photo });
            const response = await events.save();
            const fileName = payload.photo;
            const ext = path.extname(fileName);
            const uploadFile = () => {
              const buf = Buffer.from((fileName).toString('base64'), 'base64');
              const params = {
                Bucket: config['aws_bucket_name2'],
                Key: `events/${response._id}${ext}`,
                Body: buf,
                ContentType: 'image/jpeg',
                ContentEncoding: 'base64',
              };
              s3.upload(params, async (s3Err, data) => {
                if (s3Err) throw s3Err;
                //  console.log(data.Location)
                let [user] = await eventSchema.find({
                  '_id': response._id,
                });

                if (user) {
                  user = await user.updateOne({
                    photo: data.Location,
                  },
                    {
                      new: true,
                    });
                  user.ok === 1
                    ? resolve(await eventSchema.findOne({ _id: response._id }))
                    : resolve('Updation Failed, Please Check');
                }
              });

            };
            uploadFile();
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const deleteEvents = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const deletedNews = await eventSchema.remove({ _id: payload.id });
          resolve(deletedNews);
        }
      } catch (error) {
        reject(error);
      }
    });
  };


  const viewFaq = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const { id, question, answer } = payload;
          const _id = payload.id;
          const foundFaq = await faqSchema.findOne({ _id });
          resolve(foundFaq);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const viewallFaq = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const { skip, limit } = payload;
          const foundFaq = await faqSchema.find({}).skip(skip).limit(limit);
          resolve(foundFaq);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const updatefaq = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const _id = payload.id;
          // if id present, update news section
          if (_id) {
            // no such record with id present then save the new record
            if (await faqSchema.findOne({ _id }) == null) {
              const { question, answer } = payload;
              const faqs = new faqSchema({ question, answer });
              await faqs.save();
              resolve(payload);
            }
            else {
              await faqSchema.findOneAndUpdate({ _id }, { $set: payload }, { multi: true });

              resolve(payload);

            }
          }
          // if id not present, save the data to events section
          else {
            const { question, answer } = payload;
            const faqs = new faqSchema({ question, answer });
            const response = await faqs.save();
            resolve(response);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const deleteFaq = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const deletedFaq = await faqSchema.remove({ _id: payload.id });

          resolve(deletedFaq);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const user = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          getDataFromMaster('masterdata', { user_id: parseInt(payload.userid) }, (err, response) => {
            if (response) {
              resolve(response);
            }
            else if (err) {
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
  const createalumni = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          if (await masterdata.findOne({ user_id: payload.user_id })) {
            resolve('founduser');
          }
          else {
            const { relieving_date, user_id, date_of_resignation, last_working_day_as_per_notice_period, personal_email_id, first_name_personal_information, last_name_personal_information, middle_name_personal_information, nationality_personal_information, salutation_personal_information, city_addresses, phone_number_phone_information, manager_job_information, designation_job_information, skill } = payload;
            const master = new masterdata({ relieving_date, user_id, date_of_resignation, last_working_day_as_per_notice_period, personal_email_id, first_name_personal_information, last_name_personal_information, middle_name_personal_information, nationality_personal_information, salutation_personal_information, city_addresses, phone_number_phone_information, manager_job_information, designation_job_information, skill });
            const response = await master.save();
            // console.log(response)
            await personalinformation.insertMany({
              'userId': response.user_id,
              'fnfStatus': 'Not Available',
              'pfTransferStatus': 'Not Available',
              'form16': 'Not Available',
              'salarycurrent': 'Not Available',
              'salaryprevious': 'Not Available',
              'salarylast': 'Not Available',
              'uanDetails': 'Not Available',
            });
            resolve(payload);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const viewalumni = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const user_id = (payload.userid);
          const foundalumni = await masterdata.findOne({ user_id });

          resolve(foundalumni);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const allalumni = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const { skip, limit, keyword } = payload;

          if (keyword) {
            const foundalumni = await masterdata.find({ $text: { $search: keyword } }).skip(skip).limit(limit);
            resolve(foundalumni);

          }
          else {
            const foundalumni = await masterdata.find({}).skip(skip).limit(limit);
            resolve(foundalumni);
          }
        }

      } catch (error) {
        reject(error);
      }
    });
  };

  const updatealumni = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const user_id = (payload.user_id);
          const updatealumni = await masterdata.findOneAndUpdate({ user_id }, { $set: payload }, { multi: true });

          resolve(updatealumni);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const deletealumni = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const deleted = await masterdata.remove({ user_id: payload.userid });
          await personalinformation.remove({ userId: payload.userid });
          resolve(deleted);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const documentupload = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const stream = payload.stream;
          const filetype = payload.type;
          const x = util[filetype];
          const uploadFile = () => {
            const buf = Buffer.from((stream).toString('base64'), 'base64');
            const params = {
              Bucket: config['aws_bucket_name'],
              Key: `crux/users/${payload.userid}/${x}.pdf`,
              Body: buf,
              ContentType: 'application/pdf',
              ContentDisposition: 'inline',
            };
            s3.upload(params, async (s3Err, buf) => {
              if (s3Err) throw s3Err;
              // resolve(buf)
              let [user] = await personalinformation.find({
                'userId': payload.userid,
              });
              updatedJson = {};
              updatedJson[x] = 'Available';

              if (user) {
                user = await user.updateOne({ $set: updatedJson }, { new: true });
                user.ok === 1
                  ? resolve(buf)
                  : resolve('failed');
              }
            });
          };

          uploadFile();
        }
      }
      catch (error) {
        reject(error);
      }
    });
  };
  const viewdocument = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const filename = payload.filename;
          const x = util[filename];
          const user_id = (payload.userid);
          if (await masterdata.findOne({ user_id })) {
            const url = s3.getSignedUrl('getObject', {
              Bucket: config['aws_bucket_name'],
              Key: `crux/users/${user_id}/${x}.pdf`,
              Expires: 60 * 5,
            });

            resolve(url);

          }
          else {
            resolve('notfounduser');
          }
        }

      }
      catch (error) {
        reject(error);
      }
    });
  };
  const askHr = ({ payload, token }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if ((Date.now()) > expirytimefromtoken) {
          resolve('tokenexpired');
        }
        else {
          const { subject, body } = payload;
          console.log(payload);
          const params = {
            Source: config['from_adderess'],
            Destination: {
              ToAddresses: [
                config['from_adderess'],
              ],
            },
            ReplyToAddresses: [
              config['from_adderess'],
            ],
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
          const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
            .sendEmail(params).promise();

          // Handle promise's fulfilled/rejected states
          sendPromise.then(
            function (data) {
              resolve(data);
            }).catch(
              function (err) {
                reject(err.stack);
              });
        }
      } catch (error) {
        reject(error);
      }
    });
  };


  return {
    viewNews,
    viewallNews,
    updateNews,
    deleteNews,
    viewEvents,
    viewallEvents,
    updateEvents,
    deleteEvents,
    viewFaq,
    viewallFaq,
    updatefaq,
    deleteFaq,
    user,
    createalumni,
    viewalumni,
    allalumni,
    updatealumni,
    deletealumni,
    documentupload,
    viewdocument,
    askHr,
  };
};
