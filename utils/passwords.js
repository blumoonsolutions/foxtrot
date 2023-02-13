const CryptoJS = require('crypto-js')

exports.encrypt = password => CryptoJS.AES.encrypt(password, process.env.CRYPTO_SEC)
exports.decrypt = cipher => CryptoJS.AES.decrypt(cipher, process.env.CRYPTO_SEC).toString(CryptoJS.enc.Utf8)