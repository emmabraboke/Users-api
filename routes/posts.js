const express = require('express')
const routes = express.Router()

const {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/posts")


routes.get("/", getPosts)
routes.get("/:id", getPost)
routes.post("/", createPost)
routes.patch("/:id", updatePost)
routes.delete("/:id", deletePost)

module.exports = routes