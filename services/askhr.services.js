/* eslint-disable max-len */
const decodetoken = require('../utils/jwt.decode')();
const Ticket = require('../models/askhr/tickets');
const Message = require('../models/askhr/message');
module.exports = () => {
  const postTicket = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
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
        } = payload;
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
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const postmessage = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {senders, message, created_at} = payload;
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          const result = new Message({
            senders,
            message,
            created_at,
          });
          const response = await result.save();
          resolve(response);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    postTicket,
    // getTicket,
    postmessage,
  };
};
