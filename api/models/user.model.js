const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
    role:{ type:String, default:'user' },
    verified:{ type:Boolean, default:false }
},{
    timestamps: true
})
module.exports = User = mongoose.model('user', userSchema)