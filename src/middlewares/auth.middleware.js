const {ExtractJwt, Strategy} = require('passport-jwt')
//?ExtractJwt: para extraer token de alguna de las partes que componen la peticion 
//?Strategy: funcion que recibe opciones y un callback de verificación 
const passport = require('passport')
const {findUserById} = require('../users/users.controllers')

const passportConfigs = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(), //? Funcion que retorna el JWT
  secretOrKey: 'academlo' //? palabra secreta (firma del token)
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done)=>{
  //?strategy: estrategia de passport que se va a usar para la autenticación
  //?           Recibe objeto de opciones y callback de verificacion
  //?tokenDecoded es el payload (objeto de información al decodificar el token)
  //? done: callback de verificación, recibe parametros (error, usuario)
  findUserById(tokenDecoded.id)
    .then(data => {
      if (data){
        done(null, tokenDecoded)  //? si hay info en la respuesta, retorna la info decodificada del token
      } else {
        done(null, false) //? si no hay info en la respuesta no retorna info ni error 
      }
    })
    .catch(err => {
      done(err,false) //? si la peticion es erronea, retorna información sobre el error y no retorna info 
    })
}))

module.exports = passport.authenticate('jwt', {session: false})