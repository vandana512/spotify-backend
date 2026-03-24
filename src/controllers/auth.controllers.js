//isme bas callback functions hoga, express ka koi kaam na hai idhar
const userModel = require('../models/user.model')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')


async function registerUser(req, res) {
    const {username, email, password, role='user'}= req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const hash= await bcrypt.hash(password, 10)

    //as hamara user unique h to ham user banwa sakte h, for that we need token through jwt
    const user= await userModel.create({
        username, 
        email,
        password: hash,
        role
    })

    //jwt se unique token create krrhe h
    const token= jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET )

    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

}

async function loginUser(req, res) {
    const {username, email, password}= req.body;

    const user = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if (!user){
        return res.status(401).json({
            message: "invalid credential"
        })
    }

    // this will check if the password entered by the client and te password from user in database is same or not
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid){
        return res.status(401).json({
            message: "invalid credential"
        })
    }

    const token= jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET )

    res.cookie("token", token)

    res.status(201).json({
        message: "user logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

}
async function logoutUser(req, res) {
    res.clearCookie("token")
    res.status(200).json({ message: "User logged out successfully" })
}


module.exports = { registerUser, loginUser, logoutUser}