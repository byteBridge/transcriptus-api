const jwt = require('jsonwebtoken')
const userModel = require('../models/users')

module.exports = (req, res) => {
  userModel.findOne(req.body.username)
    .then(user => {
      if(user == null) return res.status(401).json({message: "user not found"})
      if (userModel.comparePasswords(req.body.password, user.password) === true) {
        const payload = { username: user.username }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        res.json({messsage: 'success', token})
      } else {
        res.status(401).json({message:"passwords did not match"})
      }
    })
    .catch(err => {
      res.status(500).json({message:"Internal server error"})
    })
}
