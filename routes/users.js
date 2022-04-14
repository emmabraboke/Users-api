const express = require('express')
const routes = express.Router()

const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
   
} = require("../controllers/users")


routes.get("/", getUsers)
routes.get("/:id", getUser)
routes.patch("/:id", updateUser)
routes.delete("/:id", deleteUser)

module.exports = routes