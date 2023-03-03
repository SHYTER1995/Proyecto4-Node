const messagesControllers = require('./messages.controllers')
const handleResponses = require('../utils/handleResponses')

const getAllMessagesByConversation = (rea, res) => {
  const conversationId = req.params.conversation_id 
  const userId = req.user.id
  messagesControllers.findAllMessagesByConversation(conversationId,userId)
    .then(data => {
      if (data) {
        handleResponses.success({
          res,
          status: 200,
          message: 'Find all messages by conversation',
          data
        })
        
      } else {
        handleResponses.error({
          res,
          status: 401,
          message: 'You are not participant from this conversation'
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        status: 400,
        message: 'Error while getting messages',
        data: err
      })
    })
}

module.exports = {
getAllMessagesByConversation
}
