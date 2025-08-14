const JWT = require("jsonwebtoken")



const secret = "Nitin@$123"

const userTokken  = (Resister)=>{
    const payload = {
        username : Resister.username,
        _id: Resister._id,
        email: Resister.email,
        mobile_number : Resister.mobile_number

    }

    const token = JWT.sign(payload,secret ,)
    return token
};


const checkToken = (token) => {
    const payload = JWT.verify(token ,secret);
    return payload;
    
}

module.exports = {
    checkToken,userTokken,
}