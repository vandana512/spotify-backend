const express=require('express')
const cookieParser= require('cookie-parser')
const authRoutes=require('./routes/auth.routes')

const app=express()
app.use(express.json())
app.use(cookieParser())

//hamne route banaya hai jise, ham is prefix ke sath use krskte hss
app.use('/api/auth', authRoutes);

module.exports=app;