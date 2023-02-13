const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
exports.connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI
        let conn = await mongoose.connect(uri)
        console.log(`DB Connected on host ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
    }
}