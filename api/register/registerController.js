const userModel = require('../../models/users')
const validator = require('./registerValidation')
const { buildResponse } = require('../../utils/responseService') 

module.exports = (req, res) => {
  const {error, value} = validator.validate(req.body)
  if (error) {
    return buildResponse(res, 400, { message: error.details[0].message })
  }

  userModel.findOne(value.username)
    .then(user => {
      if (user) {
        buildResponse(res, 422, { message: 'user already exists' })
      } else {
         userModel.createUser(value)
          .then(user => {
            buildResponse(res, 200, { message: 'successfully created user.', user })
          })

          .catch(error => {
            buildResponse(res, 500, { message: 'something happened', error })
          })
      }
    })
  
}
