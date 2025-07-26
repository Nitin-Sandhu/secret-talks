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

