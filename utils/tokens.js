const jwt = require('jsonwebtoken')

exports.generateUserToken =  email => {
    const token = jwt.sign({email,role:'pending'},'secret',{issuer:'blumoonsolutions.net', expiresIn:"15m"})
    return token
}
exports.generateAccessToken =  (email,role) => {
    const token = jwt.sign({email,role},'secret',{issuer:'blumoonsolutions.net', expiresIn:"3h"})
    return token
}
exports.decodeUserToken = token => {
    const decoded = jwt.verify(token,'secret')
    return decoded
}
