import jwt from "jsonwebtoken"

export const SECRET_TOKEN = 'just a little secret'

const authMW = (req, res, next) => {
    const token = req.headers?.authorization?.replace('Bearer ', '')
    try {
        const { userId } = jwt.verify(token, TOKEN_SECRET)
        req.user = userId
        next()
      } catch (error) {
        next(error)
      }
}

export default authMW