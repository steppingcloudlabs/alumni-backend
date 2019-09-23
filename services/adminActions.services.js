module.exports = () => {
    const eventSchema = require("../models/admin/event")
    const newsSchema = require("../models/admin/news")
    const faqSchema=require("../models/admin/faq")
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
    return {
        addNews,
        viewNews,
        addEvents,
        viewEvents,
        addFaq,
        viewFaq
    }
};