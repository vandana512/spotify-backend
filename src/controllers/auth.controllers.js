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

module.exports= {registerUser}