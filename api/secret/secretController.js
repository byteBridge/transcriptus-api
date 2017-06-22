const userModel = require('../../models/users')

module.exports = (req, res) => {
  userModel.getAllUsers()
    .then(users => {
      res.status(200).json({users})
    })

    .catch(err => {
      res.status(500).json({err})
    })
}