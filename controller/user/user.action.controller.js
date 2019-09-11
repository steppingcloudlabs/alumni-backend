
module.exports =()=> {
    const userServices=require('../../services/user.services')();
    // personal user function
const user=async (req, res, next) => {
      try {
        const payload = req.params
        const  response = await userServices.user(payload);
        res.status(200).send({
            status: 200,
            message: { "params": response,
             "result": "IMPLEMENTED " }
        });
    } catch (error) {
        next(error);
    }
    }
    return{
        user
    };
  };
  