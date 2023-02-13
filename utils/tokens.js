const jwt = require('jsonwebtoken')

exports.generateUserToken =  email => {
    const token = jwt.sign({email,role:'pending'}, process.env.JWT_SEC,{issuer:'blumoonsolutions.net', expiresIn:"15m"})
    return token
}
exports.generateAccessToken =  (email,role) => {
    const token = jwt.sign({email,role}, process.env.JWT_SEC,{issuer:'blumoonsolutions.net', expiresIn:"3h"})
    return token
}
exports.decodeUserToken = token => {
    const decoded = jwt.verify(token, process.env.JWT_SEC)
    return decoded
}
