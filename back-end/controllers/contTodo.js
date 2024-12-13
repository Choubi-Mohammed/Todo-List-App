const asynchandler=require('express-async-handler')
const Todos=require('../models/Todo')


exports.getAlltodos=asynchandler(async (req,res)=>{
    const todo=await Todos.find()
    if(todo.length > 0){
        res.status(200).json(todo)
    }else{
        res.status(400).json({message : "Todo Is Vide !!!!!!!!!!!!!"})
    }
})
exports.addTodo=asynchandler(async (req,res)=>{
    const count = await Todos.countDocuments();
    const newtodos=new Todos({
        id: count + 1,
        title:req.body.title,
        description:req.body.description,
        iscomplete:req.body.iscomplete,
    })
    const result= await newtodos.save()
    res.status(201).json({message:"ajouter avec seccefuly",result})
})
exports.updatebyId=asynchandler(async (req,res)=>{
    const todo_id=req.params.id
    const todo=await Todos.findOneAndUpdate({id:todo_id},{
        title:req.body.title,
        description:req.body.description,
        iscomplete:req.body.iscomplete,
    },{new:true})
if(todo){
    res.status(200).json(todo)
}else{
    res.status(401).json({message:"todo not found !"})
}
})
exports.deletebyId=asynchandler(async (req,res)=>{
    const todo_id=req.params.id
    const todo=await Todos.findOneAndDelete({id:todo_id})
    if(todo){
        res.status(200).json({message:"todo has been deleted"})
    }else{
        res.status(401).json({message:"todo not found !"})
    }
    })