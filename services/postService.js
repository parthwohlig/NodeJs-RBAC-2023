const Post = require('../mongooseSchema/postSchema')
const jwt = require('jsonwebtoken')

class PostService {
  getUserIdFromToken (req) {
    const token = req.headers.authorization
    const decodedToken = jwt.verify(
      token,
      process.env.AUTHENTICATION_JWT_SECRET_KEY
    )
    const userId = decodedToken.data.userId
    return userId
  }

  async createPost (req) {
    try {
      const userid = this.getUserIdFromToken(req)
      const { Tweet } = req.body
      const newPost = new Post({
        Tweet: Tweet,
        userId: userid
      })
      await newPost.save()
      return newPost
    } catch (error) {
      console.log('Error in creating Post', error)
      throw new Error(error)
    }
  }

  async getPost (req) {
    try {
      const getPost = await Post.findById(req.params.postid)
      return getPost
    } catch (error) {
      console.log('Error in getting Post', error)
      throw new Error(error)
    }
  }

  async updatePost (req) {
    try {
      const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      return updatePost
    } catch (error) {
      console.log('Error in updating Post', error)
      throw new Error(error)
    }
  }

  async deletePost (req) {
    try {
      const deletePost = await Post.findByIdAndDelete(req.params.id)
      return `Post successfully deleted ${deletePost}`
    } catch (error) {
      console.log(`error deleteing post with ${req.params.id}`)
      throw new Error(error)
    }
  }
}

module.exports = new PostService()
