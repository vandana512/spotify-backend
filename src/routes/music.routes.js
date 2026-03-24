const express=require('express');
const musicController = require('../controllers/music.controllers');


const router=express.Router();

router.post('/upload', musicController.createMusic)

module.exports=router;