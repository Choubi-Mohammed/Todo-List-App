const { required } = require("joi");
const { default: mongoose, model } = require("mongoose");


const Todoschema= new mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    iscomplete:{
        type:Boolean,
        required:true,
        default :false
    },
},{
    timestamps:true
})
const Todos=mongoose.model('Todos',Todoschema)
module.exports=Todos