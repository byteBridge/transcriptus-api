const userModel = require('../../models/users')
const validator = require('./registerValidation')

module.exports = (req, res) => {
  const {error, value} = validator.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message})
  }

  userModel.findOne(value.username)
    .then(user => {
      if (user) {
        res.status(403).json({message: 'user already exists'})
      } else {
         userModel.createUser(value)
          .then(user => {
            res.status(200).json({message: 'successfully created user.', user})
          })

          .catch(error => {
            res.status(500).json({message: 'something happened', error})
          })
      }
    })
  
}
