const conversationsControllers = require('./conversations.controllers')
const handleResponses = require('../utils/handleResponses')

const getAllConversationsByUser = (req,res) =>{
  const userId = req.user.id
  conversationsControllers.findAllConversationsByUser(userId)
    .then(data => {
      handleResponses.success({
        res,
        status:200,
        message: data.length ? 'Showing all conversations':'No conversations to show',
        data,
      })
    })
    .catch(error => {
      handleResponses.error({
        res,
        status: 400,
        message: 'An error has occurred while getting conversations',
        data: error,
      })
    })
}


const postConversation = (req, res) => {
  const ownerId = req.user.id
  const {guestId, ...conversationObj} = req.body

  conversationsControllers.createNewConversation(conversationObj, ownerId, guestId)
    .then(data => {
      if (data){
        handleResponses.success({
          res,
          status: 201,
          message: 'Conversation created successfully',
          data,
      })
      } else {
        handleResponses.error({
          res,
          status: 400,
          message: `Users with id ${guestId} not found`
        })
      }
    })
    .catch(error => {
      handleResponses.error({
        res,
        status: 400,
        message: error.message || 'something bad',
        data: error,
        fields: {
          name: "string",
          profileImg: "string",
          isGroup: "boolean",
          guestId: "string UUID",
          //"createdBy": "string",
        }
      })
    })
}





module.exports = {
  getAllConversationsByUser,
  postConversation,
}

