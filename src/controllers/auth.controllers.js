//isme bas callback functions hoga, express ka koi kaam na hai idhar
const userModel = require('../models/user.model')

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

    //as hamara user unique h to ham user banwa sakte h, for that we need token through jwt
    const user= await userModel.create({
        username, 
        email,
        password,
        role
    })
}

module.exports= {registerUser}