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
          const firstmessage = new Message({
            senders: created_by,
            message: 'This Is the first message',
            created_at: Date.now(),
          });
          const savedmsg = await firstmessage.save();
          const responseTicket = new Ticket({
            participants,
            created_at: Date.now(),
            created_by,
            updated_by,
            title,
            message: savedmsg._id,
            esclation,
            esclation_manager_1,
            esclation_manager_2,
            esclation_manager_3,
            resolved_status,
          });
          const result = await responseTicket.save();
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  const getTicket = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {_id, skip, limit} = payload;
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          const result = await Ticket.findOne({_id}).populate({
            path: 'message',
            select: {_id: 0, senders: 1, message: 1, created_at: 1}, options: {
              limit: (limit),
              skip: (skip),
            },
            populate: {path: 'senders', select: {_id: 0, userType: 1}},
          });
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const postmessage = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {senders, message, ticket_id} = payload;
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          // Creating a new message and saving it in message schema
          const newMessage = new Message({
            senders,
            message,
            created_at: Date.now(),
          });
          const response = await newMessage.save();

          // Getting the Objec_Id of the message created
          const message_id = response._id;

          // Getting the ticket corresponding to our message using the ticket_id comming from payload
          const responseTicket = await Ticket.findOne({_id: ticket_id});

          // Concat the newly created Object_Id of the message into the ticket message field
          responseTicket.message = responseTicket.message.concat(message_id);

          // Save the ticket
          await responseTicket.save();

          resolve(response);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const getmessage = ({payload, token}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {_id} = payload;
        const expirytimefromtoken = await decodetoken.decodejwt(token);
        if (Date.now() > expirytimefromtoken) {
          resolve('tokenexpired');
        } else {
          const result = await Message.findOne({_id}).populate('senders', [
            'userType',
          ]);
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  return {
    postTicket,
    getTicket,
    postmessage,
    getmessage,
  };
};
