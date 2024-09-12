const z=require('zod');
const {user}=require('./db/schema.js')
const bcrypt=require('bcrypt');
const User=z.object({
    Name:z.string(),
    Email:z.string().email("this is not a valid email"),
    Password:z.string().length(8,"Password must contain 8 characters")
})

async function isExist(email){
        try{
            let exist=await user.findOne({
                Email:email
            });
            return exist==null;
        }catch(e){
            console.log("error while checking user existed or not")
        }
}
async function userValidation(req,res,next){
    try{
        // check if user exists or not
        const {Name,Email,Password}=req.body;
        const check=await isExist(Email);
        if(!check){
            res.status(502).json({
                message:"user already exists"
            })
            return;
        }
        const newUser={
             Name,
             Email,
             Password
        }
        let isValid=User.safeParse(newUser); //called for user not for zod
        if(!isValid.success){
            res.status(401).json({
                message:"user validation failed",
                Error:isValid.error.errors
            })
            return;
        }
        const hashedPassword=await bcrypt.hash(Password,10)
        req.body={
            Name,
            Email,
            hashedPassword
        }
        next();
    }
    catch(e){
        res.status(503).json({
            message:"error in user validation"
        })
    }
}
async function passwordValidation(req,res,next){
    try{
        const {Password,Email}=req.body;
        const userData=await user.findOne({
            Email
        })
        if(userData==null){
            res.json({
                message:"user do not exist",
                redirectURL:"/signup" // redirect at client side
            })
            return;
        }
        const isValidPassword=await bcrypt.compare(Password,userData.Password)
            if(!isValidPassword){
                res.status(401).json({
                    message:"password validation failed",
                    Error:isValid.error.errors
                })
                return;
            }

            next();
        }
        catch(e){
            res.json({
                message:"error occured in password validation",
                error:e
            })
        }
    }
   

module.exports={
    userValidation,
    passwordValidation
}