const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const Comment = require('../../services/commentService')
const { checkUpdatePermission } = require('../../middlewares/auth/access')
const authentication = require('../../middlewares/auth/authentication')
// const cache = require('../../middlewares/requestCacheMiddleware') // uncomment the statement whenever the redis cache is in use.

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    comment: { type: 'string', required: true },
    postId: { type: 'string', required: true }
  }
}
const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}
const updateComment = async (req, res) => {
  try {
    const comment = await Comment.updateComment(req)
    res.sendJson({ type: __constants.RESPONSE_MESSAGES.SUCCESS, data: comment })
  } catch (err) {
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.patch(
  '/update/:id',
  authentication.authenticate('jwt', { session: false }),
  checkUpdatePermission,
  validation,
  updateComment
)
// router.post('/postPing', cache.route(100), validation, ping) // example for redis cache in routes
module.exports = router