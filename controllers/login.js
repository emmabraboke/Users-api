const jwt = require("jsonwebtoken")
const BadRequestError = require("../errors/badrequest")
const UnathorizedError = require("../errors/unauthorized")
const Users = require("../model/users") 
const { StatusCodes } = require("http-status-codes")

const registerUser = async (req,res) => {
    const {name} = req.body
    const user = await Users.create(req.body)
    const {_id} = user
    const token = jwt.sign({_id,name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME, })
    res.status(StatusCodes.CREATED).json({token,name})
}

const loginUser = async (req,res) => {
    const {email,password} = req.body
    if(!email || !password){
      throw new BadRequestError("Provide email address and password")
    }
    const user = await Users.findOne({email})
    if(!user){
        throw new UnathorizedError("Invalid login details check email or password")
    }
    const {_id,name} = user
    const ismatch = await user.comparePassword(password)

    if(!ismatch){
        throw new UnathorizedError("Invalid login details check email or password")
    }

    token = jwt.sign({_id,name} ,process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME,
      }) 
    res.status(StatusCodes.OK).json({token,name})
    
}

module.exports ={
    registerUser,
    loginUser,
}