
module.exports = () => {
   const { getDataFromMaster }=require("../models/user/action");
    const user= payload => {
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
            // const response = await Masterdata.findOne({ user_id: payload.userid});
            
            } catch (error) {
                reject(error);
            }
        });
    };
    
    
    return {
        user
    };
};