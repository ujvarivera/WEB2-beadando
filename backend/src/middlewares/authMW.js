import jwt from "jsonwebtoken"

export const SECRET_TOKEN = 'just a little secret'

const authMW = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, SECRET_TOKEN, (error, decodedToken) => {
            if (error) {
                console.log(error.message);
                res.redirect('/api/login')
            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/api/login')
    }
}

export default authMW