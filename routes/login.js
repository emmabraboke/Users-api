const express = require("express")
const routes = express.Router()
const {
    registerUser,
    loginUser,
} = require("../controllers/login")

routes.post("/register", registerUser)
routes.post("/login", loginUser)

module.exports = routes

