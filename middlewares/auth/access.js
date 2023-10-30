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
