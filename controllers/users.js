
const Users = require("../model/users") 
const {StatusCodes} = require("http-status-codes")
const NotFoundError = require("../errors/notFound")


const getUsers = async (req,res) =>{
    const {query:{name}} = req
    const queryObj = {}
    if(name){
        queryObj.name = {$regex: name, $options:"i"}
    }
    const filter = "_id name email createdAt updatedAt"
    users = await Users.find(queryObj).select(filter)
    res.status(StatusCodes.OK).json(users)
}

const getUser = async (req,res) =>{
    const {_id :userId} = req.user
    const filter = "_id name email createdAt updatedAt"
    const user = await Users.findOne({_id: userId}).select(filter)
    res.status(StatusCodes.OK).json(user)
}


const updateUser = async (req, res) => {
    const {
        body:{email,name},
        user: {_id: userId }   
    } = req
    const filter = "_id name email createdAt updatedAt"
    const users = await Users.findOneAndUpdate({_id: userId},{email, name}, {runValidators: true}).select(filter)
    res.status(StatusCodes.OK).json(users)
}

const deleteUser = async (req, res) =>{
    const {_id: userId} = req.user
    const user = await Users.findOneAndDelete({_id: userId })
    res.status(StatusCodes.OK).json()
}
1
module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
}