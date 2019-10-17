const masterdata= require("../models/admin/masterdata");
const users=require("../models/user/auth")
module.exports = {

    username: async (userid) => {
        return new Promise(async (resolve, reject) => {
            try {
                if(await users.findOne({userid: (userid)}))
                {
                    resolve("founduser")
                }
                else{
               const response=await masterdata.findOne({user_id:(userid)})                      
                        resolve(response);  
               
                }
                

            } catch (error) {
                reject(error);
            }
        });
    },
    usersignin: async (userid) => {
        return new Promise(async (resolve, reject) => {
            try {
                
               const response=await masterdata.findOne({user_id: parseInt(userid)})                       
                        resolve(response);  
               
                
                

            } catch (error) {
                reject(error);
            }
        });
    }


};