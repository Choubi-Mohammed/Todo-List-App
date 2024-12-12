const mongoose=require('mongoose')
const ConnectDb=async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("connection to mongodb seccefuly")
    } catch (error) {
        console.log("somthings is wrong !",error)
    }
    
}
module.exports=ConnectDb;