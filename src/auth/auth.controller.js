const {findUserByEmail} = require('../users/users.controllers')
const {comparePassword} = require('../utils/crypto')

const checkUserCredentials = async(email,password) => {
  try {
    const user = await findUserByEmail(email)
    console.log(user.password)
    const veryfyPassword = comparePassword(password, user.password)
    console.log(veryfyPassword)
    if (veryfyPassword){
      return user
    } else {
      return false 
    }
  } catch (error) {
    console.log("error")
    throw new Error(error)
  }
}

module.exports =   checkUserCredentials

