const User = require('../models/user.model')
const mailer = require('../../utils/mailer')
const { generateUserToken, generateAccessToken, decodeUserToken } = require('../../utils/tokens')
const { encrypt, decrypt } = require('../../utils/passwords')
exports.createUnverifiedUser = async (req,res) => {
    try {
        let email = req.body.email
        let isRegistered = await User.find({email})
        if(isRegistered.length == 0){
            const token = generateUserToken(email)
            mailer.sendPasswordSetup(email,token)
            res.status(200).json({"message":`An email has been sent to ${email}. Please check your inbox`})
        }
        else{
            res.status(400).json({"message":`The email provided is already registered. Please login`})
        }
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
    
}

exports.verifyUser = async (req,res) => {
    try {
        let token = req.query.token
        let decoded = decodeUserToken(token)
        let password = req.body.password
        let userObj = {
            email:decoded.email,
            password: encrypt(password),
            role:'user',
            verified: true
        }
        const user = await User.create(userObj)
        if(user){
            res.status(201).json({
                "message": `${userObj.email} has been registered successfully`,
                user
            })
        }
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

exports.login = async (req,res) => {
    try {
        const { email, password } = req.body
        let isRegistered = await User.find({email})
        if(isRegistered.length == 0){
            res.status(404).json({"message": "User not found. Please register"})
        }
        else{
            let user = isRegistered[0]
            let decrypted = decrypt(user.password)
            if(decrypted == password){
                let token = generateAccessToken(user.email,user.role)
                res.status(200).json({
                    "message":"login successful",
                    token
                })
            }
            else{
                res.status(401).json({"message":"Unauthorized access"})
            }
        }
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

exports.fetchUsersList = async (req,res) => {
    try {
        let users = await User.find()
        if(users.length == 0) res.status(404).json({"message":"Nothing found"})
        res.status(200).json({
            "message":"fetching users list",
            count: users.length,
            users
        })
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

exports.fetchUserInfo = async (req,res) => {
    try {
        let user = await User.findById(req.params.id)  //User.findOne({email:req.body.email})
        if(!user) res.status(404).json({"message":"User not found"})
        res.status(200).json({
            "message": `Reading user ${user._id}`,
            user
        })
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

exports.forgotPassword = async (req,res) => {
    try {
        let email = req.body.email    
        let isRegistered = await User.find({email})
        if(isRegistered.length == 0){
            res.status(404).json({"message":"User not found"})
        }
        else{
            let token = generateUserToken(email)
            mailer.sendRecoveryMail(email,token)
            res.status(200).json({"message":`An email has been sent to ${email}. Please check your inbox`})
        }
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

exports.updateUserCredentials = async (req,res) => {
    try {
        let decoded = decodeUserToken(req.query.token)
        let encrypted = encrypt(req.body.password)
        let user = await User.findOneAndUpdate({email:decoded.email},{password:encrypted},{new:true})
        if(!user) res.status(404).json({"message":"User not found"})
        res.status(200).json({
            "message": `Updated password for user ${user._id}`,
            user
        })
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

exports.updateUserRole = async (req,res) => {
    try {
        let user = await User.findOneAndUpdate({_id:req.params.id},{role:req.body.role},{new:true})
        if(!user) res.status(404).json({"message":"User not found"})
        res.status(200).json({
            "message": `Updated password for user ${user._id}`,
            user
        })
    } catch (err) {
        res.status(500).json({"message": err.message})
    }    
}

exports.deleteUser = async (req,res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id)
        if(!user) res.status(404).json({"message":"User not found"})
        res.status(200).json({
            "message": `Deleted user ${user._id}`,
            user
        })
    } catch (err) {
        res.status(500).json({"message": err.message})
    }
}

exports.createUser = async (req,res) => {
    const {email,password} = req.body
    let user = await User.create({email,password})
    res.status(200).json(user)
}