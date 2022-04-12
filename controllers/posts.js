const Posts = require("../model/posts")
const NotFoundError = require("../errors/notFound")
const { StatusCodes } = require("http-status-codes")
const BadRequestError = require("../errors/badrequest")

const getPosts = async (req,res) =>{
    const {query : {sort,select,post}, user : {_id : userId}} = req
    const queryObj = {}
    queryObj.user = userId

    if(post){
    queryObj.post = {$regex: post, $options: 'i'}
    }

    posts = Posts.find(queryObj)
    if(sort){
        posts = posts.sort(sort)
    }
    else{
        posts = posts.sort('createdAt')
    }
    
    if(select){
       
        const field=select.split(",").join(" ")
        posts = posts.select(field)
    }
    
    posts = await posts
    res.status(StatusCodes.OK).json(posts)
   
}

const getPost = async (req,res,next) => {
    const {user: {_id: userId}, params: {id: postId}} = req
    const post = await Posts.findOne({_id:postId, user: userId })
    
    if(!post){
       throw new NotFoundError(`post with id ${postId} not found`)
    }

    res.status(StatusCodes.OK).json(post)
}

const createPost = async (req,res) =>{
    const {user: {_id: userId},body : {post}} = req

    if(!post){
        throw new BadRequestError("post can't be empty")
    }
    const posts = await Posts.create({post, user : userId}) 
    res.status(StatusCodes.CREATED).json(posts)
}

const updatePost = async (req,res) => {
    const {user: {_id: userId},params: {id: postId},body : { retweet,like}} = req
    const post = await Posts.findOneAndUpdate({_id:postId, user: userId },{retweet, like},
        {new:true,runValidators:true})
        
    if(!post){
        throw new NotFoundError(`post with id ${postId} not found`)
    }
    
    res.status(StatusCodes.OK).json(post)
}

const deletePost = async (req, res) =>{
    const {user: {_id: userId}, params: {id: postId}} = req
    const post = await Posts.findOneAndDelete({_id:postId, user: userId })
    if(!post){
        throw new NotFoundError(`post with id ${postId} not found`)
    }
    res.status(StatusCodes.OK).json(post)
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}
