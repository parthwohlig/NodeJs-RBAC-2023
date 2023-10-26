const User = require('../mongooseSchema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const token = require('../middlewares/auth/authentication')

class UserClass {
  async signup (req) {
    try {
      const { username, email, password, role } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const oldUser = await User.findOne({ email, username })
      if (oldUser) {
        return 'Email or Username already exists'
      } else {
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          role: role || 'user'
        })
        await newUser.save()
        return newUser
      }
    } catch (error) {
      console.error('Error in SignUp', error)
      throw new Error(error)
    }
  }

  async login (req) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return 'Email does not exist'
      }
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) {
        return 'Password is incorrect'
      }
      const accessToken = token.setToken(
        {
          userId: user._id,
          role: user.role
        },
        86400000
      )
      await User.findById(user._id, { accessToken })
      const data = {
        email: user.email,
        role: user.role,
        token: accessToken
      }
      return data
    } catch (error) {
      console.error('Error in logging in User', error)
      throw new Error(error)
    }
  }

  async getAllUsers () {
    try {
      const users = await User.find({})
      return users
    } catch (error) {
      console.error('Error in getAllUsers', error)
      throw error
    }
  }

  async getUser (req) {
    try {
      const token = req.headers.authorization
      const userId = req.params.userid
      const decoded = jwt.verify(
        token,
        process.env.AUTHENTICATION_JWT_SECRET_KEY
      )
      if (
        decoded.data.userId !== userId &&
        decoded.data.role !== 'superadmin'
      ) {
        return 'Token doesnt match your details'
      }
      const user = await User.findById(userId)
      if (!user) {
        return 'User does not exist'
      }
      return user
    } catch (error) {
      console.error('Error in getUser', error)
      throw new Error(error)
    }
  }

  async updateUser (req) {
    try {
      const token = req.headers.authorization
      const update = req.body
      const userId = req.params.userid
      const decoded = jwt.verify(
        token,
        process.env.AUTHENTICATION_JWT_SECRET_KEY
      )
      if (
        decoded.data.userId !== userId &&
        decoded.data.role !== 'superadmin'
      ) {
        return 'Token doesnt match your login details'
      }
      if (update.password) {
        const hashedPassword = await bcrypt.hash(update.password, 10)
        update.password = hashedPassword
      }
      await User.findByIdAndUpdate(userId, update)
      const user = await User.findById(userId)
      if (!user) {
        return 'User does not exists'
      }
      return `User has been updated ${user}`
    } catch (error) {
      console.error('Error in updating User', error)
      throw new Error(error)
    }
  }

  async deleteUser (req) {
    try {
      const userId = req.params.userid
      const token = req.headers.authorization
      const decoded = jwt.verify(
        token,
        process.env.AUTHENTICATION_JWT_SECRET_KEY
      )
      if (
        decoded.data.userId !== userId &&
        decoded.data.role !== 'superadmin'
      ) {
        return 'Token doesnt match your login details'
      }
      const deleteUser = await User.findByIdAndDelete(userId)
      if (!deleteUser) {
        return 'User not found'
      }
      return 'User has been deleted'
    } catch (error) {
      console.error('Error in deleting user', error)
      throw new Error(error)
    }
  }
}
module.exports = new UserClass()
