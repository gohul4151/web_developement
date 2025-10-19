const express = require("express");
const app=express();
const mongoose=require("mongoose");
const {usermodel,todomodel} = require("./db.js");
const JWT_SECRET="iloveh";
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(express.json())
app.post("/signup",async function(req,res){
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const hashed_pass= await bcrypt.hash(password,15);
    try {
        await usermodel.create({
        name:name,
        email:email,
        password:hashed_pass,
        })
        res.json({
            message:"you are signup successfully",
        })
    }
    catch(e)
    {
        res.status(404).json({
            message:"user already exists",
        })
    }
});
app.post("/signin",async function(req,res){
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    try {
        const response=await usermodel.findOne({
            name:name,
            email:email,
        })
        const a=await bcrypt.compare(password,response.password);
        if (a)
        {
            const token=jwt.sign({id:response._id.toString()},JWT_SECRET);
            res.json({
                token:token,
                message:"you signin successfully",
            })
        }
        else
        {
            res.json({
                message:"you need to signup first",
            })
        }
    } catch (error) {
        res.status(500).json({ message: "An error occurred during signin." });
    }    
});
app.post("/todo",auth,async function(req,res){
    const userId = req.id;
    const title = req.body.title;
    const done = req.body.done;

    await todomodel.create({
        userId:userId,
        title:title,
        done:done
    });

    res.json({
        message: "Todo created"
    })
});
app.get("/todo",auth,async function(req,res){
     const userId = req.id;

    const todos = await todomodel.find({
        userId:userId
    });

    res.json({
        todos
    })
});
function auth(req,res,next)
{
    const token=req.headers.token;
    try {
        const decode=jwt.verify(token,JWT_SECRET);
        if (decode)
        {
            req.id=decode.id;
            next();
        }
        else{
            res.status(403).json({ message: "Invalid credentials" });
        }
    }
    catch (error) {
    console.log(error);
    res.status(500).json({ error: "Authentication failed" });
  }
}
function main()
{
    mongoose.connect("mongodb+srv://gohul4151:l0CuxIReNPQHJeFh@cluster0.wmlpvp8.mongodb.net/gohul");
    app.listen(3000);
}
main();