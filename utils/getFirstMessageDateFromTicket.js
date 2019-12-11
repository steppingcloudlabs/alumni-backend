const Ticket = require('../models/askhr/tickets');

module.exports = () => {
  const getFirstMessageDateFromTicket = (_id) =>
    new Promise(async (resolve, reject) => {
      try {
        const result = await Ticket.findOne({_id}).populate({
          path: 'message',
          select: {_id: 0, senders: 1, message: 1, created_at: 1},
          options: {
            sort: {created_at: -1},
          },
          populate: {path: 'senders', select: {_id: 0, userType: 1}},
        });

        let firstUserMessage;
        for ( let i= 0; i < result.message.length; i++ ) {
          if (result.message[i].senders.userType == 'admin') {
            firstUserMessage = result.message[i -1];
            break;
          }
        }
        // const newtime=firstUserMessage.created_at+new Date().getTime(new Date().setTime() + 900000 );
        // const okay= newtime.toString();
        const escalationDate = firstUserMessage.created_at.setDate(new Date().getDate() + 15);
        resolve(escalationDate);
      } catch (error) {
        reject(error);
      }
    });
  return {
    getFirstMessageDateFromTicket,
  };
};
