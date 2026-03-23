const musicModel = require("../models/music.model");
const jwt= require("jsonwebtoken")

// we need to make this api protected
async function createMusic(req, res) {
    
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message: "unauthorized"})
    }

    try{
        //agar token verify hota hai to ham use decoded me save krlete h

        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);

        if(decoded.role != artist){
            return res.status(403).json({message: "forbidden"})
        }

        
    }
    catch (err){

        return res.status(401).json({message: "unauthorized"})
    }

}
