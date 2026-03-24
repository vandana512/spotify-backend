const musicModel = require("../models/music.model");
const jwt= require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");


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

        if(decoded.role != 'artist'){
            return res.status(403).json({message: "forbidden"})
        }

        const {title}= req.body
        const file=req.file;

        const result= await uploadFile(file.buffer.toString('base64'))

        const music= await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id,
        })

        res.status(201).json({
            message: "music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            }
        })


        
    }
    catch (err){

        console.log(err)

        return res.status(401).json({message: "unauthorized"})
    }

    
}

async function createAlbum(req, res) {
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message: "unauthorized"})
    }

    try{
        //agar token verify hota hai to ham use decoded me save krlete h

        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);

        if(decoded.role != 'artist'){
            return res.status(403).json({message: "forbidden, u dont have access"})
        }

        const {title, musicIds}= req.body

        const album = await albumModel.create({
            title,
            artist: decoded.id,
            music: musicIds
        })

        res.status(201).json({
            message: "album created successfully",
            music: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                music: album.music,
            }
        })
        
    }
    catch (err){

        console.log(err)

        return res.status(401).json({message: "unauthorized"})
    }

}

module.exports= {createMusic, createAlbum}
