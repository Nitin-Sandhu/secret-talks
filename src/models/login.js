<<<<<<< HEAD
const mongoose = require("mongoose")
const resisterSchema = new mongoose.Schema({
    username : {
        type : String,
        required :true,
    },
    email : {
        type : String,
        required :true,
        unique :true
    },
    mobile_number: {
        type : Number,
        required :true,
        unique :true
    },
    password : {
        type : String,
        required :true,
    }});


    const Resister = new mongoose.model("Resister",resisterSchema);
    module.exports = Resister;

=======
const { createHmac, randomBytes } = require("crypto")
const mongoose = require("mongoose")
const resisterSchema = new mongoose.Schema({
    username : {
        type : String,
        required :true,
    },
    email : {
        type : String,
        required :true,
        unique :true
    },
    mobile_number: {
        type : Number,
        required :true,
        unique :true
    },
    password : {
        type : String,
        required :true,
    },
    salt : {
        type : String,
        
    }});



    resisterSchema.pre("save", function(next){
        const user = this;

        if(!user.isModified("password")) return next();

        const salt = randomBytes(16).toString();
        const hashedPassword = createHmac('sha256',salt)
                               .update(user.password)
                               .digest('hex');
        this.salt = salt;
        this.password = hashedPassword

        next();



    })


    const Resister = new mongoose.model("Resister",resisterSchema);
    module.exports = Resister;

>>>>>>> c4c8a6c (updated navbar)
