import jwt from "jsonwebtoken"

export const SECRET_TOKEN = 'just a little secret'

const authMW = async (req, res, next) => {
    const token = req.headers?.authorization?.replace('Bearer ', '')
    try {
        const { id } = await jwt.verify(token, SECRET_TOKEN)
        req.user = id
        next()
      } catch (error) {
        next(error.message)
      }
}

export default authMW