const express=require('express');
const authController = require('../controllers/auth.controllers');


const router=express.Router();

//hamne contoller me pura callback fn and logic likha then use route me ren kra
router.post('/register', authController.registerUser)

router.post('/login', authController.loginUser)

router.post('/logout', authController.logoutUser)


module.exports=router;