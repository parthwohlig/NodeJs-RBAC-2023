const Comment = require('../mongooseSchema/commentSchema')
const jwt = require('jsonwebtoken')

class CommentService {
  getUserIdnPostId (req) {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(
      token,
      process.env.AUTHENTICATION_JWT_SECRET_KEY
    )
    const userId = decodedToken.data.userId
    return userId
  }

  async createComment (req) {
    try {
      const userId = this.getUserIdnPostId(req)
      const { comment, postId } = req.body
      console.log(req.body)
      const newComment = new Comment({
        comment: comment,
        postId: postId,
        userId: userId
      })
      await newComment.save()
      return newComment
    } catch (error) {
      console.log('Error in creating Comment', error)
      throw new Error(error)
    }
  }

  async getComment (req) {
    try {
      const getComment = await Comment.findById(req.params.id)
      return getComment
    } catch (error) {
      console.log('Error in getting Comment', error)
      throw new Error(error)
    }
  }

  async updateComment (req) {
    try {
      const updateComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      return updateComment
    } catch (error) {
      console.log('Error in updating Comment', error)
      throw new Error(error)
    }
  }

  async deleteComment (req) {
    try {
      const deleteComment = await Comment.findByIdAndDelete(req.params.id)
      return `Comment successfully deleted ${deleteComment}`
    } catch (error) {
      console.log(`Error deleteing Comment with ${req.params.id}`)
      throw new Error(error)
    }
  }
}

module.exports = new CommentService()
