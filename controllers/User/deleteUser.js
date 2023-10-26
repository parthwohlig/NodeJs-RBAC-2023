const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const User = require('../../services/userService')
const superAdmin = require('../../middlewares/auth/superAdminAccess')
// const Access = require('../../middlewares/auth/access')
// const cache = require('../../middlewares/requestCacheMiddleware') // uncomment the statement whenever the redis cache is in use.

const validationSchema = {
  // type: 'object',
  //   required: true,
  //   properties: {
  //     email: { type: 'string', required: true, minLength: 3 },
  //     password: { ty  pe: 'string', required: true }
  //   }
}
const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}
const deleteUser = async (req, res) => {
  try {
    const user = await User.deleteUser(req)
    res.sendJson({ type: __constants.RESPONSE_MESSAGES.SUCCESS, data: user })
  } catch (err) {
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.delete(
  '/:userid',
  superAdmin,
  validation,
  deleteUser
)
// router.post('/postPing', cache.route(100), validation, ping) // example for redis cache in routes
module.exports = router
