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
      if (!getComment) {
        return 'No Comment found'
      }
      return getComment
    } catch (error) {
      console.log('Error in getting Comment', error)
      throw new Error(error)
    }
  }

  async updateComment (req) {
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(
        token,
        process.env.AUTHENTICATION_JWT_SECRET_KEY
      )
      const userId = decoded.data.userId
      const commentId = req.params.id
      const findUserId = await Comment.findOne({ _id: commentId })
      if (findUserId.userId !== userId && decoded.data.role !== 'superadmin') {
        return 'Youre not owner of this comment'
      }
      const updateComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )
      if (!updateComment) {
        return 'No comment found'
      }
      return updateComment
    } catch (error) {
      console.log('Error in updating Comment', error)
      throw new Error(error)
    }
  }

  async deleteComment (req) {
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(
        token,
        process.env.AUTHENTICATION_JWT_SECRET_KEY
      )
      const userId = decoded.data.userId
      const commentId = req.params.id
      const findUserId = await Comment.findOne({ _id: commentId })
      if (findUserId.userId !== userId && decoded.data.role !== 'superadmin') {
        return 'Youre not owner of this comment'
      }

      const deleteComment = await Comment.findByIdAndDelete(req.params.id)
      if (!deleteComment) {
        return 'No such Comment found'
      }
      return `Comment successfully deleted ${deleteComment}`
    } catch (error) {
      console.log(`Error deleteing Comment with ${req.params.id}`)
      throw new Error(error)
    }
  }
}

module.exports = new CommentService()
