const jwt = require("jsonwebtoken")
const UnathorizedError = require("../errors/unauthorized")

const authorization = (req,res,next)=>{
    const authorization = req.headers.authorization

    if(!authorization || !authorization.startsWith("Bearer ")){
        throw new UnathorizedError("Invalid credentials")
    }

    const token = authorization.split(" ")[1]
   try {
        const {email,_id,name}=jwt.verify(token, process.env.JWT_SECRET)
        req.user = {email,_id,name}
        next()
   } catch (error) {       
       next(error)
   }

}

module.exports = authorization