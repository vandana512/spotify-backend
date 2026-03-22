const express=require('express');
const authController = require('../controllers/auth.controllers');


const router=express.Router();

//hamne contoller me pura callback fn and logic likha then use route me ren kra
router.post('/register', authController.registerUser)


module.exports=router;