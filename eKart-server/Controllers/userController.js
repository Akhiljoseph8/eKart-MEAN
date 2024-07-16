const users= require('../Models/userModel')
const jwt= require('jsonwebtoken')

exports.userRegister = async (req,res)=>{
    try{
        const {username, email, password}=req.body
        const existinguser=await users.findOne({email})
        if(existinguser){
            res.json(406).json("User already Exists")
        }else{
            const newUser =new users({email, username,password})
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.userLogin = async(req,res)=>{
    try{
        const{email,password}=req.body
        const existinguser=await users.findOne({email,password})
        if(existinguser){
            const token=jwt.sign({id:existinguser._id},process.env.SECRET_KEY)
            res.status(200).json({existinguser,token})
        }else{
            res.status(406).json("Invalid Email/Password")
        }
    }catch(err){
        res.status(401).json(err)
    }
}