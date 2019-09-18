const { getDataFromMaster } = require("../models/user/action");
module.exports = {

    username: async (userid) => {
        return new Promise(async (resolve, reject) => {
            try {
                getDataFromMaster('masterdata', { userId: parseInt(userid) }, (err, response) => {
                    if (response) {                        
                        resolve(response);  
                    }else{
                    reject(err)
                    }
                })
                
                

            } catch (error) {
                reject(error);
            }
        });
    }



};