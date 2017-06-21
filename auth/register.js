const userModel = require('../models/users')

module.exports = (req, res) => {
  userModel.createUser(req)
    .then(user => {
      res.status(200).json({message: 'successfully created user.', user})
    })

    .catch(error => {
      res.status(500).json({message: 'something happened', error})
    })
}