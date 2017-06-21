// @input : username, password
// @ constrans == username min 6 max 12 string required with username
//                password min 8 max 25 required with username //strong password regex
const joi = require('joi')

module.exports = joi.object().keys({
  username: joi.string().min(6).max(12).required(),
  password: joi.string().min(8).max(25).required()
}).with('username', 'password')
