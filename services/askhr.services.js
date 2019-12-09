/* eslint-disable max-len */
const decodetoken = require('../utils/jwt.decode')();
const Ticket = require('../models/askhr/tickets');
module.exports = () => {
  const postTicket = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('Works');
        const {participants, created_at, created_by, updated_by, title, message, esclation, esclation_manager_1, esclation_manager_2, esclation_manager_3, resolved_status} = payload;
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          const responseTicket = new Ticket({
            participants,
            created_at,
            created_by,
            updated_by,
            title,
            message,
            esclation,
            esclation_manager_1,
            esclation_manager_2,
            esclation_manager_3,
            resolved_status,
          });

          await responseTicket.save();
          resolve('New Ticket Posted');
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  const getTicket = 
  return {

    postTicket,
    getTicket
  };
};
