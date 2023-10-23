const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Post'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Comment', commentSchema)
