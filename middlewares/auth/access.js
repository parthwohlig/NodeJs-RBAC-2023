const jwt = require('jsonwebtoken')

exports.checkUserPermission = (req, res, next) => {
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
      const userRole = decoded.data.role
      const requiredPermissions = ['superadmin', 'admin', 'user', 'moderator']

      if (requiredPermissions.includes(userRole)) {
        next()
      } else {
        res.status(403).json({
          error: 'Permission denied. You do not have the required permissions.'
        })
      }
    }
  )
}

exports.checkCreatePermission = (req, res, next) => {
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
      const userRole = decoded.data.role
      const requiredPermissions = ['superadmin', 'admin', 'moderator', 'user']

      if (requiredPermissions.includes(userRole)) {
        next()
      } else {
        res.status(403).json({
          error: 'Permission denied. You do not have the required permissions.'
        })
      }
    }
  )
}

exports.checkReadPermission = (req, res, next) => {
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
      const userRole = decoded.data.role
      const requiredPermissions = ['superadmin', 'admin', 'moderator', 'user']

      if (requiredPermissions.includes(userRole)) {
        next()
      } else {
        res.status(403).json({
          error: 'Permission denied. You do not have the required permissions.'
        })
      }
    }
  )
}

exports.checkUpdatePermission = (req, res, next) => {
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
      const userRole = decoded.data.role
      const requiredPermissions = ['superadmin', 'admin', 'moderator']

      if (requiredPermissions.includes(userRole)) {
        next()
      } else {
        res.status(403).json({
          error: 'Permission denied. You do not have the required permissions.'
        })
      }
    }
  )
}

exports.checkDeletePermission = (req, res, next) => {
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
      const userRole = decoded.data.role
      const requiredPermissions = ['superadmin', 'admin']

      if (requiredPermissions.includes(userRole)) {
        next()
      } else {
        res.status(403).json({
          error: 'Permission denied. You do not have the required permissions.'
        })
      }
    }
  )
}

// exports.allowIfLoggedin = async (req, res, next) => {
//   try {
//     if (req.headers['JWT-Token']) {
//       const accessToken = req.headers['JWT-Token']
//       const { userId, exp } = await jwt.verify(
//         accessToken,
//         process.env.JWT_SECRET
//       )
//       if (exp < Date.now().valueOf() / 1000) {
//         return res.status(401).json({
//           error: 'JWT token has expired, please login to obtain a new one'
//         })
//       }
//       res.locals.loggedInUser = await User.findById(userId)
//       console.log(res.locals.loggedInUser)
//       next()
//     } else {
//       next()
//     }
//   } catch (error) {
//     console.error('error in allowIfLoggedin', error)
//     return res.status(500).send('Internal server error')
//   }
// }
