const express = require('express')
const routes = express.Router()

const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
   
} = require("../controllers/users")


routes.get("/", getUsers)
routes.get("/user", getUser)
routes.patch("/", updateUser)
routes.delete("/", deleteUser)

module.exports = routes