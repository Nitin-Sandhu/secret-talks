 const { checkToken } = require("../services/authentitation")


const checkForCookie = (cookieName) =>{
    return (req ,res,next) => {
        const cookieValue = req.cookies[cookieName]
        if(!cookieValue)
             return next();
        try {
            const userPayload = checkToken(cookieValue)
            req.intro = userPayload
        } catch (error) {}
        next()
    }
}

module.exports = {
    checkForCookie
}