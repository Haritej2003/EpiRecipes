require('dotenv').config();
const express=require('express')
const {user,favourites}=require('./db/schema.js')
const {userValidation,passwordValidation}=require('./Validations.js')

const app=express()
const PORT=process.env.PORT || 8000;
app.use(express.json())
app.post("/signup",userValidation,async (req,res)=>{
    try{
    let {Name,Email,hashedPassword}=req.body;
    const newUser=new user({
        Name:Name,
        Email:Email,
        Password:hashedPassword,        
    })
    await newUser.save();
    res.status(201).json({
        message:"user created successfully"
    })
    return;
    }catch(e){
        console.log("error while signup");
        res.status(510).json({
            message:"error while signup"
        })
        return;
    }

})
app.get("/login",passwordValidation,async (req,res)=>{
    try{
        res.status(202).json({
            message:"login successful"
        })        
    }
    catch(e){
        res.json({
            message:"error while loging in"
        })
    }
})
app.post("/addfavourites",(req,res)=>{
    
})
app.get("/getfavourites",(req,res)=>{

})
app.listen(PORT,(req,res)=>{
    console.log(`Server connected to ${PORT}`);
})