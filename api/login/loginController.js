const jwt = require('jsonwebtoken')
const userModel = require('../../models/users')
const { buildResponse } = require('../../utils/responseService')
const validator = require('./loginValidation')

module.exports = (req, res) => {
    const {error, value} = validator.validate(req.body)
    if (error) return buildResponse(res, 400, { message: 'bad request', error: error.details[0].message})

    userModel.login(value.username, value.password)
      .then(token => buildResponse(res, 200, { message: 'success', token }))
      .catch(error => {
        if (error && error.status === 401) return buildResponse(res, 401, { message: 'invalid login details' })
        buildResponse(res, 500, { message: 'Internal server error'})
      })
}
