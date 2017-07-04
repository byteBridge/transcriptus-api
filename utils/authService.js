const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
* Checks if the password provided by the user matches the password
* in the database
*/
function comparePasswords (reqPass, dbPass) {
  return bcrypt.compareSync(reqPass, dbPass) 
}

/**
 * Generate token for use when login in
 */
function generateToken (payload) {
  return jwt.sign(payload, process.env.JWT_SECRET)
}

/**
 * Verify the token. Verifies validity (tamper and expiry)
 */
function verifyToken (token, secretOrKey, options, callback) { 
  return jwt.verify(token, secretOrKey, options, callback)
}

/**
 * Hash the password for secure storage in the database 
 */
function hashedPassword (password) {
  return bcrypt.hashSync(password, 10)
}

module.exports = {
  comparePasswords,
  generateToken,
  verifyToken,
  hashedPassword
}