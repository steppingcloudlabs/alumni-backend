module.exports = () => {
    const eventSchema = require("../models/admin/event")
    const newsSchema = require("../models/admin/news")
    const faqSchema=require("../models/admin/faq")
    const masterdata=require("../models/admin/masterdata")
    const { getDataFromMaster }=require("../models/user/action");
    const addNews = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const { title, content, tags, date,author } = payload
                const news = new newsSchema({ title, content, tags, date,author});
                await news.save();
                resolve(payload)

            } catch (error) {
                reject(error)
            }
        })
    }
    const viewNews = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const { title, content, tags, date,author } = payload
                const foundNews = await newsSchema.findOne({ title })
                resolve(foundNews)

            } catch (error) {
                reject(error)
            }
        })
    }
    const addEvents = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const { title, content, tags, date,author } = payload
                const news = new eventSchema({ title, content, tags, date,author });
                await news.save();
                resolve(payload)

            } catch (error) {
                reject(error)
            }
        })
    }
    const viewEvents = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const { title, content, tags, date,author } = payload
                const foundNews = await eventSchema.findOne({ title })
                resolve(foundNews)

            } catch (error) {
                reject(error)
            }
        })
    }

    const addFaq = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const { question,answer} = payload
                const faqs = new faqSchema({ question,answer });
                await faqs.save();
                resolve(payload)

            } catch (error) {
                reject(error)
            }
        })
    }
    const viewFaq = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const { question,answer } = payload
                const foundFaq= await faqSchema.findOne({ question })
                resolve(foundFaq)

            } catch (error) {
                reject(error)
            }
        })
    }
    const deleteFaq = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const deletedFaq= await faqSchema.remove({ question: payload.question })
                resolve(deletedFaq)

            } catch (error) {
                reject(error)
            }
        })
    }
    const user= ({payload}) => {
        return new Promise(async(resolve, reject) => {
            try {
                getDataFromMaster('masterdata', { user_id: parseInt(payload.userid)}, (err, response) => {
                  
                    if (response) 
                    { 
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
        return new Promise(async(resolve, reject) => {
            try {
            const {relieving_date,user_id,date_of_resignation,last_working_day_as_per_notice_period,personal_email_id,first_name_personal_information,last_name_personal_information,middle_name_personal_information,nationality_personal_information,salutation_personal_information,city_addresses,phone_number_phone_information,manager_job_information,designation_job_information}=payload
            const master = new masterdata({relieving_date,user_id,date_of_resignation,last_working_day_as_per_notice_period,personal_email_id,first_name_personal_information,last_name_personal_information,middle_name_personal_information,nationality_personal_information,salutation_personal_information,city_addresses,phone_number_phone_information,manager_job_information,designation_job_information});
            const test=await master.save();
            
            resolve(payload)
            
            } catch (error) {
               reject(error)
            }     
        })
    }
    const viewalumni = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const { user_id } = payload
                const foundalumni= await masterdata.findOne({user_id})
                resolve(foundalumni)

            } catch (error) {
                reject(error)
            }
        })
    }
    const updatealumni=({payload})=>{
        return new Promise(async(resolve, reject) => {
            try {
                const user_id = parseInt(payload.user_id)
                const updatealumni= await masterdata.findOneAndUpdate({user_id},{$set:payload},{ multi: true })
                resolve(updatealumni)

            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        addNews,
        viewNews,
        addEvents,
        viewEvents,
        addFaq,
        viewFaq,
        deleteFaq,
        user,
        createalumni,
        viewalumni,
        updatealumni
    }
};