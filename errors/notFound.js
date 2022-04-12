const customError = require("./customError");
const {StatusCodes} = require("http-status-codes")

class NotFoundError extends customError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }

}

module.exports = NotFoundError