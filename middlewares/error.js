const { StatusCodes } = require("http-status-codes")
const customError = require("../errors/customError")

const error = (err,req,res,next)=>{
    if(err instanceof(customError)){

        return res.status(err.statusCode).json({err:err.message})
    }
    if(err.name === "CastError")
    {
        return res.status(StatusCodes.NOT_FOUND).json(err)
    }

    if(err.name === "ValidationError"){
        return res.status(StatusCodes.BAD_REQUEST).json(err)
    }

    if (err.code && err.code === 11000) {
        return res.status(StatusCodes.BAD_REQUEST).json(err)
      }
   
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("something went wrong")
}

module.exports = error