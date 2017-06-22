const jwt = require('jsonwebtoken')
const userModel = require('../../models/users')
const { buildResponse } = require('../../utils/responseService')

module.exports = (req, res) => {
  userModel.findOne(req.body.username)
    .then(user => {
      if(user == null) return buildResponse(res, 401, { message: "user not found" })

      if (userModel.comparePasswords(req.body.password, user.password) === true) {
        const payload = { username: user.username }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        buildResponse(res, 200, { message: 'success', token })
      } else {
        buildResponse(res, 401, { message:"passwords did not match" })
      }
    })

    .catch(err => {
      buildResponse(res, 500, { message:"Internal server error" })
    })
}
