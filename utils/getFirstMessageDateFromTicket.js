const Ticket = require("../models/askhr/tickets");

module.exports = () => {
  const getFirstMessageDateFromTicket = _id =>
    new Promise(async (resolve, reject) => {
      try {
        // finding the ticket; populate messagebody and senders in message; sort in decreasing order of message exchanged between admin and user.
        const result = await Ticket.findOne({ _id }).populate({
          path: "message",
          select: { _id: 0, senders: 1, message: 1, created_at: 1 },
          options: {
            sort: { created_at: -1 }
          },
          populate: { path: "senders", select: { _id: 0, userType: 1 } }
        });

        // finding the first admin message after navigation; the next message will be message of user who is querying to escalate;
        // the date of last user message will be his query for escalation;  escalation date will be counted from that date.
        let firstUserMessage;
        for (let i = 0; i < result.message.length; i++) {
          if (result.message[i].senders.userType == "hr") {
            firstUserMessage = result.message[i - 1];
            break;
          }
        }
        // console.log(firstUserMessage);
        // const newtime=firstUserMessage.created_at+new Date().getTime(new Date().setTime() + 900000 );
        // const okay= newtime.toString();
        const escalationDate = firstUserMessage.created_at.setDate(
          firstUserMessage.created_at.getDate() + 2
        );

        resolve(escalationDate);
      } catch (error) {
        reject(error);
      }
    });
  return {
    getFirstMessageDateFromTicket
  };
};
