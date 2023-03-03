const usersServices = require('./users.services')
const passportJwt = require('../middlewares/auth.middleware')
const router = require('express').Router()

router.get('/', usersServices.getAllUsers)
router.get('/:id', usersServices.getUserById)

router.get('/me',passportJwt, usersServices.getMyUser)
router.delete('/me', passportJwt, usersServices.deleteMyUser)
router.patch('/me', passportJwt, usersServices.patcMyhUser)

router.post('/', usersServices.postUser)
router.patch('/:id', usersServices.patchUser)
router.delete('/:id', usersServices.deleteUser)

module.exports = router 