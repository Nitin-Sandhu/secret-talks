const express = require("express");
const fs = require('fs');
const app = express();
const  mongoose = require("mongoose")
const ejs = require("ejs")
app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const path = require("path");
const { log } = require("console");
const static_path = path.join(__dirname,"public");
app.use(express.static(static_path))
require("./src/db/conn.js")
const Resister = require("./src/models/login.js");
const { text } = require("stream/consumers");
 

app.get("/",(req ,res) =>{
  return res.render("home")
})

app.get("/login",(req ,res) =>{
  return res.render("login.ejs",{ text : ''})
})
app.get("/resister",(req ,res) =>{
    
  return res.render("resister",{ text : ''})
});

app.get("/final",(req ,res) =>{
    
  return res.render("final")
})


app.post("/resister",async(req ,res) => {
  try{ 
   
   const mobile = req.body.mobile;
   const checked = req.body.terms;
   const password = req.body.Password;
   const cpassword = req.body.cPassword;
   
   if(password === cpassword && mobile.length === 10 && password.length >= 8 && checked == "true"){
    
    const info = new Resister({
                username :req.body.Username,
                email : req.body.email,
                mobile_number : req.body.mobile,
                password : password,
    })


    const resistered = await info.save();
     res.status(201).redirect("final");
   }
   else{
    console.log("error");
    if(mobile.length != 10){
        res.render("resister",{text : "mobile number invalid"})
    }else if(password.length < 8){
        res.render("resister",{text : "password too short"})
    }else if(password != cpassword){
        res.render("resister",{text : "password does not match"})
    }else if(checked != true){
        res.render("resister",{text : "accept term and condition"})
    }
    
   }
   
}catch(err){
       return res.status(401).send(err,"error")
       
}
})
app.post("/login",async(req ,res)=>{
  try{
    const username = req.body.Username;
    const email = req.body.email;
    const password = req.body.Password;
    const checked = req.body.terms;
    const finduser = await Resister.findOne({username : username});
    console.log(checked);
    if(finduser && finduser.email === email && finduser.password === password && checked == "on"){
       res.redirect("final")
    }
     else if(checked != on){
       res.render("login", { text: "Please accept terms and conditions." });

     }
    else {
      
      res.render("login", { text: "Invalid username, email, or password." });
    }
  }
  catch(err){
    console.log("error during login:", err); // 
    res.status(402).send(err);
  }
})





app.listen(4000 , ()=>{
    console.log("server started at 4000 port")
})