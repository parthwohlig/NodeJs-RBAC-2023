function tokenAccess (req, res, next) {
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

module.exports = tokenAccess
