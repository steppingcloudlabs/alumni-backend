module.exports = () => {
    const eventSchema = require("../models/admin/event")
    const newsSchema = require("../models/admin/news")
    const addNews = ({ payload }) => {
        return new Promise(async(resolve, reject) => {
            try {
                const { title, content, tags, date } = payload
                const news = new newsSchema({ title, content, tags, date });
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
                const { title, content, tags, date } = payload
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
                const { title, content, tags, date } = payload
                const news = new eventSchema({ title, content, tags, date });
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
                const { title, content, tags, date } = payload
                const foundNews = await eventSchema.findOne({ title })
                resolve(foundNews)

            } catch (error) {
                reject(error)
            }
        })
    }
    return {
        addNews,
        viewNews,
        addEvents,
        viewEvents
    }
};