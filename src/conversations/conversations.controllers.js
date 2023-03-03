
const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')
const uuid = require('uuid')


const findAllConversationsByUser = async(userId) => {

  const data = await Conversations.findAll({
    include: {
      model: Participants,
      where: {
        userId: userId 
      }
    }
  });
  return data.map(({
    id, 
    name, 
    profileImg,
    isGroup,
    createdAt
  }) =>({
    id,
    name,
    profileImg,
    isGroup,
    createdAt
  }))
}

const createNewConversation = async (conversationOBj, ownerUserId, guestUserId) => {
  
  const guestUser = await Users.findOne({where: {id: guestUserId}})
  if(!guestUser){
    return false
  } 
  const newConversation = await Conversations.create({
    id: uuid.v4(),
    name: conversationOBj.name,
    profileImg: conversationOBj.profileImg,
    isGroup: conversationOBj.isGroup
    //createdBy: conversationOBj.createdBy,
  })
  await Participants.create({
    id: uuid.v4(),
    userId: ownerUserId,
    conversationId: generatedConversation.id,
    isAdmin: true
  })
  await Participants.create({
    id: uuid.v4(),
    userId: guestUserId,
    conversationId: generatedConversation.id,
    isAdmin: false
  })

  return  newConversation
}



module.exports = {
  findAllConversationsByUser,
  createNewConversation
}