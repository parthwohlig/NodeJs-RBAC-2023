const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const Comment = require('../../services/commentService')
const { checkCreatePermission } = require('../../middlewares/auth/access')
// const cache = require('../../middlewares/requestCacheMiddleware') // uncomment the statement whenever the redis cache is in use.

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    comment: { type: 'string', required: true },
    postId: { type: 'string', require: true }
  }
}
const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}
const createComment = async (req, res) => {
  try {
    const comment = await Comment.createComment(req)
    res.sendJson({ type: __constants.RESPONSE_MESSAGES.SUCCESS, data: comment })
  } catch (err) {
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post(
  '/create',
  checkCreatePermission,
  validation,
  createComment
)
// router.post('/postPing', cache.route(100), validation, ping) // example for redis cache in routes
module.exports = router
