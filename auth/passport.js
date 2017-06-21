const passport = require('passport')
const passportJwt = require('passport-jwt')
const userModel = require('../models/users')
const { ExtractJwt, Strategy } = passportJwt

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
jwtOptions.secretOrKey = process.env.JWT_SECRET

const strategy = new Strategy(jwtOptions, (jwtPayload, next) => {
  userModel.findOne(jwtPayload.username)
    .then(user => {
      next(null, user)
    })
    .catch(err => next(err, false))
})

passport.use(strategy)

module.exports = passport
