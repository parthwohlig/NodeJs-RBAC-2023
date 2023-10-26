const express = require('express')
const router = express.Router()
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const Post = require('../../services/postService')
const { checkDeletePermission } = require('../../middlewares/auth/access')
// const cache = require('../../middlewares/requestCacheMiddleware') // uncomment the statement whenever the redis cache is in use.

const validationSchema = {
  // type: 'object',
  // required: true,
  // properties: {
  //   Tweet: { type: 'string', required: true, minLength: 3 },
  //   userId: { type: 'string', required: true }
  // }
}
const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'params')
}
const deletePost = async (req, res) => {
  try {
    const post = await Post.deletePost(req)
    res.sendJson({ type: __constants.RESPONSE_MESSAGES.SUCCESS, data: post })
  } catch (err) {
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.delete(
  '/deletePost/:id',
  checkDeletePermission,
  validation,
  deletePost
)
// router.post('/postPing', cache.route(100), validation, ping) // example for redis cache in routes
module.exports = router
