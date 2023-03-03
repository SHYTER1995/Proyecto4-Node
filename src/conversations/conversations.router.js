const conversationsServices = require('./conversations.services')
const passportJwt = require('../middlewares/auth.middleware')
const router = require('express').Router()

router.route('/')
  .get(passportJwt, conversationsServices.getAllConversationsByUser)
  .post(passportJwt, conversationsServices.postConversation)

// router.route('/:id')
//   .get()
//   .patch()
//   .delete()

// router.route('/:id/messages')
//   .get()
//   .post()


module.exports = router 