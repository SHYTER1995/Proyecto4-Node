const Messages = require('../models/messages.models')
const uuid = require('uuid')
const Participants = require('../models/participants.models')

const findAllMessagesByConversation = async (conversationId, userId) => {
  const data = await Messages.findAll({
    include: {
      model: Participants,
      where: {
        conversationId,
        userId
      }
    }
  })
  return data 
}

const createNewMessage = async (messageObj) => {
  const newMessage = {
    id: uuid.v4(),
    content: messageObj.content,
    participantId: messageObj.participantId,
    status: messageObj.status
  }
  const data = await Messages.create(newMessage)
  return data 
}

module.exports = {
findAllMessagesByConversation
}