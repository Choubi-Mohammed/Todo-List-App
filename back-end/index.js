const express= require('express')
const env=require("dotenv")
const ConnectDb=require('./connections/db')
const routerPath=require('./router/todoRouter')
env.config()
const App=express()
App.use(express.json())
ConnectDb()
App.use("/api/todo/",routerPath)
App.listen(process.env.PORT,()=>console.log(`server is runing  in Port ${process.env.PORT}`))