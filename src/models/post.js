 const mongoose = require("mongoose");

 const postSchema = new mongoose.Schema({
    username : {
        type:String,
        required : true,
        ref: "Resister"
    },
    imageUrl:  {
        type : String,
        required : true,
    },
    bio:  {
        type : String,
    },
    time:{
        type:String,
        required : true,
    }

    


 })

module.exports = mongoose.model("PostsInfo", postSchema);


 