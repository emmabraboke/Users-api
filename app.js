const express = require("express")
const app = express()
require('express-async-errors');
const users = require("./routes/users")
const posts = require("./routes/posts")
const login = require("./routes/login")
require("dotenv").config()
const notFound = require("./middlewares/notFound")
const connectdb = require("./connect/connect")
const error = require("./middlewares/error")
const authorization = require("./middlewares/authorization")

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const swagger= require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDoc= yaml.load('./swagger.yaml');

//middleware

app.use(express.json())
app.use(express.urlencoded({"extended":false}))

// security
app.set('trust proxy', 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());



//routes
app.use(login)
app.use("/users/posts",authorization,posts)
app.use("/users",authorization,users)

app.use('/documentation', swagger.serve, swagger.setup(swaggerDoc));
app.get("/",(req,res)=>{
    res.send(`
    <h3>User API</h3>
    <p> API <a href="/documentation"> documentation</a> </p>
    `)
})


app.use(notFound)
app.use(error)



const PORT = process.env.PORT || 5000

const start = async ()=>{
    await connectdb(process.env.MONGO_URI)
    console.log("database connected")
    app.listen(PORT, ()=>{
        console.log(`listening on ${PORT} ...`)
    })
}
start()