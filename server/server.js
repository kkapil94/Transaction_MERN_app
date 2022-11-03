import express from 'express'

import cors from 'cors'
import bodyParser from 'body-parser'
import route from './routers/transaction.js'
import connect from './database/mongodb.js'
import auth from "./routers/auth.js"
import user from "./routers/user.js"
import passport from 'passport'
import passportConfig from "./config/passport.js"

await connect();
const app = express()
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())
passportConfig(passport)
app.get('/',(req,res)=>{
    res.send({messege:"hello world"})
})

app.use("/transactions",route)
app.use("/auth",auth)
app.use('/user',user)

app.listen(PORT,(req,res)=>{
    console.log("server is listening on http://localhost:4000");
})