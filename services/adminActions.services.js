module.exports = () => {
    var path = require("path");
    const eventSchema = require("../models/admin/event")
    const newsSchema = require("../models/admin/news")
    const config = require("../config/index")
    const personalinformation = require("../models/user/personal")
    const faqSchema = require("../models/admin/faq")
    const masterdata = require("../models/admin/masterdata")
    const { getDataFromMaster } = require("../models/user/action");
    const fs = require('fs');
    const AWS = require('aws-sdk');
    const options = {
        accessKeyId: config["aws_access_key"],
        secretAccessKey: config["aws_secret_key"],
        region: config["aws_region"]
    };

    AWS.config.update(config);

    // Create S3 service object
    s3 = new AWS.S3();

    const viewNews = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { id, title, content, tags, date, author } = payload
                const _id = payload.id;
                const foundNews = await newsSchema.findOne({ _id })
                resolve(foundNews)

            } catch (error) {
                reject(error)
            }
        })
    }
    const viewallNews = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {

                const { id, title, content, tags, date, author } = payload

                const foundNews = await newsSchema.find({})

                resolve(foundNews)

            } catch (error) {
                reject(error)
            }
        })
    }
    //update news and post if new id is given
    const updateNews = ({ payload }) => {
        return new Promise(async (resolve, reject, error) => {
            try {
                const _id = payload.id
                //if id present, update news section
                if (_id) {
                   
                        await newsSchema.findOneAndUpdate({ _id }, { $set: payload }, { multi: true })
                        const fileName = payload.photo;
                        const ext = path.extname(fileName)
                        const uploadFile = () => {
                            fs.readFile(fileName, (err, data) => {
                                if (err) throw err;
                                const params = {
                                    Bucket: config["aws_bucket_name2"],
                                    Key: `news/${payload.id}${ext}`,
                                    Body: data
                                };
                                s3.upload(params, async (s3Err, data) =>{
                                    if (s3Err) throw s3Err
                                    // console.log(data.Location)
                                    let [user]=await newsSchema.find({
                                        "_id":payload.id});
                                
                                    if (user) {
                                        user=await user.updateOne({
                                            photo: data.Location},
                                            {new: true
                                        });
                                        user.ok === 1
                                            ? resolve(await newsSchema.findOne({_id }))
                                            : resolve("Updation Failed, Please Check");
                                    }
                                });
                            })
                        }
                            uploadFile();                        
                    }
                
            //if id not present, save the data to news section
            else {
                    const { title, content, tags, date, author, photo } = payload
                    const news = new newsSchema({ title, content, tags, date, author, photo });
                    const response = await news.save()
                    const fileName = payload.photo;
                        const ext = path.extname(fileName)
                        const uploadFile = () => {
                            fs.readFile(fileName, (err, data) => {
                                if (err) throw err;
                                const params = {
                                    Bucket: config["aws_bucket_name2"],
                                    Key: `news/${response._id}${ext}`,
                                    Body: data
                                };
                                s3.upload(params, async (s3Err, data) =>{
                                    if (s3Err) throw s3Err
                                    //  console.log(data.Location)
                                    let [user]=await newsSchema.find({
                                        "_id":response._id});
                                
                                    if (user) {
                                        user=await user.updateOne({
                                            photo: data.Location},
                                            {new: true
                                        });
                                        user.ok === 1
                                            ? resolve(await newsSchema.findOne({_id:response._id }))
                                            : resolve("Updation Failed, Please Check");
                                    }
                                });
                            })
                        }
                            uploadFile();  
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    const deleteNews = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedNews = await newsSchema.remove({ _id: payload.id })
                resolve(deletedNews)

            } catch (error) {
                reject(error)
            }
        })
    }

    const viewEvents = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {

                const { title, content, tags, date, author } = payload
                const _id = payload.id;
                const foundevent = await eventSchema.findOne({ _id })
                resolve(foundevent)

            } catch (error) {
                reject(error)
            }
        })
    }
    const viewallEvents = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { id, title, content, tags, date, author } = payload

                const foundNews = await eventSchema.find({})

                resolve(foundNews)

            } catch (error) {
                reject(error)
            }
        })
    }

    const updateEvents = ({ payload }) => {
        return new Promise(async (resolve, reject, error) => {
            try {
                const _id = payload.id
                //if id present, update news section
                if (_id) {
                   
                        await eventSchema.findOneAndUpdate({ _id }, { $set: payload }, { multi: true })
                        const fileName = payload.photo;
                        const ext = path.extname(fileName)
                        const uploadFile = () => {
                            fs.readFile(fileName, (err, data) => {
                                if (err) throw err;
                                const params = {
                                    Bucket: config["aws_bucket_name2"],
                                    Key: `events/${payload.id}${ext}`,
                                    Body: data
                                };
                                s3.upload(params, async (s3Err, data) =>{
                                    if (s3Err) throw s3Err
                                    // console.log(data.Location)
                                    let [user]=await eventSchema.find({
                                        "_id":payload.id});
                                
                                    if (user) {
                                        user=await user.updateOne({
                                            photo: data.Location},
                                            {new: true
                                        });
                                        user.ok === 1
                                            ? resolve(await eventSchema.findOne({_id }))
                                            : resolve("Updation Failed, Please Check");
                                    }
                                });
                            })
                        }
                            uploadFile();                        
                    }
                
            //if id not present, save the data to news section
            else {
                    const { title, content, tags, date, author, photo } = payload
                    const events = new eventSchema({ title, content, tags, date, author, photo });
                    const response = await events.save()
                    const fileName = payload.photo;
                        const ext = path.extname(fileName)
                        const uploadFile = () => {
                            fs.readFile(fileName, (err, data) => {
                                if (err) throw err;
                                const params = {
                                    Bucket: config["aws_bucket_name2"],
                                    Key: `events/${response._id}${ext}`,
                                    Body: data
                                };
                                s3.upload(params, async (s3Err, data) =>{
                                    if (s3Err) throw s3Err
                                    //  console.log(data.Location)
                                    let [user]=await eventSchema.find({
                                        "_id":response._id});
                                
                                    if (user) {
                                        user=await user.updateOne({
                                            photo: data.Location},
                                            {new: true
                                        });
                                        user.ok === 1
                                            ? resolve(await eventSchema.findOne({_id:response._id }))
                                            : resolve("Updation Failed, Please Check");
                                    }
                                });
                            })
                        }
                            uploadFile();  
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    const deleteEvents = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedNews = await eventSchema.remove({ _id: payload.id })
                resolve(deletedNews)

            } catch (error) {
                reject(error)
            }
        })
    }


    const viewFaq = ({ payload }) => {

        return new Promise(async (resolve, reject) => {
            try {
                const { id, question, answer } = payload
                const _id = payload.id;
                const foundFaq = await faqSchema.findOne({ _id })
                resolve(foundFaq)

            } catch (error) {
                reject(error)
            }
        })
    }
    const viewallFaq = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {

                const foundFaq = await faqSchema.find({})

                resolve(foundFaq)

            } catch (error) {
                reject(error)
            }
        })
    }

    const updatefaq = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const _id = payload.id
                //if id present, update news section
                if (_id) {
                    //no such record with id present then save the new record
                    if (await faqSchema.findOne({ _id }) == null) {
                        const { question, answer } = payload
                        const faqs = new faqSchema({ question, answer });
                        await faqs.save();
                        resolve(payload)
                    }
                    else {
                        await faqSchema.findOneAndUpdate({ _id }, { $set: payload }, { multi: true })

                        resolve(payload)

                    }
                }
                //if id not present, save the data to events section
                else {
                    const { question, answer } = payload
                    const faqs = new faqSchema({ question, answer });
                    const response = await faqs.save()
                    resolve(response)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    const deleteFaq = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deletedFaq = await faqSchema.remove({ _id: payload.id })

                resolve(deletedFaq)

            } catch (error) {
                reject(error)
            }
        })
    }

    const user = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                getDataFromMaster('masterdata', { user_id: parseInt(payload.userid) }, (err, response) => {

                    if (response) {

                        resolve(response);
                    }
                    else if (err) {
                        reject({
                            message: "User doesn't exist",
                            status: 400
                        });
                    }
                })
            } catch (error) {
                reject(error);
            }
        });
    }
    const createalumni = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                if (await masterdata.findOne({ user_id: payload.user_id })) {
                    resolve("founduser")
                }
                else {
                    const { relieving_date, user_id, date_of_resignation, last_working_day_as_per_notice_period, personal_email_id, first_name_personal_information, last_name_personal_information, middle_name_personal_information, nationality_personal_information, salutation_personal_information, city_addresses, phone_number_phone_information, manager_job_information, designation_job_information } = payload
                    const master = new masterdata({ relieving_date, user_id, date_of_resignation, last_working_day_as_per_notice_period, personal_email_id, first_name_personal_information, last_name_personal_information, middle_name_personal_information, nationality_personal_information, salutation_personal_information, city_addresses, phone_number_phone_information, manager_job_information, designation_job_information });
                    await master.save();

                    resolve(payload)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
    const viewalumni = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user_id = parseInt(payload.userid)
                const foundalumni = await masterdata.findOne({ user_id })

                resolve(foundalumni)

            } catch (error) {
                reject(error)
            }
        })
    }
    const allalumni = ({ }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const foundalumni = await masterdata.find({})

                resolve(foundalumni)

            } catch (error) {
                reject(error)
            }
        })
    }

    const updatealumni = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user_id = parseInt(payload.user_id)
                const updatealumni = await masterdata.findOneAndUpdate({ user_id }, { $set: payload }, { multi: true })

                resolve(updatealumni)

            } catch (error) {
                reject(error)
            }
        })
    }
    const deletealumni = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deleted = await masterdata.remove({ user_id: payload.userid })
                resolve(deleted)

            } catch (error) {
                reject(error)
            }
        })
    }
    const userupload = () => {

        return new Promise(async (resolve, reject) => {
            try {
                const fileName = 'C:/Users/Admin/Desktop/alumni.csv';

                const uploadFile = () => {
                    fs.readFile(fileName, (err, data) => {
                        if (err) throw err;
                        const params = {
                            Bucket: config["aws_bucket_name"],
                            Key: 'production/userprofile/alumni.csv',
                            Body: data
                        };
                        s3.upload(params, function (s3Err, data) {
                            if (s3Err) throw s3Err
                            resolve(data)
                        });
                    });
                };

                uploadFile();
                // const url = s3.getSignedUrl('getObject', {
                //         Bucket: 'sclabs-titan',
                //         Key: 'crux/users/alumni.csv',
                //         Expires:60*5
                //     })

                //     resolve(url)
            }
            catch (error) {
                reject(error)
            }
        })
    }
    const documentupload = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const path = payload.fileaddress
                const filename = payload.filename
                const fileName = filename.toLowerCase();
                const userId = parseInt(payload.userid)
                const uploadFile = () => {
                    fs.readFile(path, (err, data) => {
                        if (err) throw err;
                        const params = {
                            Bucket: config["aws_bucket_name"],
                            Key: `crux/users/${payload.userid}/${fileName}`,
                            Body: data
                        };
                        s3.upload(params, async (s3Err, data) => {
                            if (s3Err) throw s3Err
                            resolve(data)

                        });
                    });
                };

                uploadFile();
            }
            catch (error) {
                reject(error)
            }
        })
    }
    const viewdocument = ({ payload }) => {
        return new Promise(async (resolve, reject) => {
            try {
                const type = payload.filename;
                const fileName = type.toLowerCase();
                const userId = parseInt(payload.userid)
                const user_id = parseInt(payload.userid)
                if (await masterdata.findOne({ user_id })) {
                    const url = s3.getSignedUrl('getObject', {
                        Bucket: config["aws_bucket_name"],
                        Key: `crux/users/${userId}/${fileName}`,
                        Expires: 60 * 5
                    })

                    resolve(url)

                }
                else {
                    resolve("founduser")
                }


            }
            catch (error) {
                reject(error)
            }
        })
    }


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


        userupload,
        documentupload,
        viewdocument


    }
};
