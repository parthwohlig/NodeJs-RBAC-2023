const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    Tweet: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
