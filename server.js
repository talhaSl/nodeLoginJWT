const { response } = require("express");
const express=require("express");
const jwt =require("jsonwebtoken");
const app=express();
const secretKey="secretkey";
app.get("/",(req,res)=>{
  res.send("hello")
})

app.post("/login",(req,res)=>{
    const user={
        id:1,
        username:"talha",
        email:"talha@test.com"
    }
    jwt.sign({user},secretKey,{expiresIn:'3000s'},(err,token)=>{
        res.json({
            token
        })
    })
})

app.post("/profile",verifyToken,(req,res)=>{
jwt.verify(req.token,secretKey,(err,authData)=>{
    if(err){
        res.send("invalid token")
    }else{
        res.json({message:"profile accessed",authData})
    }
})
})
function verifyToken(req,res,next){

const bearerHeader=req.headers['authorization'];
if(typeof bearerHeader !=="undefined"){
const bearer= bearerHeader.split(" ");
const token=bearer[1];
req.token=token;
next();
}else{
    res.status(400).json("Token is not valid ")
}
}

app.listen(5000,"127.0.0.1",()=>{
    console.log("Connected to the server...");
})