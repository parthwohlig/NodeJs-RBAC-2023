const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const User = require('../../services/userService')
// const cache = require('../../middlewares/requestCacheMiddleware') // uncomment the statement whenever the redis cache is in use.

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    email: { type: 'string', required: true, minLength: 3 },
    password: { type: 'string', required: true }
  }
}
const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}
const login = async (req, res) => {
  try {
    const user = await User.login(req)
    res.sendJson({ type: __constants.RESPONSE_MESSAGES.SUCCESS, data: user })
  } catch (err) {
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/login', validation, login)
// router.post('/postPing', cache.route(100), validation, ping) // example for redis cache in routes
module.exports = router
