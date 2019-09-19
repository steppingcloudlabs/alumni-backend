const { getDataFromMaster } = require("../models/user/action");
module.exports = {

    username: async (userid) => {
        return new Promise(async (resolve, reject) => {
            try {
<<<<<<< HEAD
                getDataFromMaster('masterdata', { userId: parseInt(userid) }, (err, response) => {
=======
                getDataFromMaster('masterdata', { user_id: parseInt(userid) }, (err, response) => {
>>>>>>> hot-fix--Status-Codes
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