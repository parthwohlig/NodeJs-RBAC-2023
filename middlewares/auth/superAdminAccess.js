const jwt = require('jsonwebtoken')

function tokenAccess (req, res, next) {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ message: 'Token is missing' })
  }
  jwt.verify(
    token,
    process.env.AUTHENTICATION_JWT_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' })
      }

      const headers = {
        super_token: process.env.SUPER_TOKEN
      }
      for (const header in headers) {
        if (req.headers[header] !== headers[header]) {
          return res.status(401).json({ message: 'Unauthorized access' })
        }
      }
      next()
    }
  )
}
module.exports = tokenAccess
