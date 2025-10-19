const express=require("express")
const jwt=require("jsonwebtoken")
const app=express();
const cors = require("cors")
app.use(cors())
app.use(express.json())
const JWT_SECRET="iloveh"
let data=[];
app.post("/signup",function(req,res){
    const user=req.body.username;
    const pass=req.body.password;
    if (data.find(u => u.username === user))
    {
        res.json({
            message:"you have already exists",
        })
    }
    else
    {
        data.push({
            username:user,
            password:pass,
        })
        res.json({
            message:"you have signed successfully",
        })
    }
})
app.post("/signin",function(req,res){
    const user=req.body.username;
    const pass=req.body.password;
    if (data.find(u => u.username === user))
    {
        const token=jwt.sign({username:user},JWT_SECRET)
        res.json({
            message:"you have signin successfully",
            token:token,
        })
    }
    else
    {
        res.json({
            message:"you have to signup first",
        })
    }
})
app.get("/me",function(req,res){
    const token=req.headers.token;
    if (!token)
    {
         return res.json({
            message:"Token is missing",
        })
    }
    const details=jwt.verify(token,JWT_SECRET);
    const u=data.find(user => user.username===details.username);
    if (u)
    {
        return res.json({
            username:u.username,
            password:u.password,
            message:"you got the information"
    })
    }
    else
    {
        return res.json({
            message:"Invalid Token"
        })
    }
})
app.listen(3000);